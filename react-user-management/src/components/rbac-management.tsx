/*!
 * Copyright (C) logi.cals GmbH. All rights reserved.
 */
import * as React from 'react';
import { useState } from 'react';
import { Role } from '../services/rbac-management-service';
import UserManagementComponent from './user-management/user-management-component';
import RoleManagementComponent from './role-management/role-management-component';
import './rbac-management.css';

/**
 * Tab type for the component
 */
type TabType = 'users' | 'roles';

/**
 * User Management Container Component
 * This component provides a tabbed interface for managing users and roles
 */
const RbacManagement: React.FC = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState<TabType>('users');

  // Role management state
  const [roles, setRoles] = useState<Role[]>([]);

  // Shared state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  // Handle tab change
  const handleTabChange = (tab: TabType): void => {
    setActiveTab(tab);
    setError(undefined);
  };

  return (
    <div className="user-management">
      {/* Tab Navigation */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => handleTabChange('users')}
        >
          Users Account
        </button>
        <button
          className={`tab-button ${activeTab === 'roles' ? 'active' : ''}`}
          onClick={() => handleTabChange('roles')}
        >
          Roles
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Users Tab Content */}
      {activeTab === 'users' && (
        <UserManagementComponent
          roles={roles}
          loading={loading}
          setLoading={setLoading}
          error={error}
          setError={setError}
        />
      )}

      {/* Roles Tab Content */}
      {activeTab === 'roles' && (
        <RoleManagementComponent
          roles={roles}
          setRoles={setRoles}
          loading={loading}
          setLoading={setLoading}
          error={error}
          setError={setError}
        />
      )}
    </div>
  );
};

export default RbacManagement;
