import React, { useState, useEffect } from 'react';

const AuditTrail = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock audit data - in real implementation, this would come from Lambda logs or separate audit table
  useEffect(() => {
    const mockAuditLogs = [
      {
        id: 1,
        action: 'Role Updated',
        user: 'admin@c3ops.com',
        target: 'john@cloudbinary.com',
        oldValue: 'Read Only',
        newValue: 'Admin',
        tenant: 'Cloud Binary',
        timestamp: new Date(Date.now() - 1000 * 60 * 30)?.toISOString(),
        source: 'Web Console'
      },
      {
        id: 2,
        action: 'Bulk Role Assignment',
        user: 'admin@c3ops.com',
        target: '5 users',
        oldValue: 'Mixed',
        newValue: 'Read Only',
        tenant: 'Cloud Binary',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)?.toISOString(),
        source: 'Lambda Trigger'
      },
      {
        id: 3,
        action: 'User Created',
        user: 'system',
        target: 'peter@cloudbinary.com',
        oldValue: null,
        newValue: 'Analyst Level',
        tenant: 'Cloud Binary',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6)?.toISOString(),
        source: 'Cognito Registration'
      }
    ];
    setAuditLogs(mockAuditLogs);
  }, []);

  const getActionColor = (action) => {
    switch (action) {
      case 'Role Updated':
        return 'bg-blue-100 text-blue-800';
      case 'Bulk Role Assignment':
        return 'bg-purple-100 text-purple-800';
      case 'User Created':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Role Changes</h3>
        <p className="text-sm text-gray-600 mt-1">Audit trail with compliance verification</p>
      </div>
      <div className="p-6">
        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading audit trail...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {auditLogs?.map((log) => (
              <div key={log?.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getActionColor(log?.action)}`}>
                      {log?.action}
                    </span>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">{log?.user}</span>
                      <span className="text-gray-600"> performed action on </span>
                      <span className="font-medium text-gray-900">{log?.target}</span>
                      {log?.tenant && (
                        <>
                          <span className="text-gray-600"> in </span>
                          <span className="font-medium text-blue-600">{log?.tenant}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(log.timestamp)?.toLocaleString()}
                  </div>
                </div>
                
                {log?.oldValue && log?.newValue && (
                  <div className="mt-2 text-sm text-gray-600">
                    <span className="font-medium">Change:</span> {log?.oldValue} → {log?.newValue}
                  </div>
                )}
                
                <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                  <span>Source: {log?.source}</span>
                  <span>•</span>
                  <span>DynamoDB Record: Updated</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && auditLogs?.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No audit records</h3>
              <p className="mt-1 text-sm text-gray-500">Role changes will appear here once they occur.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditTrail;