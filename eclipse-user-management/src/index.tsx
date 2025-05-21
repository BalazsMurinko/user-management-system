import { UserManagement } from '@local/rbac-admin-ui-react';
import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';

declare global {
  interface Window {
    bridge: {
      userManagement: {
        render: (containerId: string) => void;
        unmount: (containerId: string) => void;
      };
    };
  }
}

const renderUserManagement = (containerId: string) => {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }

  const root = ReactDOMClient.createRoot(container);
  root.render(
    <React.StrictMode>
      <UserManagement />
    </React.StrictMode>
  );

  // Store the root for later cleanup
  (container as any)._reactRoot = root;
};

const unmountUserManagement = (containerId: string) => {
  const container = document.getElementById(containerId);
  if (container && (container as any)._reactRoot) {
    // Unmount the React tree
    (container as any)._reactRoot.unmount();
    delete (container as any)._reactRoot;
  }
};

// Expose the API through window.bridge
if (typeof window !== 'undefined') {
  window.bridge = window.bridge || {};
  window.bridge.userManagement = {
    render: renderUserManagement,
    unmount: unmountUserManagement
  };
}

export { UserManagement };
export default {
  render: renderUserManagement,
  unmount: unmountUserManagement
};
