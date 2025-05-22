/*!
 * Copyright (C) logi.cals GmbH. All rights reserved.
 */
import * as React from 'react';
const { useState, useEffect, useCallback, useMemo } = React;
import type { FormEvent } from 'react';
import { BridgeService } from '../../services/bridge-rbac-management-service';
import { User, Role } from '../../services/rbac-management-service';
import '../rbac-management.css'; // Reusing the same CSS
import AddUserForm from './add-user-form';
import UserList from './user-list';

interface UserManagementComponentProps {
  roles: Role[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

/**
 * User Management Component
 * This component provides a UI for managing users
 */
export const UserManagementComponent: React.FC<UserManagementComponentProps> = ({
  roles,
  loading,
  setLoading,
  error,
  setError
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({
    name: '',
    email: '',
    role: ''
  });
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Create an instance of the user management service
  const userService = useMemo(() => new BridgeService(), []);

  // Fetch all users
  const fetchUsers = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(undefined);
    try {
      const fetchedUsers = await userService.getAllUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setUsers, userService]);

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Add a new user
  const handleAddUser = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);
    try {
      const addedUser = await userService.addUser(newUser);
      setUsers([...users, addedUser]);
      setNewUser({ name: '', email: '', role: '' });
    } catch (err) {
      console.error('Error adding user:', err);
      setError('Failed to add user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Save edited user
  const handleSaveUser = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!editingUser) {return;}

    setLoading(true);
    setError(undefined);
    try {
      const updatedUser = await userService.modifyUser(
        editingUser.id,
        editingUser
      );
      setUsers(
        users.map(user => (user.id === updatedUser.id ? updatedUser : user))
      );
      setEditingUser(undefined);
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Remove a user
  const handleRemoveUser = async (userId: string): Promise<void> => {
    if (!window.confirm('Are you sure you want to remove this user?')) {return;}

    setLoading(true);
    setError(undefined);
    try {
      const success = await userService.removeUser(userId);
      if (success) {
        setUsers(users.filter(user => user.id !== userId));
      } else {
        setError('Failed to remove user.');
      }
    } catch (err) {
      console.error('Error removing user:', err);
      setError('Failed to remove user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle add form visibility
  const toggleAddForm = (): void => {
    setShowAddForm(!showAddForm);
    // Reset form when hiding
    if (showAddForm) {
      setNewUser({ name: '', email: '', role: '' });
    }
  };

  // Handle dialog close
  const handleDialogClose = (): void => {
    setShowAddForm(false);
    setNewUser({ name: '', email: '', role: '' });
  };

  return (
    <div className="tab-content">
      {/* User List Component */}
      <UserList
        users={users}
        roles={roles}
        loading={loading}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        onSaveUser={handleSaveUser}
        onRemoveUser={handleRemoveUser}
      />

      {/* User List Component with Add Button */}
      <div className="list-footer">
        <button className="add-button" onClick={toggleAddForm}>
          {showAddForm ? 'Cancel' : 'Add New User Account'}
        </button>
      </div>

      {/* Add User Form Dialog (conditionally displayed) */}
      {showAddForm && (
        <div className="dialog-overlay" onClick={handleDialogClose}>
          <div className="dialog-content" onClick={e => e.stopPropagation()}>
            <div className="dialog-header">
              <h2>Add New User Account</h2>
              <button className="dialog-close-button" onClick={handleDialogClose}>&times;</button>
            </div>
            <AddUserForm
              newUser={newUser}
              setNewUser={setNewUser}
              roles={roles}
              loading={loading}
              onAddUser={async e => {
                await handleAddUser(e);
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

export default UserManagementComponent;
