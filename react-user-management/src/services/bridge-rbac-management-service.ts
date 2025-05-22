import { UserManagementService, RoleManagementService, User, Role, Status } from './rbac-management-service';

// Sample users for development and testing
export const SAMPLE_USERS: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: Status.Active,
    role: ['Admin']
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    status: Status.Active,
    role: ['Editor']
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    status: Status.Locked,
    role: ['Viewer']
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    status: Status.Signedon,
    role: ['Editor', 'Viewer']
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    status: Status.Active,
    role: ['Admin', 'Editor']
  }
];

// Sample roles for development and testing
export const SAMPLE_ROLES: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Administrator with full access',
    permissions: ['read', 'write', 'delete']
  },
  {
    id: '2',
    name: 'Editor',
    description: 'Can edit content',
    permissions: ['read', 'write']
  },
  {
    id: '3',
    name: 'Viewer',
    description: 'Read-only access',
    permissions: ['read']
  }
];

/**
 * Bridge interface for window.bridge
 * This interface defines the methods that must be implemented by the SWT Eclipse bridge
 */
export interface Bridge {
  // User management methods
  getAllUsers(successCallback: (users: User[]) => void, errorCallback: (error: any) => void): void;
  addUser(user: Omit<User, 'id'>, successCallback: (user: User) => void, errorCallback: (error: any) => void): void;
  removeUser(userId: string, successCallback: (success: boolean) => void, errorCallback: (error: any) => void): void;
  modifyUser(userId: string, userData: Partial<User>, successCallback: (user: User) => void, errorCallback: (error: any) => void): void;

  // Role management methods
  getAllRoles(successCallback: (roles: Role[]) => void, errorCallback: (error: any) => void): void;
  addRole(role: Omit<Role, 'id'>, successCallback: (role: Role) => void, errorCallback: (error: any) => void): void;
  removeRole(roleId: string, successCallback: (success: boolean) => void, errorCallback: (error: any) => void): void;
  modifyRole(roleId: string, roleData: Partial<Role>, successCallback: (role: Role) => void, errorCallback: (error: any) => void): void;
}

// Extend the Window interface to include our bridge
declare global {
  interface Window {
    bridge?: Bridge;
  }
}

/**
 * Implementation of UserManagementService and RoleManagementService that uses window.bridge
 * for communication with SWT Eclipse component via BrowserFunction
 */
export class BridgeService extends UserManagementService implements RoleManagementService {
  private users: User[] = [];
  private roles: Role[] = [];
  private useMock: boolean;

  constructor(useMock = true) {
    super();
    this.useMock = useMock;
    
    if (this.useMock) {
      this.users = [...SAMPLE_USERS];
      this.roles = [...SAMPLE_ROLES];
    }
  }

  // User Management Methods
  async getAllUsers(): Promise<User[]> {
    if (this.useMock) {
      return [...this.users];
    }

    if (!window.bridge) {
      throw new Error('Bridge not available');
    }

    return new Promise((resolve, reject) => {
      window.bridge!.getAllUsers(
        (users) => resolve(users),
        (error) => reject(error)
      );
    });
  }

  async addUser(user: Omit<User, 'id'>): Promise<User> {
    if (this.useMock) {
      // Ensure all required fields are provided with defaults if necessary
      const newUser: User = {
        id: (this.users.length + 1).toString(),
        name: user.name || 'New User',
        email: user.email || '',
        status: user.status || Status.Active,
        role: user.role || [],
        ...user // Spread user last to override any defaults with provided values
      };
      this.users.push(newUser);
      return newUser;
    }

    if (!window.bridge) {
      throw new Error('Bridge not available');
    }

    return new Promise((resolve, reject) => {
      window.bridge!.addUser(
        user,
        (newUser) => resolve(newUser),
        (error) => reject(error)
      );
    });
  }

  async removeUser(userId: string): Promise<boolean> {
    if (this.useMock) {
      const initialLength = this.users.length;
      this.users = this.users.filter((user) => user.id !== userId);
      return this.users.length < initialLength;
    }

    if (!window.bridge) {
      throw new Error('Bridge not available');
    }

    return new Promise((resolve, reject) => {
      window.bridge!.removeUser(
        userId,
        (success) => resolve(success),
        (error) => reject(error)
      );
    });
  }

  async modifyUser(userId: string, userData: Partial<User>): Promise<User> {
    if (this.useMock) {
      const userIndex = this.users.findIndex((u) => u.id === userId);
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      const updatedUser: User = {
        ...this.users[userIndex],
        ...userData,
        // Ensure required fields are not accidentally removed
        id: this.users[userIndex].id,
        name: userData.name ?? this.users[userIndex].name,
        email: userData.email ?? this.users[userIndex].email,
        status: userData.status ?? this.users[userIndex].status,
        role: userData.role ?? this.users[userIndex].role
      };
      this.users[userIndex] = updatedUser;
      return updatedUser;
    }

    if (!window.bridge) {
      throw new Error('Bridge not available');
    }

    return new Promise((resolve, reject) => {
      window.bridge!.modifyUser(
        userId,
        userData,
        (updatedUser) => resolve(updatedUser),
        (error) => reject(error)
      );
    });
  }

  // Role Management Methods
  async getAllRoles(): Promise<Role[]> {
    if (this.useMock) {
      return [...this.roles];
    }

    if (!window.bridge) {
      throw new Error('Bridge not available');
    }

    return new Promise((resolve, reject) => {
      window.bridge!.getAllRoles(
        (roles) => resolve(roles),
        (error) => reject(error)
      );
    });
  }

  async addRole(role: Omit<Role, 'id'>): Promise<Role> {
    if (this.useMock) {
      // Ensure all required fields are provided with defaults if necessary
      const newRole: Role = {
        id: (this.roles.length + 1).toString(),
        name: role.name || 'New Role',
        description: role.description || '',
        permissions: role.permissions || [],
        ...role // Spread role last to override any defaults with provided values
      };
      this.roles.push(newRole);
      return newRole;
    }

    if (!window.bridge) {
      throw new Error('Bridge not available');
    }

    return new Promise((resolve, reject) => {
      window.bridge!.addRole(
        role,
        (newRole) => resolve(newRole),
        (error) => reject(error)
      );
    });
  }

  async removeRole(roleId: string): Promise<boolean> {
    if (this.useMock) {
      const initialLength = this.roles.length;
      this.roles = this.roles.filter((role) => role.id !== roleId);
      return this.roles.length < initialLength;
    }

    if (!window.bridge) {
      throw new Error('Bridge not available');
    }

    return new Promise((resolve, reject) => {
      window.bridge!.removeRole(
        roleId,
        (success) => resolve(success),
        (error) => reject(error)
      );
    });
  }

  async modifyRole(roleId: string, roleData: Partial<Role>): Promise<Role> {
    if (this.useMock) {
      const roleIndex = this.roles.findIndex((r) => r.id === roleId);
      if (roleIndex === -1) {
        throw new Error('Role not found');
      }
      const updatedRole: Role = {
        ...this.roles[roleIndex],
        ...roleData,
        // Ensure required fields are not accidentally removed
        id: this.roles[roleIndex].id,
        name: roleData.name ?? this.roles[roleIndex].name,
        description: roleData.description ?? this.roles[roleIndex].description,
        permissions: roleData.permissions ?? this.roles[roleIndex].permissions
      };
      this.roles[roleIndex] = updatedRole;
      return updatedRole;
    }

    if (!window.bridge) {
      throw new Error('Bridge not available');
    }

    return new Promise((resolve, reject) => {
      window.bridge!.modifyRole(
        roleId,
        roleData,
        (updatedRole) => resolve(updatedRole),
        (error) => reject(error)
      );
    });
  }
}
