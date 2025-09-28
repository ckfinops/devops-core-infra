import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ArchitectureTab = ({ application }) => {
  const [selectedDiagram, setSelectedDiagram] = useState('system-overview');

  // Mock architecture diagrams data
  const diagrams = [
    {
      id: 'system-overview',
      name: 'System Overview',
      type: 'High Level Architecture',
      lastUpdated: '2025-01-05',
      description: 'Overall system architecture showing major components and data flows'
    },
    {
      id: 'component-diagram',
      name: 'Component Diagram',
      type: 'Detailed Architecture',
      lastUpdated: '2025-01-03',
      description: 'Detailed component relationships and dependencies'
    },
    {
      id: 'data-flow',
      name: 'Data Flow Diagram',
      type: 'Process Flow',
      lastUpdated: '2024-12-28',
      description: 'Data flow between application components and external systems'
    },
    {
      id: 'network-topology',
      name: 'Network Topology',
      type: 'Infrastructure',
      lastUpdated: '2024-12-20',
      description: 'Network architecture and security boundaries'
    }
  ];

  const selectedDiagramData = diagrams?.find(d => d?.id === selectedDiagram);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Application Architecture Diagrams</h3>
          <p className="text-muted-foreground">Visual system architecture and component relationships</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" iconName="Upload" iconPosition="left">
            Upload Diagram
          </Button>
          <Button variant="primary" size="sm" iconName="Plus" iconPosition="left">
            Create New
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Diagram List */}
        <div className="lg:col-span-1">
          <h4 className="text-sm font-medium text-foreground mb-3">Available Diagrams</h4>
          <div className="space-y-2">
            {diagrams?.map((diagram) => (
              <button
                key={diagram?.id}
                onClick={() => setSelectedDiagram(diagram?.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedDiagram === diagram?.id
                    ? 'border-primary bg-primary/10 text-primary' :'border-border bg-card hover:bg-muted/50 text-foreground'
                }`}
              >
                <div className="flex items-start space-x-2">
                  <Icon name="FileText" size={16} className="flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{diagram?.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{diagram?.type}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Diagram Viewer */}
        <div className="lg:col-span-3 space-y-4">
          {selectedDiagramData && (
            <>
              {/* Diagram Info */}
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-foreground">{selectedDiagramData?.name}</h4>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Download">
                      Download
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Edit">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{selectedDiagramData?.description}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Type: {selectedDiagramData?.type}</span>
                  <span>Last Updated: {selectedDiagramData?.lastUpdated}</span>
                </div>
              </div>

              {/* Diagram Display Area */}
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center space-y-2">
                    <Icon name="Image" size={48} className="mx-auto text-muted-foreground" />
                    <p className="text-lg font-medium text-foreground">{selectedDiagramData?.name}</p>
                    <p className="text-sm text-muted-foreground">Architecture diagram would be displayed here</p>
                    <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
                      View Full Size
                    </Button>
                  </div>
                </div>
              </div>

              {/* Diagram Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="text-sm font-semibold text-foreground">Key Components</h5>
                  <div className="space-y-2">
                    {['Frontend Layer', 'API Gateway', 'Microservices', 'Database Layer', 'Caching Layer']?.map((component, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="Box" size={16} className="text-primary" />
                        <span className="text-sm text-foreground">{component}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="text-sm font-semibold text-foreground">Integration Points</h5>
                  <div className="space-y-2">
                    {['Customer Database', 'Payment Gateway', 'Email Service', 'Notification System']?.map((integration, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="Zap" size={16} className="text-orange-500" />
                        <span className="text-sm text-foreground">{integration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Version History */}
              <div className="border-t border-border pt-4">
                <h5 className="text-sm font-semibold text-foreground mb-3">Version History</h5>
                <div className="space-y-2">
                  {[
                    { version: 'v2.1', date: '2025-01-05', author: 'John Smith', changes: 'Updated microservices architecture' },
                    { version: 'v2.0', date: '2024-12-20', author: 'Sarah Johnson', changes: 'Major architecture overhaul' },
                    { version: 'v1.5', date: '2024-12-01', author: 'Mike Davis', changes: 'Added caching layer' }
                  ]?.map((version, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-muted/30 rounded">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-foreground">{version?.version}</span>
                        <span className="text-sm text-muted-foreground">{version?.date}</span>
                        <span className="text-sm text-muted-foreground">by {version?.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{version?.changes}</span>
                        <Button variant="ghost" size="sm" iconName="Eye" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchitectureTab;