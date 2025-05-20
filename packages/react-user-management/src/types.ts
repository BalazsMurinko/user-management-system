export type UserStatus = 'active' | 'signed' | 'locked';

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  status: UserStatus;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  authorities: string[];
}

export interface UserManagementService {
  addUser(user: Omit<User, 'id'>): Promise<User>;
  removeUser(userId: string): Promise<void>;
  updateUser(user: User): Promise<User>;
  listUsers(): Promise<User[]>;
  
  addRole(role: Omit<Role, 'id'>): Promise<Role>;
  removeRole(roleId: string): Promise<void>;
  updateRole(role: Role): Promise<Role>;
  listRoles(): Promise<Role[]>;
}
