import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      id: 'soc2',
      name: 'SOC 2 Type II',
      icon: 'Shield',
      description: 'Security & Compliance'
    },
    {
      id: 'iso27001',
      name: 'ISO 27001',
      icon: 'Award',
      description: 'Information Security'
    },
    {
      id: 'gdpr',
      name: 'GDPR Compliant',
      icon: 'Lock',
      description: 'Data Protection'
    }
  ];

  const cloudPartners = [
    {
      id: 'aws',
      name: 'AWS Partner',
      icon: 'Cloud',
      color: 'text-orange-600'
    },
    {
      id: 'azure',
      name: 'Azure Partner',
      icon: 'CloudSnow',
      color: 'text-blue-600'
    },
    {
      id: 'gcp',
      name: 'GCP Partner',
      icon: 'CloudRain',
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Security Certifications */}
      <div className="text-center">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          Trusted by Enterprise Teams
        </h3>
        <div className="flex justify-center items-center space-x-6">
          {certifications?.map((cert) => (
            <div key={cert?.id} className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Icon name={cert?.icon} size={20} className="text-muted-foreground" />
              </div>
              <div className="text-center">
                <div className="text-xs font-medium text-foreground">{cert?.name}</div>
                <div className="text-xs text-muted-foreground">{cert?.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Cloud Partners */}
      <div className="text-center">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          Official Cloud Partners
        </h3>
        <div className="flex justify-center items-center space-x-8">
          {cloudPartners?.map((partner) => (
            <div key={partner?.id} className="flex items-center space-x-2">
              <Icon name={partner?.icon} size={24} className={partner?.color} />
              <span className="text-sm font-medium text-foreground">{partner?.name}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Enterprise Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">500+</div>
          <div className="text-xs text-muted-foreground">Enterprise Clients</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">$2.5B+</div>
          <div className="text-xs text-muted-foreground">Cost Optimized</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">99.9%</div>
          <div className="text-xs text-muted-foreground">Uptime SLA</div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;