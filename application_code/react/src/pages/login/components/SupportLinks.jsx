import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SupportLinks = () => {
  const supportOptions = [
    {
      id: 'demo',
      title: 'Request Demo',
      description: 'See FinOps in action with a personalized demo',
      icon: 'Play',
      action: () => console.log('Request demo clicked'),
      variant: 'outline'
    },
    {
      id: 'support',
      title: 'Contact Support',
      description: 'Get help from our technical team',
      icon: 'MessageCircle',
      action: () => console.log('Contact support clicked'),
      variant: 'ghost'
    },
    {
      id: 'docs',
      title: 'Documentation',
      description: 'Browse our comprehensive guides',
      icon: 'BookOpen',
      action: () => console.log('Documentation clicked'),
      variant: 'ghost'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          Need Help Getting Started?
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {supportOptions?.map((option) => (
          <Button
            key={option?.id}
            variant={option?.variant}
            onClick={option?.action}
            className="h-auto p-4 justify-start"
          >
            <div className="flex items-center space-x-4 w-full">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={option?.icon} size={20} className="text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-foreground">{option?.title}</div>
                <div className="text-sm text-muted-foreground">{option?.description}</div>
              </div>
              <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
            </div>
          </Button>
        ))}
      </div>
      {/* Contact Information */}
      <div className="pt-4 border-t border-border">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Phone" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Mail" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">support@finops.com</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Available 24/7 for enterprise customers
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportLinks;