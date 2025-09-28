import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserTable = ({ users, selectedUsers, onSelectionChange, onEditUser, onDeleteUser, loading }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRowExpansion = (userId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(userId)) {
      newExpanded?.delete(userId);
    } else {
      newExpanded?.add(userId);
    }
    setExpandedRows(newExpanded);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(users?.map(user => user?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectUser = (userId, checked) => {
    if (checked) {
      onSelectionChange([...selectedUsers, userId]);
    } else {
      onSelectionChange(selectedUsers?.filter(id => id !== userId));
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Executive Level': return 'bg-purple-100 text-purple-800';
      case 'Management Level': return 'bg-blue-100 text-blue-800';
      case 'Operational Level': return 'bg-green-100 text-green-800';
      case 'Analyst Level': return 'bg-yellow-100 text-yellow-800';
      case 'Read-Only Access': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ?'bg-green-100 text-green-800' :'bg-gray-100 text-gray-600';
  };

  const formatLastLogin = (lastLogin) => {
    const date = new Date(lastLogin);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(5)]?.map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-muted rounded"></div>
                <div className="w-10 h-10 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-3 bg-muted rounded w-1/3"></div>
                </div>
                <div className="w-20 h-6 bg-muted rounded"></div>
                <div className="w-16 h-6 bg-muted rounded"></div>
                <div className="w-20 h-4 bg-muted rounded"></div>
                <div className="w-16 h-6 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="px-6 py-4 text-left">
                <Checkbox
                  checked={selectedUsers?.length === users?.length && users?.length > 0}
                  indeterminate={selectedUsers?.length > 0 && selectedUsers?.length < users?.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Role Level
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users?.map((user) => (
              <React.Fragment key={user?.id}>
                <tr className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <Checkbox
                      checked={selectedUsers?.includes(user?.id)}
                      onChange={(checked) => handleSelectUser(user?.id, checked)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{user?.name}</div>
                        <div className="text-sm text-muted-foreground">{user?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
                        {user?.role}
                      </span>
                      <div className="text-xs text-muted-foreground">{user?.roleType}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-foreground">{user?.department}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-foreground">{formatLastLogin(user?.lastLogin)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user?.status)}`}>
                      {user?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName={expandedRows?.has(user?.id) ? "ChevronUp" : "ChevronDown"}
                        onClick={() => toggleRowExpansion(user?.id)}
                        title="Toggle details"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Edit"
                        onClick={() => onEditUser?.(user)}
                        title="Edit user"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Trash2"
                        onClick={() => onDeleteUser?.(user?.id)}
                        title="Delete user"
                        className="text-destructive hover:text-destructive"
                      />
                    </div>
                  </td>
                </tr>

                {/* Expanded Row */}
                {expandedRows?.has(user?.id) && (
                  <tr className="bg-muted/10">
                    <td colSpan="7" className="px-6 py-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Permission Matrix */}
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-3">Permission Matrix</h4>
                          <div className="space-y-2">
                            {[
                              'Cost Analysis', 
                              'Budget Management', 
                              'Optimization Recommendations', 
                              'Admin Functions'
                            ]?.map((permission) => (
                              <div key={permission} className="flex items-center space-x-2">
                                <Icon 
                                  name={user?.permissions?.includes(permission?.toLowerCase()?.replace(' ', '_')) ? "CheckCircle" : "XCircle"} 
                                  size={16} 
                                  className={user?.permissions?.includes(permission?.toLowerCase()?.replace(' ', '_')) ? "text-success" : "text-muted-foreground"} 
                                />
                                <span className="text-sm text-foreground">{permission}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Access History */}
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-3">Recent Access History</h4>
                          <div className="space-y-2">
                            <div className="text-sm text-muted-foreground">
                              Last active: {formatLastLogin(user?.lastLogin)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Sessions this week: 12
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Average session time: 45 minutes
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {users?.length === 0 && !loading && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
          <p className="text-muted-foreground mb-4">
            No users match your current filters. Try adjusting your search criteria.
          </p>
          <Button variant="primary" iconName="UserPlus" iconPosition="left">
            Invite First User
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserTable;