import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useCognitoAuth } from '../../contexts/CognitoAuthContext';

const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Budget Alert',
      message: 'AWS spending exceeded 80% of monthly budget',
      time: '5 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'success',
      title: 'Cost Optimization',
      message: 'Saved $2,340 by rightsizing EC2 instances',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'error',
      title: 'Cost Anomaly',
      message: 'Unusual spike in Azure compute costs detected',
      time: '2 hours ago',
      unread: false
    }
  ]);

  const unreadCount = notifications?.filter(n => n?.unread)?.length;
  const navigate = useNavigate();
  const { signOut, userProfile, loading } = useCognitoAuth();

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsUserMenuOpen(false);
  };

  const handleUserMenuClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsNotificationOpen(false);
  };

  const displayName = userProfile?.name || userProfile?.fullName || userProfile?.username || 'User';
  const displayEmail = userProfile?.email || '';

  const handleLogout = async () => {
    // Sign out via Cognito context, clear local session and redirect to login
    try {
      await signOut();
    } catch (e) {
      // ignore sign out errors
      console.error('Sign out error', e);
    }

    try { localStorage.removeItem('cognito-session'); } catch (e) {}
    setIsUserMenuOpen(false);
    navigate('/login', { replace: true });
  };

  const handleProfileSettingsClick = () => {
    navigate('/profile-settings');
    setIsUserMenuOpen(false);
  };

  const handlePreferencesClick = () => {
    navigate('/preferences');
    setIsUserMenuOpen(false);
  };

  const handleHelpSupportClick = () => {
    navigate('/help-support');
    setIsUserMenuOpen(false);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      case 'error': return 'AlertCircle';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-[1000]">
      <div className="flex items-center justify-between h-full px-4 laptop:px-5 max-w-1024 mx-auto">
        {/* Logo - Optimized for 1024px */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2 laptop:space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={20} color="white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base laptop:text-lg font-semibold text-foreground leading-none">C3 - Cloud Cost Console</h1>
              <span className="text-xs text-muted-foreground leading-none">Ai-Powered FinOps Platform</span>
            </div>
          </div>
        </div>

        {/* Right Section - Optimized for 1024px screens */}
        <div className="flex items-center space-x-2 laptop:space-x-3">
          {/* Global Search - Optimized for 1024px */}
          <div className="hidden laptop:flex items-center">
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search costs, resources..."
                className="w-52 laptop:w-56 pl-10 pr-4 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-150"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <kbd className="px-2 py-1 text-xs text-muted-foreground bg-background border border-border rounded">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          {/* Compact Search Button for smaller screens */}
          <Button variant="ghost" size="icon" className="laptop:hidden">
            <Icon name="Search" size={18} />
          </Button>

          {/* Notifications - Optimized for 1024px */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleNotificationClick}
              className="relative"
            >
              <Icon name="Bell" size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </Button>

            {/* Notification Dropdown - Optimized for 1024px screens */}
            {isNotificationOpen && (
              <div className="absolute right-0 top-12 w-76 laptop:w-80 bg-popover border border-border rounded-lg shadow-elevation-3 z-[1001]">
                <div className="p-3 laptop:p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-popover-foreground text-sm laptop:text-base">Notifications</h3>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Mark all read
                    </Button>
                  </div>
                </div>
                <div className="max-h-72 laptop:max-h-80 overflow-y-auto">
                  {notifications?.map((notification) => (
                    <div 
                      key={notification?.id}
                      className={`p-3 laptop:p-4 border-b border-border last:border-b-0 hover:bg-muted/50 cursor-pointer transition-colors duration-150 ${
                        notification?.unread ? 'bg-muted/30' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-2 laptop:space-x-3">
                        <Icon 
                          name={getNotificationIcon(notification?.type)} 
                          size={16} 
                          className={`mt-0.5 ${getNotificationColor(notification?.type)}`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-popover-foreground truncate">
                              {notification?.title}
                            </p>
                            {notification?.unread && (
                              <div className="w-2 h-2 bg-primary rounded-full ml-2"></div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {notification?.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification?.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full text-sm">
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu - Optimized for 1024px */}
          <div className="relative">
            <Button 
              variant="ghost" 
              onClick={handleUserMenuClick}
              className="flex items-center space-x-2 px-2 laptop:px-3"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">JD</span>
              </div>
              <div className="hidden laptop:block text-left">
                <p className="text-sm font-medium text-foreground">{loading ? 'Loading...' : displayName}</p>
                <p className="text-xs text-muted-foreground">FinOps Manager</p>
              </div>
              <Icon name="ChevronDown" size={14} className="text-muted-foreground" />
            </Button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-12 w-56 bg-popover border border-border rounded-lg shadow-elevation-3 z-[1001]">
                <div className="p-3 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-foreground">JD</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-popover-foreground">{loading ? 'Loading...' : displayName}</p>
                      <p className="text-xs text-muted-foreground">{loading ? '' : displayEmail}</p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button 
                    onClick={handleProfileSettingsClick}
                    className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted/50 transition-colors duration-150 flex items-center space-x-2"
                  >
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button 
                    onClick={handlePreferencesClick}
                    className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted/50 transition-colors duration-150 flex items-center space-x-2"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Preferences</span>
                  </button>
                  <button 
                    onClick={handleHelpSupportClick}
                    className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted/50 transition-colors duration-150 flex items-center space-x-2"
                  >
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                </div>
                <div className="border-t border-border py-2">
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-error hover:bg-muted/50 transition-colors duration-150 flex items-center space-x-2"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;