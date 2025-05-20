# Theia User Management Extension

This package provides a Theia extension for the User Management System, integrating the React-based user management components into the Theia IDE.

## Features

- Integrated user management view in Theia's main area
- Support for Theia's theming (light/dark mode)
- Keyboard navigation support
- Context menu integration
- Command palette integration

## Installation

### Prerequisites

- Theia IDE (latest version recommended)
- Node.js v16 or later
- Yarn 1.22 or later

### Installation Steps

1. Install the package:
   ```bash
   yarn add @user-management/theia
   ```

2. Add the extension to your Theia application's `package.json`:
   ```json
   {
     "dependencies": {
       "@user-management/theia": "^1.0.0"
     }
   }
   ```

3. Install dependencies:
   ```bash
   yarn install
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
