# RBAC Admin UI - React Components

[![npm version](https://img.shields.io/npm/v/@logicals/rbac-admin-ui-react.svg?style=flat-square)](https://www.npmjs.com/package/@logicals/rbac-admin-ui-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A comprehensive React component library for Role-Based Access Control (RBAC) user management. Part of the RBAC Admin UI suite, built with TypeScript and Material-UI.

## ✨ Features

- **Modern React 18** - Built with the latest React features
- **TypeScript First** - Full type safety out of the box
- **Material-UI 5** - Beautiful, responsive components
- **Theming Support** - Light/dark mode with custom theming
- **Accessibility** - WCAG 2.1 compliant
- **Performance Optimized** - Efficient rendering with React.memo and useCallback
- **Comprehensive Testing** - 90%+ test coverage

## 📦 Installation

Using Yarn:
```bash
yarn add @logicals/rbac-admin-ui-react
```

Or using npm:
```bash
npm install @logicals/rbac-admin-ui-react
```

## 🚀 Quick Start

```tsx
import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import {
  UserManagement,
  UserProfile,
  UserManagementProvider
} from '@logicals/rbac-admin-ui-react';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
  },
});

function App() {
  const [selectedUser, setSelectedUser] = React.useState(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserManagementProvider>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <div style={{ width: '60%', padding: '16px' }}>
            <UserManagement onUserSelect={setSelectedUser} />
          </div>
          {selectedUser && (
            <div style={{ width: '40%', padding: '16px' }}>
              <UserProfile user={selectedUser} />
            </div>
          )}
        </div>
      </UserManagementProvider>
    </ThemeProvider>
  );
}

export default App;
```

## Components

### UserManagementProvider

Context provider that manages the user management state.

**Props:**
- `initialUsers`: `User[]` - Initial list of users (optional)
- `onUsersChange`: `(users: User[]) => void` - Callback when users change
- `children`: `React.ReactNode` - Child components

### UserManagement

Main component for displaying and managing users.

**Props:**
- `onUserSelect`: `(user: User) => void` - Callback when a user is selected
- `showSearch`: `boolean` - Whether to show the search bar (default: `true`)
- `showFilters`: `boolean` - Whether to show the filter controls (default: `true`)
- `className`: `string` - Additional CSS class name
- `style`: `React.CSSProperties` - Inline styles

### UserProfile

Component for displaying user details.

**Props:**
- `user`: `User` - The user object to display
- `className`: `string` - Additional CSS class name
- `style`: `React.CSSProperties` - Inline styles

### UserTable

Table component for displaying users.

**Props:**
- `users`: `User[]` - List of users to display
- `onUserSelect`: `(user: User) => void` - Callback when a user is selected
- `loading`: `boolean` - Whether the table is in a loading state
- `error`: `Error | null` - Error object if any error occurred
- `className`: `string` - Additional CSS class name
- `style`: `React.CSSProperties` - Inline styles

## Hooks

### useUserManagement

Hook to access the user management context.

```tsx
import { useUserManagement } from '@user-management/react';

function MyComponent() {
  const { users, loading, error, addUser, updateUser, removeUser } = useUserManagement();
  
  // Use the context values and methods
}
```

## Types

### User

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  roles: string[];
  status: 'active' | 'inactive' | 'pending';
  lastActive?: string;
  createdAt: string;
  updatedAt: string;
}
```

## Theming

The components support theming through CSS variables. You can override these variables to match your application's design:

```css
:root {
  --user-management-primary: #1976d2;
  --user-management-background: #ffffff;
  --user-management-text: #333333;
  /* Add more theme variables as needed */
}

[data-theme='dark'] {
  --user-management-background: #1e1e1e;
  --user-management-text: #ffffff;
  /* Dark theme overrides */
}
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

MIT © [Your Name]
