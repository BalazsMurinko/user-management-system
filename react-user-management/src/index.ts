// Export components
export * from './components';

// Export services
export { BridgeService } from './services/bridge-rbac-management-service';

export type {
  User,
  Role,
  Status,
  RBACConfig,
  Permission
} from './types';

// Export the main component
export { UserManagementComponent } from './components/user-management/user-management-component';

// Re-export React for convenience
export { default as React } from 'react';
export { default as ReactDOM } from 'react-dom';
