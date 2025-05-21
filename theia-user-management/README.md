# RBAC Admin UI - Theia Extension

[![npm version](https://img.shields.io/npm/v/@logicals/rbac-admin-ui-theia.svg?style=flat-square)](https://www.npmjs.com/package/@logicals/rbac-admin-ui-theia)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Theia-verified](https://img.shields.io/badge/Theia-verified-green.svg)](https://theia-ide.org/)

A Theia extension that integrates the RBAC Admin UI components into the Theia IDE, providing seamless user and role management capabilities within your development environment.

## ✨ Features

- **Seamless Theia Integration** - Native look and feel with Theia's UI
- **Theming Support** - Automatic adaptation to Theia's light/dark themes
- **Keyboard Navigation** - Full keyboard accessibility
- **Command Integration** - Accessible via command palette and menus
- **Responsive Design** - Works in both main area and side panels
- **Real-time Updates** - Live updates for user and role changes

## 🚀 Getting Started

### Prerequisites

- Theia IDE `^1.43.0` or later
- Node.js `^18.0.0` or later
- Yarn `^1.22.0` or npm `^8.0.0`

### Installation

1. Install the package:
   ```bash
   yarn add @local/rbac-admin-ui-theia
   ```

2. Add the extension to your Theia application's `package.json`:
   ```json
   {
     "dependencies": {
       "@local/rbac-admin-ui-theia": "^1.0.0"
     }
   }
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/user-management-system.git
   cd user-management-system/theia-user-management
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Build the extension:
   ```bash
   yarn build
   ```

4. Run in development mode:
   ```bash
   yarn watch
   ```

## Usage

### Opening the User Management View

1. **Using the View Menu**:
   - Click on `View` in the menu bar
   - Select `User Management`

2. **Using the Command Palette**:
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
   - Type "User Management" and select the command to open the view

### Features

- **User List**: View all users in a sortable and searchable table
- **User Details**: Click on a user to view detailed information in the profile panel
- **Theming**: Automatically adapts to Theia's current theme
- **Responsive Design**: Works well in both full-size and side panel views

## Development

### Building the Extension

```bash
# From the package directory
cd packages/theia-user-management
yarn build
```

### Running in Development Mode

1. Link the package in your Theia application:
   ```bash
   cd packages/theia-user-management
   yarn link
   cd /path/to/your/theia/app
   yarn link "@user-management/theia"
   ```

2. Start Theia in watch mode:
   ```bash
   yarn watch
   ```

### Testing

Run the test suite:

```bash
yarn test
```

## API

### Commands

- `user-management:open` - Opens the User Management view
- `user-management:refresh` - Refreshes the user list

### Configuration

You can configure the extension by adding the following to your Theia application's `package.json`:

```json
"theia": {
  "frontend": {
    "config": {
      "userManagement": {
        "apiEndpoint": "/api/users",
        "pollingInterval": 30000
      }
    }
  }
}
```

## Troubleshooting

- **View not appearing**: Ensure the extension is properly installed and the Theia application has been restarted
- **Connection issues**: Verify the API endpoint is correctly configured and accessible
- **Theming issues**: Clear your browser cache if theme changes aren't applying correctly

## License

This project is licensed under the [MIT License](LICENSE).
