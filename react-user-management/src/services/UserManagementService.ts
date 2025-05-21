import { User, UserManagementService, Role } from '../types';

export class InMemoryUserManagementService implements UserManagementService {
  private users: User[] = [];
  private roles: Role[] = [];

  async addUser(user: Omit<User, 'id'>): Promise<User> {
    const newUser = {
      ...user,
      id: (this.users.length + 1).toString(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async removeUser(userId: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== userId);
  }

  async updateUser(updatedUser: User): Promise<User> {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index === -1) {
      throw new Error('User not found');
    }
    this.users[index] = updatedUser;
    return updatedUser;
  }

  async listUsers(): Promise<User[]> {
    return [...this.users];
  }

  async addRole(role: Omit<Role, 'id'>): Promise<Role> {
    const newRole = {
      ...role,
      id: (this.roles.length + 1).toString(),
    };
    this.roles.push(newRole);
    return newRole;
  }

  async removeRole(roleId: string): Promise<void> {
    // Check if any user has this role
    const usersWithRole = this.users.some(user => user.roles.includes(roleId));
    if (usersWithRole) {
      throw new Error('Cannot delete role that is assigned to users');
    }
    this.roles = this.roles.filter(role => role.id !== roleId);
  }

  async updateRole(updatedRole: Role): Promise<Role> {
    const index = this.roles.findIndex(role => role.id === updatedRole.id);
    if (index === -1) {
      throw new Error('Role not found');
    }
    this.roles[index] = updatedRole;
    return updatedRole;
  }

  async listRoles(): Promise<Role[]> {
    return [...this.roles];
  }
}

export const userManagementService = new InMemoryUserManagementService();
