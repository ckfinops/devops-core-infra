import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImplementationPanel = ({ isOpen, onClose, selectedRecommendation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [implementationStatus, setImplementationStatus] = useState('pending');

  const mockImplementationHistory = [
    {
      id: 1,
      type: 'Rightsizing',
      resource: 'EC2 Instance i-1234567890abcdef0',
      status: 'completed',
      savings: '$2,340',
      implementedDate: '2025-08-20',
      implementedBy: 'John Doe'
    },
    {
      id: 2,
      type: 'Unused Resource',
      resource: 'EBS Volume vol-0987654321fedcba0',
      status: 'completed',
      savings: '$156',
      implementedDate: '2025-08-19',
      implementedBy: 'Jane Smith'
    },
    {
      id: 3,
      type: 'Reserved Instance',
      resource: 'RDS Instance db-cluster-1',
      status: 'in-progress',
      savings: '$4,200',
      implementedDate: '2025-08-21',
      implementedBy: 'Mike Johnson'
    }
  ];

  if (!isOpen) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'in-progress': return 'text-warning bg-warning/10';
      case 'failed': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'in-progress': return 'Clock';
      case 'failed': return 'XCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-96 bg-card border-l border-border shadow-lg z-[998] overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Settings" size={16} className="text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Implementation</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedRecommendation ? (
            <div className="p-6 space-y-6">
              {/* Current Implementation */}
              <div>
                <h3 className="font-medium text-foreground mb-4">Current Implementation</h3>
                <div className="bg-muted/30 rounded-lg p-4 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Zap" size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{selectedRecommendation?.type}</div>
                      <div className="text-sm text-muted-foreground">{selectedRecommendation?.title}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Potential Savings</div>
                      <div className="font-medium text-foreground">{selectedRecommendation?.potentialSavings}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Risk Level</div>
                      <div className="font-medium text-foreground">{selectedRecommendation?.risk}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Implementation Steps */}
              <div>
                <h3 className="font-medium text-foreground mb-4">Implementation Steps</h3>
                <div className="space-y-3">
                  {selectedRecommendation?.steps?.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        index <= currentStep 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {index < currentStep ? (
                          <Icon name="Check" size={12} />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm ${
                          index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {step}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Implementation Actions */}
              <div className="space-y-3">
                <Button 
                  variant="default" 
                  className="w-full"
                  iconName="Play"
                  iconPosition="left"
                  onClick={() => setImplementationStatus('in-progress')}
                >
                  Start Implementation
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Schedule for Later
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full"
                  iconName="FileText"
                  iconPosition="left"
                >
                  Generate Implementation Plan
                </Button>
              </div>

              {/* Progress Tracking */}
              <div>
                <h3 className="font-medium text-foreground mb-4">Progress Tracking</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Overall Progress</span>
                    <span className="text-sm font-medium text-foreground">
                      {Math.round((currentStep / selectedRecommendation?.steps?.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep / selectedRecommendation?.steps?.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <h3 className="font-medium text-foreground mb-4">Recent Implementations</h3>
              <div className="space-y-3">
                {mockImplementationHistory?.map((item) => (
                  <div key={item?.id} className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={getStatusIcon(item?.status)} 
                          size={16} 
                          className={getStatusColor(item?.status)?.split(' ')?.[0]}
                        />
                        <span className="font-medium text-foreground">{item?.type}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item?.status)}`}>
                        {item?.status}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">{item?.resource}</div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Savings: {item?.savings}</span>
                      <span>{item?.implementedDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2">Total Savings This Month</div>
            <div className="text-2xl font-bold text-success">$12,456</div>
            <div className="text-xs text-muted-foreground">From 8 implementations</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImplementationPanel;