/*
 * Copyright (C) logi.cals GmbH. All rights reserved.
 */
import React, { FormEvent, ChangeEvent } from 'react';
import { User, Role } from '../../services/rbac-management-service';

interface AddUserFormProps {
  newUser: Omit<User, 'id'>;
  setNewUser: React.Dispatch<React.SetStateAction<Omit<User, 'id'>>>;
  roles: Role[];
  loading: boolean;
  onAddUser: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

/**
 * Add User Form Component
 * This component provides a form for adding new users
 */
const AddUserForm: React.FC<AddUserFormProps> = ({
  newUser,
  setNewUser,
  roles,
  loading,
  onAddUser
}) => {
  // Handle input change for new user form
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };

  return (
    <div className="add-user-form">
      <h2>Add New User</h2>
      <form onSubmit={onAddUser}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a role</option>
            {roles.map(role => (
              <option key={role.id} value={role.name}>{role.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
