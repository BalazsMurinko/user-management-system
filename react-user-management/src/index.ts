// Export components
export * from './components';

// Export services
export { BridgeService } from './services/bridge-rbac-management-service';

// Export types
export type {
  User,
  Role,
  Status,
  RBACConfig,
  Permission
} from './types';

// Export the main components
export { default as RbacManagement } from './components/rbac-management';
export { UserManagementComponent } from './components/user-management/user-management-component';

// Export styles
import './styles';
export { rbacManagementStyles } from './styles';

// Re-export React for convenience
export { default as React } from 'react';
export { default as ReactDOM } from 'react-dom';
