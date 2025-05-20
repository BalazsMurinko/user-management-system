declare module '@user-management/react' {
  import * as React from 'react';
  
  export interface User {
    id: string;
    name: string;
    email: string;
    roles: string[];
    status: 'active' | 'inactive';
  }

  export interface Role {
    id: string;
    name: string;
    permissions: string[];
  }

  export interface UserManagementContextType {
    users: User[];
    roles: Role[];
    loading: boolean;
    error: Error | null;
    addUser: (user: Omit<User, 'id'>) => Promise<void>;
    updateUser: (id: string, user: Partial<Omit<User, 'id'>>) => Promise<void>;
    removeUser: (id: string) => Promise<void>;
    addRole: (role: Omit<Role, 'id'>) => Promise<void>;
    updateRole: (id: string, role: Partial<Omit<Role, 'id'>>) => Promise<void>;
    removeRole: (id: string) => Promise<void>;
  }

  export const UserManagementProvider: React.FC<{ children: React.ReactNode }>;
  
  export const useUserManagement: () => UserManagementContextType;
  
  export interface UserManagementProps {
    onUserSelect?: (user: User) => void;
  }
  
  export const UserManagement: React.FC<UserManagementProps>;
  
  export interface UserProfileProps {
    user: User;
  }
  
  export const UserProfile: React.FC<UserProfileProps>;
}
