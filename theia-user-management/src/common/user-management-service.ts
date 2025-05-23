import { Role, User } from "@local/rbac-admin-ui-react";

export const UserManagementServicePath = '/services/user-management';
export const UserManagementService = Symbol('UserManagementService');

export interface UserManagementService {
    // User management
    getUsers(): Promise<User[]>;
    createUser(user: Omit<User, 'id'>): Promise<User>;
    updateUser(user: User): Promise<User>;
    deleteUser(userId: string): Promise<void>;
    
    // Role management
    getRoles(): Promise<Role[]>;
    createRole(role: Omit<Role, 'id'>): Promise<Role>;
    updateRole(role: Role): Promise<Role>;
    deleteRole(roleId: string): Promise<void>;
}
export { User, Role };

