/*
 * Copyright (C) logi.cals GmbH. All rights reserved.
 */

import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import type { FormEvent } from 'react';
import { Role } from '../../services/rbac-management-service';
import '../rbac-management.css'; // Reusing the same CSS
import AddRoleForm from './add-role-form';
import RoleList from './role-list';

interface RoleManagementComponentProps {
  roles: Role[];
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

/**
 * Role Management Component
 * This component provides a UI for managing roles
 */
const RoleManagementComponent: React.FC<RoleManagementComponentProps> = ({
  roles,
  setRoles,
  loading,
  setLoading,
  error,
  setError
}) => {
  const [newRole, setNewRole] = useState<Omit<Role, 'id'>>({
    name: '',
    description: '',
    permissions: []
  });
  const [editingRole, setEditingRole] = useState<Role | undefined>(undefined);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Fetch roles function
  const fetchRoles = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(undefined);
    try {
      // In a real application, you would fetch roles from a service
      // For now, we'll use mock data
      const mockRoles: Role[] = [
        {
          id: '1',
          name: 'Admin',
          description: 'Administrator with full access',
          permissions: ['read', 'write', 'delete']
        },
        {
          id: '2',
          name: 'Editor',
          description: 'Can edit content',
          permissions: ['read', 'write']
        },
        {
          id: '3',
          name: 'Viewer',
          description: 'Read-only access',
          permissions: ['read']
        }
      ];
      setRoles(mockRoles);
    } catch (err) {
      console.error('Error fetching roles:', err);
      setError('Failed to load roles. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setRoles]);

  // Fetch roles on component mount if needed
  useEffect(() => {
    if (roles.length === 0) {
      fetchRoles();
    }
  }, [roles.length, fetchRoles]);

  // Add a new role
  const handleAddRole = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);
    try {
      // In a real application, you would add the role using a service
      // For now, we'll simulate adding a role
      const addedRole: Role = {
        id: Date.now().toString(), // Generate a unique ID
        name: newRole.name,
        description: newRole.description,
        permissions: newRole.permissions
      };
      setRoles([...roles, addedRole]);
      setNewRole({ name: '', description: '', permissions: [] });
    } catch (err) {
      console.error('Error adding role:', err);
      setError('Failed to add role. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Save edited role
  const handleSaveRole = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!editingRole) {return;}

    setLoading(true);
    setError(undefined);
    try {
      // In a real application, you would update the role using a service
      // For now, we'll simulate updating a role
      setRoles(
        roles.map((role: Role) =>
          role.id === editingRole.id ? editingRole : role
        )
      );
      setEditingRole(undefined);
    } catch (err) {
      console.error('Error updating role:', err);
      setError('Failed to update role. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Remove a role
  const handleRemoveRole = async (roleId: string): Promise<void> => {
    if (!window.confirm('Are you sure you want to remove this role?')) {return;}

    setLoading(true);
    setError(undefined);
    try {
      // In a real application, you would remove the role using a service
      // For now, we'll simulate removing a role
      setRoles(roles.filter((role: Role) => role.id !== roleId));
    } catch (err) {
      console.error('Error removing role:', err);
      setError('Failed to remove role. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle add form visibility
  const toggleAddForm = (): void => {
    setShowAddForm(!showAddForm);
    // Reset form when hiding
    if (showAddForm) {
      setNewRole({ name: '', description: '', permissions: [] });
    }
  };

  // Handle dialog close
  const handleDialogClose = (): void => {
    setShowAddForm(false);
    setNewRole({ name: '', description: '', permissions: [] });
  };

  return (
    <div className="tab-content">
      {/* Role List Component */}
      <RoleList
        roles={roles}
        loading={loading}
        editingRole={editingRole}
        setEditingRole={setEditingRole}
        onSaveRole={handleSaveRole}
        onRemoveRole={handleRemoveRole}
      />

      {/* Role List Component with Add Button */}
      <div className="list-footer">
        <button className="add-button" onClick={toggleAddForm}>
          {showAddForm ? 'Cancel' : 'Add Role'}
        </button>
      </div>

      {/* Add Role Form Dialog (conditionally displayed) */}
      {showAddForm && (
        <div className="dialog-overlay" onClick={handleDialogClose}>
          <div className="dialog-content" onClick={e => e.stopPropagation()}>
            <div className="dialog-header">
              <h2>Add New Role</h2>
              <button className="dialog-close-button" onClick={handleDialogClose}>&times;</button>
            </div>
            <AddRoleForm
              newRole={newRole}
              setNewRole={setNewRole}
              loading={loading}
              onAddRole={async e => {
                await handleAddRole(e);
                // Close dialog after successful submission
                if (!error) {
                  setShowAddForm(false);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagementComponent;
