import React, { useState } from 'react';

const BulkRoleActions = ({ selectedCount, onBulkUpdate, selectedUsers }) => {
  const [bulkRole, setBulkRole] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleBulkUpdate = () => {
    if (!bulkRole) return;
    setShowConfirm(true);
  };

  const confirmUpdate = () => {
    onBulkUpdate(selectedUsers, bulkRole);
    setShowConfirm(false);
    setBulkRole('');
  };

  return (
    <div className="bg-blue-50 border border-blue-200 p-4 mx-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-blue-800">
            {selectedCount} users selected
          </span>
          <select
            value={bulkRole}
            onChange={(e) => setBulkRole(e?.target?.value)}
            className="text-sm border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select role to assign</option>
            <option value="Read Only">Read Only</option>
            <option value="Admin">Admin</option>
            <option value="Super User">Super User</option>
          </select>
          <button
            onClick={handleBulkUpdate}
            disabled={!bulkRole}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Update Roles
          </button>
        </div>
        <div className="text-sm text-blue-600">
          Bulk role assignment with Lambda triggers
        </div>
      </div>
      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Bulk Role Update
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to update {selectedCount} users to the "{bulkRole}" role? 
              This action will trigger Lambda functions and update DynamoDB records.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpdate}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkRoleActions;