import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SecurityNotifications = () => {
  const [dismissed, setDismissed] = useState({});

  const notifications = [
    {
      id: 'encryption',
      type: 'info',
      title: 'End-to-End Encryption',
      message: 'All credentials are encrypted in transit and at rest using AES-256 encryption.',
      icon: 'Lock',
      dismissible: true
    },
    {
      id: 'compliance',
      type: 'success',
      title: 'SOC2 Compliant',
      message: 'Our infrastructure meets SOC2 Type II compliance standards for security and availability.',
      icon: 'Shield',
      dismissible: true
    },
    {
      id: 'credential_rotation',
      type: 'warning',
      title: 'Credential Rotation Reminder',
      message: 'For enhanced security, rotate your cloud provider credentials every 90 days.',
      icon: 'AlertTriangle',
      dismissible: false
    }
  ];

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-success/10 border-success/20',
          icon: 'text-success',
          title: 'text-success',
          message: 'text-success/80'
        };
      case 'warning':
        return {
          container: 'bg-warning/10 border-warning/20',
          icon: 'text-warning',
          title: 'text-warning',
          message: 'text-warning/80'
        };
      case 'error':
        return {
          container: 'bg-error/10 border-error/20',
          icon: 'text-error',
          title: 'text-error',
          message: 'text-error/80'
        };
      default:
        return {
          container: 'bg-info/10 border-info/20',
          icon: 'text-info',
          title: 'text-info',
          message: 'text-info/80'
        };
    }
  };

  const handleDismiss = (id) => {
    setDismissed(prev => ({ ...prev, [id]: true }));
  };

  const visibleNotifications = notifications?.filter(n => !dismissed?.[n?.id]);

  if (visibleNotifications?.length === 0) return null;

  return (
    <div className="space-y-3">
      {visibleNotifications?.map((notification) => {
        const styles = getNotificationStyles(notification?.type);

        return (
          <div
            key={notification?.id}
            className={`border rounded-lg p-4 ${styles?.container}`}
          >
            <div className="flex items-start space-x-3">
              <Icon 
                name={notification?.icon} 
                size={16} 
                className={`mt-0.5 ${styles?.icon}`}
              />
              
              <div className="flex-1">
                <h4 className={`text-sm font-medium ${styles?.title}`}>
                  {notification?.title}
                </h4>
                <p className={`text-xs mt-1 ${styles?.message}`}>
                  {notification?.message}
                </p>
              </div>

              {notification?.dismissible && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => handleDismiss(notification?.id)}
                  className="text-muted-foreground hover:text-foreground -m-1"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SecurityNotifications;