/*
 * Copyright (C) logi.cals GmbH. All rights reserved.
 */

/**
 * User interface representing a user in the system
 */
export interface User {
  id: string;
  name: string;
  email: string;
  status: Status;
  role: string[];
  [key: string]: any; // Allow for additional properties
}

/**
 * Status enum representing the status of a user
 */
export enum Status {
  Active = 'Active',
  Locked = 'Locked',
  Signedon = 'Signed on'
}

/**
 * Role interface representing a role in the system
 */
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  [key: string]: any; // Allow for additional properties
}

/**
 * Configuration options for the RBAC management component
 */
export interface RBACConfig {
  branding?: {
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;
  };
  language?: string;
  features?: {
    userManagement?: boolean;
    roleManagement?: boolean;
  };
}

/**
 * UserManagementService interface
 * This service provides methods for user management operations
 */
export abstract class UserManagementService {
  /**
   * Get all users
   * @returns {Promise<User[]>} Promise resolving to an array of users
   */
  abstract getAllUsers(): Promise<User[]>;

  /**
   * Add a new user
   * @param {User} user - The user object to add
   * @returns {Promise<User>} Promise resolving to the added user
   */
  abstract addUser(user: Omit<User, 'id'>): Promise<User>;

  /**
   * Remove a user
   * @param {string} userId - The ID of the user to remove
   * @returns {Promise<boolean>} Promise resolving to true if successful
   */
  abstract removeUser(userId: string): Promise<boolean>;

  /**
   * Modify a user
   * @param {string} userId - The ID of the user to modify
   * @param {Partial<User>} userData - The updated user data
   * @returns {Promise<User>} Promise resolving to the modified user
   */
  abstract modifyUser(userId: string, userData: Partial<User>): Promise<User>;
}

/**
 * RoleManagementService interface
 * This service provides methods for role management operations
 */
export abstract class RoleManagementService {
  /**
   * Get all roles
   * @returns {Promise<Role[]>} Promise resolving to an array of roles
   */
  abstract getAllRoles(): Promise<Role[]>;

  /**
   * Add a new role
   * @param {Role} role - The role object to add
   * @returns {Promise<Role>} Promise resolving to the added role
   */
  abstract addRole(role: Omit<Role, 'id'>): Promise<Role>;

  /**
   * Remove a role
   * @param {string} roleId - The ID of the role to remove
   * @returns {Promise<boolean>} Promise resolving to true if successful
   */
  abstract removeRole(roleId: string): Promise<boolean>;

  /**
   * Modify a role
   * @param {string} roleId - The ID of the role to modify
   * @param {Partial<Role>} roleData - The updated role data
   * @returns {Promise<Role>} Promise resolving to the modified role
   */
  abstract modifyRole(roleId: string, roleData: Partial<Role>): Promise<Role>;
}
