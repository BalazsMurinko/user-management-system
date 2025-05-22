/*
 * Copyright (C) logi.cals GmbH. All rights reserved.
 */

import * as React from 'react';
import { ChangeEvent } from 'react';
import { Role } from '../../services/rbac-management-service';

interface RoleListProps {
  roles: Role[];
  loading: boolean;
  editingRole: Role | undefined;
  setEditingRole: React.Dispatch<React.SetStateAction<Role | undefined>>;
  onSaveRole: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  onRemoveRole: (roleId: string) => Promise<void>;
}

/**
 * Role List Component
 * This component displays a list of roles and provides functionality to edit and remove them
 */
const RoleList: React.FC<RoleListProps> = ({
  roles,
  loading,
  editingRole,
  setEditingRole,
  onSaveRole,
  onRemoveRole
}) => {
  // Start editing a role
  const startEditingRole = (role: Role): void => {
    setEditingRole({ ...role });
  };

  // Cancel editing role
  const cancelEditingRole = (): void => {
    setEditingRole(undefined);
  };

  // Handle editing role input change
  const handleEditRoleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (!editingRole) {return;}

    const { name, value } = e.target;
    setEditingRole({
      ...editingRole,
      [name]: value
    });
  };

  // Handle editing role permission change
  const handleEditPermissionChange = (permission: string, checked: boolean): void => {
    if (!editingRole) {return;}

    if (checked) {
      setEditingRole({
        ...editingRole,
        permissions: [...editingRole.permissions, permission]
      });
    } else {
      setEditingRole({
        ...editingRole,
        permissions: editingRole.permissions.filter((p: string) => p !== permission)
      });
    }
  };

  return (
    <div className="role-list">
      {loading && !editingRole ? <p>Loading roles...</p> : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role.id}>
                {editingRole && editingRole.id === role.id ? (
                  // Edit form
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editingRole.name}
                        onChange={handleEditRoleInputChange}
                        required
                      />
                    </td>
                    <td>
                      <textarea
                        name="description"
                        value={editingRole.description}
                        onChange={handleEditRoleInputChange}
                        required
                      />
                    </td>
                    <td>
                      <div className="permissions-checkboxes">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={editingRole.permissions.includes('read')}
                            onChange={e => handleEditPermissionChange('read', e.target.checked)}
                          />
                          Read
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={editingRole.permissions.includes('write')}
                            onChange={e => handleEditPermissionChange('write', e.target.checked)}
                          />
                          Write
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={editingRole.permissions.includes('delete')}
                            onChange={e => handleEditPermissionChange('delete', e.target.checked)}
                          />
                          Delete
                        </label>
                      </div>
                    </td>
                    <td>
                      <button onClick={onSaveRole} disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                      <button onClick={cancelEditingRole}>Cancel</button>
                    </td>
                  </>
                ) : (
                  // Display role
                  <>
                    <td>{role.name}</td>
                    <td>{role.description}</td>
                    <td>{role.permissions.join(', ')}</td>
                    <td>
                      <button onClick={() => startEditingRole(role)}>Edit</button>
                      <button onClick={() => onRemoveRole(role.id)} disabled={loading}>
                        {loading ? 'Removing...' : 'Remove'}
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {roles.length === 0 && (
              <tr>
                <td colSpan={4}>No roles found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RoleList;
