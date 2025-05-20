import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserManagementService, Role } from '../types';
import { userManagementService } from '../services/UserManagementService';

type UserManagementContextType = {
  users: User[];
  roles: Role[];
  loading: boolean;
  error: string | null;
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  removeUser: (userId: string) => Promise<void>;
  addRole: (role: Omit<Role, 'id'>) => Promise<void>;
  updateRole: (role: Role) => Promise<void>;
  removeRole: (roleId: string) => Promise<void>;
};

const UserManagementContext = createContext<UserManagementContextType | undefined>(undefined);

export const UserManagementProvider: React.FC<{ children: React.ReactNode; service?: UserManagementService }> = ({
  children,
  service = userManagementService,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [fetchedUsers, fetchedRoles] = await Promise.all([
        service.listUsers(),
        service.listRoles(),
      ]);
      setUsers(fetchedUsers);
      setRoles(fetchedRoles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addUser = async (user: Omit<User, 'id'>) => {
    try {
      const newUser = await service.addUser(user);
      setUsers(prev => [...prev, newUser]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add user');
      throw err;
    }
  };

  const updateUser = async (user: User) => {
    try {
      const updatedUser = await service.updateUser(user);
      setUsers(prev => prev.map(u => (u.id === updatedUser.id ? updatedUser : u)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
      throw err;
    }
  };

  const removeUser = async (userId: string) => {
    try {
      await service.removeUser(userId);
      setUsers(prev => prev.filter(user => user.id !== userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove user');
      throw err;
    }
  };

  const addRole = async (role: Omit<Role, 'id'>) => {
    try {
      const newRole = await service.addRole(role);
      setRoles(prev => [...prev, newRole]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add role');
      throw err;
    }
  };

  const updateRole = async (role: Role) => {
    try {
      const updatedRole = await service.updateRole(role);
      setRoles(prev => prev.map(r => (r.id === updatedRole.id ? updatedRole : r)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update role');
      throw err;
    }
  };

  const removeRole = async (roleId: string) => {
    try {
      await service.removeRole(roleId);
      setRoles(prev => prev.filter(role => role.id !== roleId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove role');
      throw err;
    }
  };

  return (
    <UserManagementContext.Provider
      value={{
        users,
        roles,
        loading,
        error,
        addUser,
        updateUser,
        removeUser,
        addRole,
        updateRole,
        removeRole,
      }}
    >
      {children}
    </UserManagementContext.Provider>
  );
};

export const useUserManagement = (): UserManagementContextType => {
  const context = useContext(UserManagementContext);
  if (!context) {
    throw new Error('useUserManagement must be used within a UserManagementProvider');
  }
  return context;
};
