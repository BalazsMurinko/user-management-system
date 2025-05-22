/*!
 * Copyright (C) logi.cals GmbH. All rights reserved.
 */

import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { User, Role } from '../../services/rbac-management-service';

interface UserListProps {
  users: User[];
  roles: Role[];
  loading: boolean;
  editingUser: User | undefined;
  setEditingUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  onSaveUser: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  onRemoveUser: (userId: string) => Promise<void>;
}

/**
 * User List Component
 * This component displays a list of users and provides functionality to edit and remove them
 */
const UserList: React.FC<UserListProps> = ({
  users,
  roles,
  loading,
  editingUser,
  setEditingUser,
  onSaveUser,
  onRemoveUser
}) => {
  // Start editing a user
  const startEditing = (user: User): void => {
    setEditingUser({ ...user });
  };

  // Cancel editing
  const cancelEditing = (): void => {
    setEditingUser(undefined);
  };

  // Handle input change for editing user
  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    if (!editingUser) {return;}

    const { name, value } = e.target;
    setEditingUser({
      ...editingUser,
      [name]: value
    });
  };

  // State to track which dropdown is currently open
  const [activeDropdown, setActiveDropdown] = useState<string | undefined>(undefined);

  // Toggle dropdown visibility
  const toggleDropdown = (userId: string): void => {
    setActiveDropdown(activeDropdown === userId ? undefined : userId);
  };

  // Close dropdown when clicking outside
  const closeDropdown = (): void => {
    setActiveDropdown(undefined);
  };

  return (
    <div className="user-list">
      {loading && !editingUser ? <p>Loading users...</p> : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}/{users.length}</td>
                {editingUser && editingUser.id === user.id ? (
                  // Edit form
                  <>
                    <td>
                      <input
                        type="text"
                        name="User Name"
                        value={editingUser.name}
                        onChange={handleEditInputChange}
                        required
                      />
                    </td>
                    <td>
                      <select
                        name="User Role"
                        value={editingUser.role}
                        onChange={handleEditInputChange}
                        required
                      >
                        <option value="">Select a role</option>
                        {roles.map(role => (
                          <option key={role.id} value={role.name}>{role.name}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        name="Status"
                        value={editingUser.status}
                        onChange={handleEditInputChange}
                        required
                      >
                        <option value="Active">Active</option>
                        <option value="Locked">Locked</option>
                        <option value="Signed on">Signed on</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={onSaveUser} disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                      <button onClick={cancelEditing}>Cancel</button>
                    </td>
                  </>
                ) : (
                  // Display user
                  <>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.status}</td>
                    <td>
                      <div className="dropdown-container">
                        <button
                          className="dropdown-button"
                          onClick={() => toggleDropdown(user.id)}
                        >
                          Actions ▼
                        </button>
                        {activeDropdown === user.id && (
                          <div className="dropdown-menu">
                            <button
                              className="dropdown-item"
                              onClick={() => {
                                startEditing(user);
                                closeDropdown();
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="dropdown-item"
                              onClick={() => {
                                onRemoveUser(user.id);
                                closeDropdown();
                              }}
                              disabled={loading}
                            >
                              {loading ? 'Removing...' : 'Remove'}
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
