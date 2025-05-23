import { injectable } from '@theia/core/shared/inversify';
import { UserManagementService } from '../common/user-management-service';
import { v4 as uuidv4 } from 'uuid';
import type { User, Role } from '@local/rbac-admin-ui-react/src/types';

// Mock data for demonstration
const mockUsers: User[] = [
    {
        id: '1',
        username: 'admin',
        email: 'admin@example.com',
        roles: ['admin'],
        status: 'ACTIVE',
        firstName: 'Admin',
        lastName: 'User'
    },
    {
        id: '2',
        username: 'developer',
        email: 'dev@example.com',
        roles: ['developer'],
        status: 'ACTIVE',
        firstName: 'Dev',
        lastName: 'Eloper'
    }
];

const mockRoles: Role[] = [
    { id: 'admin', name: 'Administrator', permissions: ['*'] },
    { id: 'developer', name: 'Developer', permissions: ['read', 'write'] },
    { id: 'viewer', name: 'Viewer', permissions: ['read'] }
];

@injectable()
export class UserManagementServiceImpl implements UserManagementService {
    private users: User[] = [...mockUsers];
    private roles: Role[] = [...mockRoles];

    async getUsers(): Promise<User[]> {
        return [...this.users];
    }

    async getRoles(): Promise<Role[]> {
        return [...this.roles];
    }

    async createUser(userData: Omit<User, 'id'>): Promise<User> {
        const newUser: User = {
            ...userData,
            id: uuidv4(),
            status: userData.status || 'ACTIVE',
            // Ensure required fields have default values
            username: userData.username || userData.email.split('@')[0],
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            roles: userData.roles || []
        };
        
        this.users.push(newUser);
        return newUser;
    }

    async updateUser(user: User): Promise<User> {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index === -1) {
            throw new Error(`User with ID ${user.id} not found`);
        }
        
        // Preserve the existing user's data and update with new values
        this.users[index] = { 
            ...this.users[index],
            ...user,
            // Ensure required fields are not accidentally removed
            username: user.username || this.users[index].username,
            email: user.email || this.users[index].email,
            status: user.status || this.users[index].status,
            roles: user.roles || this.users[index].roles
        };
        
        return this.users[index];
    }

    async deleteUser(userId: string): Promise<void> {
        const index = this.users.findIndex(user => user.id === userId);
        if (index === -1) {
            throw new Error(`User with ID ${userId} not found`);
        }
        
        this.users.splice(index, 1);
    }

    async createRole(roleData: Omit<Role, 'id'>): Promise<Role> {
        const roleId = roleData.name.toLowerCase().replace(/\s+/g, '-');
        
        // Check if role with same ID already exists
        if (this.roles.some(r => r.id === roleId)) {
            throw new Error(`A role with ID '${roleId}' already exists`);
        }
        
        const newRole: Role = {
            ...roleData,
            id: roleId,
            permissions: roleData.permissions || []
        };
        
        this.roles.push(newRole);
        return newRole;
    }

    async updateRole(role: Role): Promise<Role> {
        const index = this.roles.findIndex(r => r.id === role.id);
        if (index === -1) {
            throw new Error(`Role with ID ${role.id} not found`);
        }
        
        // Preserve the existing role's data and update with new values
        this.roles[index] = { 
            ...this.roles[index],
            ...role,
            // Ensure required fields are not accidentally removed
            name: role.name || this.roles[index].name,
            permissions: role.permissions || this.roles[index].permissions
        };
        
        return this.roles[index];
    }

    async deleteRole(roleId: string): Promise<void> {
        const index = this.roles.findIndex(role => role.id === roleId);
        if (index === -1) {
            throw new Error(`Role with ID ${roleId} not found`);
        }
        
        // Check if any user is using this role
        const usersWithRole = this.users.some(user => user.roles.includes(roleId));
        if (usersWithRole) {
            throw new Error('Cannot delete role that is assigned to users');
        }
        
        this.roles.splice(index, 1);
    }
}