import * as React from 'react';
import { injectable, inject } from '@theia/core/shared/inversify';
import { ReactWidget, Message } from '@theia/core/lib/browser';
import { MessageService } from '@theia/core';
import { Box, Paper, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { UserManagement, UserProfile, User, UserManagementProvider } from '@local/rbac-admin-ui-react';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 8,
        },
      },
    },
  },
});

@injectable()
export class UserManagementWidget extends ReactWidget {
  static readonly ID = 'user-management:widget';
  static readonly LABEL = 'User Management';
  private selectedUser: User | null = null;

  protected messageService: MessageService;

  constructor(
    @inject(MessageService) messageService: MessageService
  ) {
    super();
    this.messageService = messageService;
    this.id = UserManagementWidget.ID;
    this.title.label = UserManagementWidget.LABEL;
    this.title.caption = UserManagementWidget.LABEL;
    this.title.closable = true;
    this.title.iconClass = 'fa fa-users';
    this.update();
  }

  async initialize(): Promise<void> {
    // Initialization logic if needed
  }

  onStart(): void {
    // Start logic if needed
  }

  onStop(): void {
    // Cleanup logic if needed
  }

  protected createIframe(): void {
    // This method is called when the widget is created
    // You can add any iframe initialization logic here if needed
  }

  private handleUserSelect = (user: User) => {
    this.selectedUser = user;
    this.update();
  };

  protected render(): React.ReactNode {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ height: '100%', display: 'flex', p: 2, gap: 2 }}>
          <Paper elevation={2} sx={{ flex: 2, p: 2, overflow: 'auto' }}>
            <UserManagementProvider>
              <UserManagement onUserSelect={this.handleUserSelect} />
            </UserManagementProvider>
          </Paper>
          {this.selectedUser && (
            <Paper elevation={2} sx={{ flex: 1, p: 2, minWidth: 300, overflow: 'auto' }}>
              <Box sx={{ p: 2 }}>
                <UserProfile user={this.selectedUser} />
              </Box>
            </Paper>
          )}
        </Box>
      </ThemeProvider>
    );
  }

  protected override onActivateRequest(msg: Message): void {
    super.onActivateRequest(msg);
    const node = this.node;
    if (node) {
      const element = node.getElementsByTagName('input')[0];
      if (element) {
        element.focus();
      }
    }
  }
}
