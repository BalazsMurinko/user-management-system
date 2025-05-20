# User Management System

A comprehensive user management solution with React components and IDE integrations. This monorepo contains three main packages:

1. `@user-management/react` - Core React components and services for user management
2. `@user-management/theia` - Theia widget integration
3. `@user-management/eclipse` - Eclipse plugin integration

## Features

- User list with search and filtering
- User profile view with detailed information
- Role-based access control
- Theme support (light/dark mode)
- Responsive design for different screen sizes

## Project Structure

```
user-management-system/
├── packages/
│   ├── react-user-management/    # Core React components
│   ├── theia-user-management/    # Theia widget integration
│   └── eclipse-user-management/  # Eclipse plugin integration
├── lerna.json
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Yarn (v1.22 or later)
- Lerna (installed globally via `npm install -g lerna`)

### Installation

1. Install dependencies and bootstrap the monorepo:
   ```bash
   yarn install
   lerna bootstrap
   ```

2. Build all packages:
   ```bash
   lerna run build
   ```

## Usage

### 1. React Package (`@user-management/react`)

This is the core package containing the React components and services for user management.

#### Installation

```bash
yarn add @user-management/react
```

#### Basic Usage

```tsx
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
```

#### Available Components

- `UserManagement`: Main component for displaying and managing users
- `UserProfile`: Component for displaying user details
- `UserTable`: Table component for displaying users
- `UserManagementProvider`: Context provider for user management state

### 2. Theia Integration (`@user-management/theia`)

This package provides a Theia widget for the user management interface.

#### Features

- Integrated with Theia's widget system
- Supports Theia's theming
- Keyboard navigation support
- Context menu integration

#### Opening the View

1. Install the extension in Theia
2. Open the User Management view from the View menu
3. Or use the command palette (`Ctrl+Shift+P`) and search for "User Management"

### 3. Eclipse Integration (@user-management/eclipse)

This package provides an Eclipse plugin that exposes the user management interface through the `window.bridge` API.

In your Eclipse plugin, you can use it like this:

```javascript
// Load the user management script
const script = document.createElement('script');
script.src = 'path/to/user-management.js';
document.head.appendChild(script);

// When the script is loaded
script.onload = () => {
  // Render the user management interface in a container
  window.bridge.userManagement.render('user-management-container');
  
  // To unmount later:
  // window.bridge.userManagement.unmount('user-management-container');
};
```

## Development

### Prerequisites

- Node.js v16 or later
- Yarn 1.22 or later
- Lerna (installed globally via `npm install -g lerna`)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Bootstrap the monorepo:
   ```bash
   lerna bootstrap
   ```

### Building

Build all packages:
```bash
lerna run build
```

Build a specific package:
```bash
cd packages/<package-name>
yarn build
```

### Adding Dependencies

Add a dependency to a specific package:
```bash
lerna add <package> --scope=@user-management/<package-name>
```

Add a dev dependency:
```bash
lerna add <package> --dev --scope=@user-management/<package-name>
```

### Running Tests

Run tests for all packages:
```bash
lerna run test
```

Run tests for a specific package:
```bash
cd packages/<package-name>
yarn test
```

### Development Workflow

1. Make your changes in the appropriate package
2. Build the package(s) you've modified
3. Test your changes
4. Commit following [Conventional Commits](https://www.conventionalcommits.org/)
5. Create a pull request

### Versioning and Publishing

This project uses Lerna for version management and publishing:

1. Update versions and create tags:
   ```bash
   lerna version
   ```
2. Publish to npm:
   ```bash
   lerna publish from-package
   ```
lerna run test
```

### Building for Production

Build all packages for production:

```bash
lerna run build
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
