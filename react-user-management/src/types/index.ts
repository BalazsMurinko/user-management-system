// User and Role types
export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  status: 'ACTIVE' | 'INACTIVE' | 'LOCKED';
  lastLogin?: string;
  created?: string;
  modified?: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  created?: string;
  modified?: string;
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
}

export interface Status {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface RBACConfig {
  passwordPolicy?: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
  };
  userLockout?: {
    enabled: boolean;
    maxAttempts?: number;
    durationMinutes?: number;
  };
}
