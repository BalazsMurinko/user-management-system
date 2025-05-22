import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

// Import the UserManagement component with proper typing
const { UserManagement } = require('@local/rbac-admin-ui-react');

// Define the bridge interface
interface UserManagementBridge {
  render: (containerId: string) => void;
  unmount: (containerId: string) => void;
}

// Define the User type from the RBAC admin UI
interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  status: 'active' | 'inactive';
}

declare global {
  interface Window {
    bridge?: {
      userManagement: UserManagementBridge;
      [key: string]: any;
    };
  }
}

/**
 * Renders the UserManagement component into the specified container
 * @param containerId - The ID of the DOM element to render into
 */
const renderUserManagement = (containerId: string): void => {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`[RBAC Admin UI] Container with id "${containerId}" not found`);
    return;
  }

  try {
    // Create a root for the container if it doesn't exist
    if (!(container as any)._reactRoot) {
      const root = ReactDOM.createRoot(container);
      (container as any)._reactRoot = root;
      
      root.render(
        <React.StrictMode>
          <UserManagement onUserSelect={(user: User) => console.log('User selected:', user)} />
        </React.StrictMode>
      );
    }
  } catch (error) {
    console.error('[RBAC Admin UI] Failed to render:', error);
  }
};

/**
 * Unmounts the UserManagement component from the specified container
 * @param containerId - The ID of the DOM element to unmount from
 */
const unmountUserManagement = (containerId: string): void => {
  const container = document.getElementById(containerId);
  if (container && (container as any)._reactRoot) {
    try {
      // Unmount the React tree
      (container as any)._reactRoot.unmount();
      delete (container as any)._reactRoot;
    } catch (error) {
      console.error('[RBAC Admin UI] Failed to unmount:', error);
    }
  }
};

// Expose the API through window.bridge when running in a browser environment
if (typeof window !== 'undefined') {
  // Initialize window.bridge if it doesn't exist
  if (!window.bridge) {
    (window as any).bridge = {};
  }
  
  // Safely assign userManagement to window.bridge
  const bridge = window.bridge as any;
  bridge.userManagement = {
    render: renderUserManagement,
    unmount: unmountUserManagement
  };
}

// Export the public API
export { UserManagement, renderUserManagement, unmountUserManagement };

export default {
  render: renderUserManagement,
  unmount: unmountUserManagement
};
