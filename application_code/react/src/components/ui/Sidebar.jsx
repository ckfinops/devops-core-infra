import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleSubmenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev?.[menuId]
    }));
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard-overview',
      icon: 'LayoutDashboard',
      tooltip: 'Central command center for comprehensive cost visibility'
    },
    {
      id: 'cost-analysis',
      label: 'Cost Analysis',
      path: '/multi-cloud-cost-analysis',
      icon: 'BarChart3',
      tooltip: 'Deep analytical tools for multi-cloud cost examination'
    },
    {
      id: 'optimization',
      label: 'Optimization',
      path: '/cost-optimization-recommendations',
      icon: 'TrendingUp',
      tooltip: 'Actionable recommendations for cost reduction strategies'
    },
    {
      id: 'budget-planning',
      label: 'Budget Planning',
      path: '/budget-planning-forecasting',
      icon: 'Calculator',
      tooltip: 'Strategic forecasting and budget management tools'
    },
    {
      id: 'alerts',
      label: 'Alerts',
      path: '/cost-alerts-notifications',
      icon: 'Bell',
      tooltip: 'Proactive monitoring and notification management',
      badge: 3
    },
    {
      id: 'aws',
      label: 'AWS',
      path: '/aws-applications-assets',
      icon: 'Cloud',
      tooltip: 'AWS applications and infrastructure assets'
    },
    {
      id: 'azure',
      label: 'Azure',
      path: '/azure-applications-assets',
      icon: 'Cloud',
      tooltip: 'Azure applications and resources'
    },
    {
      id: 'gcp',
      label: 'GCP',
      path: '/gcp-applications-assets',
      icon: 'Cloud',
      tooltip: 'Google Cloud Platform applications and resources'
    },
    {
      id: 'assets-apps',
      label: 'Assets-Apps',
      path: '/application-inventory',
      icon: 'Package',
      tooltip: 'General application inventory and asset management system'
    }
  ];

  const isActive = (path) => location?.pathname === path;

  const isSubmenuActive = (submenu) => {
    return submenu?.some(item => isActive(item?.path));
  };

  const handleItemClick = (path) => {
    if (path) {
      window.location.href = path;
    }
  };

  const handleMenuToggle = (menuId, hasSubmenu) => {
    if (hasSubmenu) {
      toggleSubmenu(menuId);
    }
  };

  return (
    <>
      {/* Sidebar - Optimized for 1024px screens */}
      <aside 
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border z-[999] transition-all duration-300 ease-out ${
          isCollapsed ? 'w-16 laptop:w-18' : 'w-56 laptop:w-58'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Toggle Button - Positioned for 1024px */}
          <div className="flex items-center justify-end p-2 laptop:p-3 border-b border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="h-6 w-6 laptop:h-7 laptop:w-7"
            >
              <Icon 
                name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
                size={16} 
              />
            </Button>
          </div>

          {/* Navigation Menu - Optimized for 1024px screens */}
          <nav className="flex-1 p-2 laptop:p-3 overflow-y-auto">
            <div className="space-y-1">
              {menuItems?.map((item) => (
                <div
                  key={item?.id}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item?.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    onClick={() => item?.hasSubmenu ? handleMenuToggle(item?.id, true) : handleItemClick(item?.path)}
                    className={`w-full flex items-center space-x-2 px-2 laptop:px-3 py-2 laptop:py-2.5 rounded-lg text-sm font-medium transition-all duration-150 hover:bg-muted/50 ${
                      item?.hasSubmenu 
                        ? (isSubmenuActive(item?.submenu) ? 'bg-primary text-primary-foreground shadow-sm' : 'text-card-foreground hover:text-foreground')
                        : (isActive(item?.path) ? 'bg-primary text-primary-foreground shadow-sm' : 'text-card-foreground hover:text-foreground')
                    } ${isCollapsed ? 'justify-center' : 'justify-start'}`}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={18} 
                      className={`flex-shrink-0 ${(item?.hasSubmenu ? isSubmenuActive(item?.submenu) : isActive(item?.path)) ? 'text-primary-foreground' : 'text-muted-foreground'}`}
                    />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left text-sm truncate">{item?.label}</span>
                        {item?.badge && (
                          <span className="bg-error text-error-foreground text-xs px-1.5 py-0.5 rounded-full font-medium flex-shrink-0">
                            {item?.badge}
                          </span>
                        )}
                        {item?.hasSubmenu && (
                          <Icon 
                            name={expandedMenus?.[item?.id] ? "ChevronDown" : "ChevronRight"} 
                            size={14} 
                            className="flex-shrink-0 transition-transform duration-200"
                          />
                        )}
                      </>
                    )}
                  </button>

                  {/* Submenu */}
                  {item?.hasSubmenu && !isCollapsed && expandedMenus?.[item?.id] && (
                    <div className="ml-4 laptop:ml-5 mt-1 space-y-1">
                      {item?.submenu?.map((subItem) => (
                        <button
                          key={subItem?.id}
                          onClick={() => handleItemClick(subItem?.path)}
                          className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 hover:bg-muted/50 ${
                            isActive(subItem?.path)
                              ? 'bg-primary/10 text-primary border-l-2 border-primary' :'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <Icon name={subItem?.icon} size={14} />
                          <span className="flex-1 text-left truncate">{subItem?.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Tooltip for collapsed state - Optimized positioning for 1024px */}
                  {isCollapsed && hoveredItem === item?.id && (
                    <div className="absolute left-16 laptop:left-18 top-0 z-[1002] bg-popover border border-border rounded-lg shadow-elevation-3 px-3 py-2 ml-2 min-w-[200px] laptop:min-w-[220px]">
                      <div className="text-sm font-medium text-popover-foreground whitespace-nowrap">
                        {item?.label}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 whitespace-normal">
                        {item?.tooltip}
                      </div>
                      {item?.badge && (
                        <div className="flex items-center mt-2">
                          <span className="bg-error text-error-foreground text-xs px-2 py-0.5 rounded-full font-medium">
                            {item?.badge} alerts
                          </span>
                        </div>
                      )}
                      {/* Arrow */}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-popover border-l border-b border-border rotate-45"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Bottom Section - Optimized for 1024px */}
          <div className="p-2 laptop:p-3 border-t border-border">
            <div className={`flex items-center space-x-2 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-1">Last Updated</div>
                  <div className="text-sm font-medium text-card-foreground truncate">2 minutes ago</div>
                </div>
              )}
              <div className="flex items-center space-x-1 flex-shrink-0">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                {!isCollapsed && (
                  <span className="text-xs text-success font-medium">Live</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;