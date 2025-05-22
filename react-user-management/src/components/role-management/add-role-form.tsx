/*
 * Copyright (C) logi.cals GmbH. All rights reserved.
 */
import React, { FormEvent, ChangeEvent } from 'react';
import { Role } from '../../services/rbac-management-service';

interface AddRoleFormProps {
  newRole: Omit<Role, 'id'>;
  setNewRole: React.Dispatch<React.SetStateAction<Omit<Role, 'id'>>>;
  loading: boolean;
  onAddRole: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

/**
 * Add Role Form Component
 * This component provides a form for adding new roles
 */
const AddRoleForm: React.FC<AddRoleFormProps> = ({
  newRole,
  setNewRole,
  loading,
  onAddRole
}) => {
  // Handle input change for new role form
  const handleRoleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setNewRole({
      ...newRole,
      [name]: value
    });
  };

  // Handle permissions change for new role
  const handlePermissionChange = (permission: string, checked: boolean): void => {
    if (checked) {
      setNewRole({
        ...newRole,
        permissions: [...newRole.permissions, permission]
      });
    } else {
      setNewRole({
        ...newRole,
        permissions: newRole.permissions.filter((p: string) => p !== permission)
      });
    }
  };

  return (
    <div className="add-role-form">
      <h2>Add New Role</h2>
      <form onSubmit={onAddRole}>
        <div className="form-group">
          <label htmlFor="roleName">Name:</label>
          <input
            type="text"
            id="roleName"
            name="name"
            value={newRole.name}
            onChange={handleRoleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={newRole.description}
            onChange={handleRoleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Permissions:</label>
          <div className="permissions-checkboxes">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={newRole.permissions.includes('read')}
                onChange={e => handlePermissionChange('read', e.target.checked)}
              />
              Read
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={newRole.permissions.includes('write')}
                onChange={e => handlePermissionChange('write', e.target.checked)}
              />
              Write
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={newRole.permissions.includes('delete')}
                onChange={e => handlePermissionChange('delete', e.target.checked)}
              />
              Delete
            </label>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Role'}
        </button>
      </form>
    </div>
  );
};

export default AddRoleForm;
