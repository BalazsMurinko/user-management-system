import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry } from '@theia/core';
import { CommonMenus } from '@theia/core/lib/browser';
import { UserManagementWidget } from './user-management-widget';

export namespace UserManagementCommands {
  export const OPEN: Command = {
    id: 'user-management:open',
    label: 'Open User Management',
    category: 'User Management',
  };
}

@injectable()
export class UserManagementCommandContribution implements CommandContribution, MenuContribution {
  protected userManagementWidget: UserManagementWidget;

  constructor(
    @inject(UserManagementWidget) userManagementWidget: UserManagementWidget
  ) {
    this.userManagementWidget = userManagementWidget;
  }

  registerCommands(commands: CommandRegistry): void {
    commands.registerCommand(UserManagementCommands.OPEN, {
      execute: () => this.userManagementWidget.activate(),
      isEnabled: () => true,
      isVisible: () => true,
    });
  }

  registerMenus(menus: MenuModelRegistry): void {
    menus.registerMenuAction(CommonMenus.VIEW_VIEWS, {
      commandId: UserManagementCommands.OPEN.id,
      label: UserManagementCommands.OPEN.label,
      order: 'a10'
    });
  }
}
