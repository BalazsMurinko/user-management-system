# React User Management Components

A collection of React components for managing users in your application.

## Features

- User list with sorting and filtering
- Detailed user profile view
- Role-based access control
- Theme support (light/dark mode)
- Fully typed with TypeScript
- Responsive design

## Installation

```bash
yarn add @user-management/react
```

## Quick Start

```tsx
import React from 'react';
import {
  UserManagement,
  UserProfile,
  UserManagementProvider
} from '@user-management/react';

function App() {
  const [selectedUser, setSelectedUser] = React.useState(null);

  return (
    <UserManagementProvider>
      <div style={{ display: 'flex', height: '100vh' }}>
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
