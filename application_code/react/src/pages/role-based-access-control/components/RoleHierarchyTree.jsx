import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RoleHierarchyTree = ({ roles, selectedRole, onRoleSelect, loading, searchTerm }) => {
  const [expandedRoles, setExpandedRoles] = useState(new Set(['Executive Level']));

  const toggleRoleExpansion = (roleName) => {
    const newExpanded = new Set(expandedRoles);
    if (newExpanded?.has(roleName)) {
      newExpanded?.delete(roleName);
    } else {
      newExpanded?.add(roleName);
    }
    setExpandedRoles(newExpanded);
  };

  const getRoleIcon = (level) => {
    switch (level) {
      case 1: return 'Crown';
      case 2: return 'Users';
      case 3: return 'Settings';
      case 4: return 'BarChart';
      case 5: return 'Eye';
      default: return 'Shield';
    }
  };

  const getRoleColor = (level) => {
    switch (level) {
      case 1: return 'text-purple-600 bg-purple-50';
      case 2: return 'text-blue-600 bg-blue-50';
      case 3: return 'text-green-600 bg-green-50';
      case 4: return 'text-yellow-600 bg-yellow-50';
      case 5: return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredRoles = roles?.filter(role => 
    searchTerm === '' || 
    role?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    role?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const buildHierarchy = (roles, parent = null, level = 0) => {
    return roles
      ?.filter(role => role?.parent === parent)
      ?.map(role => ({
        ...role,
        children: buildHierarchy(roles, role?.name, level + 1),
        level
      }));
  };

  const renderRoleTree = (rolesHierarchy, indentLevel = 0) => {
    return rolesHierarchy?.map((role) => (
      <div key={role?.id}>
        <div
          className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
            selectedRole === role?.name ? 'bg-primary/10 border border-primary/20' : ''
          }`}
          style={{ marginLeft: `${indentLevel * 16}px` }}
          onClick={() => onRoleSelect(role?.name)}
        >
          {role?.children?.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              iconName={expandedRoles?.has(role?.name) ? "ChevronDown" : "ChevronRight"}
              onClick={(e) => {
                e?.stopPropagation();
                toggleRoleExpansion(role?.name);
              }}
              className="mr-2 p-0 h-4 w-4"
            />
          )}
          
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${getRoleColor(role?.level)}`}>
            <Icon name={getRoleIcon(role?.level)} size={16} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-medium truncate ${
                  selectedRole === role?.name ? 'text-primary' : 'text-foreground'
                }`}>
                  {role?.name}
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  {role?.users} user{role?.users !== 1 ? 's' : ''}
                </p>
              </div>
              
              {selectedRole === role?.name && (
                <Icon name="ChevronRight" size={16} className="text-primary flex-shrink-0" />
              )}
            </div>
          </div>
        </div>
        
        {expandedRoles?.has(role?.name) && role?.children?.length > 0 && (
          <div className="mt-2">
            {renderRoleTree(role?.children, indentLevel + 1)}
          </div>
        )}
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-6 bg-muted rounded w-32 mb-2"></div>
            <div className="h-4 bg-muted rounded w-48"></div>
          </div>
        </div>
        <div className="space-y-3">
          {[...Array(5)]?.map((_, index) => (
            <div key={index} className="flex items-center space-x-3 animate-pulse">
              <div className="w-8 h-8 bg-muted rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-muted rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const hierarchy = buildHierarchy(filteredRoles);

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Role Hierarchy</h3>
          <p className="text-sm text-muted-foreground">
            Hierarchical access system with inheritance rules
          </p>
        </div>
        <Button variant="ghost" size="sm" iconName="RefreshCw" />
      </div>

      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {hierarchy?.length > 0 ? (
          renderRoleTree(hierarchy)
        ) : (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-sm font-medium text-foreground mb-2">No roles found</h4>
            <p className="text-xs text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{roles?.length} total role{roles?.length !== 1 ? 's' : ''}</span>
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={12} />
            <span>Inheritance rules apply</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleHierarchyTree;