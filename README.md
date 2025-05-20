# 🚀 User Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A modern, extensible user management solution with React components and IDE integrations. Built with TypeScript and designed for enterprise-grade applications.

## ✨ Features

- **User Management** - Comprehensive CRUD operations for user accounts
- **Role-Based Access Control** - Fine-grained permission system
- **Theme Support** - Built-in light/dark mode with theming capabilities
- **Responsive Design** - Works on all device sizes
- **IDE Integration** - Seamless integration with Theia and Eclipse
- **TypeScript Support** - Full type definitions for better development experience
- **Modular Architecture** - Easy to extend and customize

## 📦 Packages

This monorepo contains three main packages:

| Package | Version | Description |
|---------|---------|-------------|
| `@user-management/react` | [![npm](https://img.shields.io/npm/v/@user-management/react)](https://www.npmjs.com/package/@user-management/react) | Core React components and services |
| `@user-management/theia` | [![npm](https://img.shields.io/npm/v/@user-management/theia)](https://www.npmjs.com/package/@user-management/theia) | Theia widget integration |
| `@user-management/eclipse` | [![npm](https://img.shields.io/npm/v/@user-management/eclipse)](https://www.npmjs.com/package/@user-management/eclipse) | Eclipse plugin integration |



## 🏗 Project Structure

```
user-management-system/
├── react-user-management/      # Core React components and services
│   ├── src/                    # Source code
│   ├── public/                 # Static assets
│   └── __tests__/              # Unit tests
│
├── theia-user-management/     # Theia widget integration
│   └── src/                    # Theia extension code
│
├── eclipse-user-management/   # Eclipse plugin integration
│   └── src/                    # Plugin source code
│
├── .github/                  # GitHub workflows and issue templates
├── .vscode/                   # VS Code settings
└── package.json               # Root package configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js `^16.14.0` or later
- Yarn `^1.22.0` or npm `^8.0.0`
- Git

### Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/user-management-system.git
   cd user-management-system
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Install dependencies and build all packages:
   ```bash
   yarn install
   yarn build
   ```

4. Start the development server:
   ```bash
   yarn start
   ```
   
   Or start the Theia integration:
   ```bash
   yarn start:theia
   ```

5. Start the Eclipse integration:
   ```bash
   yarn start:eclipse
   ```


## 📚 Usage

### 1. React Package (`@user-management/react`)

This is the core package containing the React components and services for user management.

#### Installation

Using Yarn:
```bash
yarn add @user-management/react
```

Or using npm:
```bash
npm install @user-management/react
```

#### Peer Dependencies

This package requires the following peer dependencies:
- React `^17.0.0 || ^18.0.0`
- React DOM `^17.0.0 || ^18.0.0`
- TypeScript `^4.0.0`
- Styled Components `^5.0.0`

Make sure to install these in your project if they're not already present.

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

## 🛠 Development

### Prerequisites

- Node.js `^16.14.0`
- Yarn `^1.22.0` or npm `^8.0.0`
- Git

### Development Commands

| Command | Description |
|---------|-------------|
| `yarn install` | Install all dependencies |
| `yarn build` | Build all packages |
| `yarn build:react` | Build only the React package |
| `yarn build:theia` | Build only the Theia package |
| `yarn build:eclipse` | Build only the Eclipse package |
| `yarn start` | Start the React development server |
| `yarn start:theia` | Start the Theia integration |
| `yarn test` | Run tests for all packages |
| `yarn test:watch` | Run tests in watch mode |
| `yarn test:coverage` | Generate test coverage report |
| `yarn lint` | Lint all packages |
| `yarn lint:fix` | Fix linting issues |
| `yarn format` | Format code using Prettier |
| `yarn clean` | Clean build artifacts |

### Development Workflow

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feat/feature-name
   # or
   git checkout -b fix/bug-name
   ```

2. Make your changes and commit them following the [Conventional Commits](https://www.conventionalcommits.org/) specification:
   ```bash
   git commit -m "feat(scope): add new feature"
   ```

3. Push your changes and create a pull request:
   ```bash
   git push origin HEAD
   ```

### Testing

Run all tests:
```bash
lerna run test
```

Run tests in watch mode for a specific package:
```bash
cd packages/<package-name>
yarn test:watch
```

Run tests with coverage:
```bash
lerna run test:coverage
```

### Linting and Formatting

Lint all packages:
```bash
lerna run lint
```

Format all code:
```bash
lerna run format
```

### Versioning and Publishing

1. Update the version in `package.json`
2. Create a git tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
3. Publish to npm:
   ```bash
   npm publish
   ```

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

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ by the User Management Team
- Thanks to all contributors who have helped improve this project
- Inspired by modern user management solutions

## 📬 Contact

For questions or feedback, please open an issue or contact us at [email@example.com](mailto:email@example.com).

---

<div align="center">
  Made with ❤️ by Your Team Name
</div>
