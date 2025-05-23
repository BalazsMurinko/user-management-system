import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry } from '@theia/core';
import { CommonMenus } from '@theia/core/lib/browser';
import { RbacManagementWidget } from './rbac-management-widget';

export namespace RbacManagementCommands {
    export const OPEN: Command = {
        id: 'rbac-management:open',
        label: 'Open RBAC Management',
        category: 'RBAC Management',
    };
}

@injectable()
export class RbacManagementCommandContribution implements CommandContribution, MenuContribution {
    constructor(
        @inject(RbacManagementWidget) protected readonly rbacManagementWidget: RbacManagementWidget
    ) {}

    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(RbacManagementCommands.OPEN, {
            execute: () => this.rbacManagementWidget.activate(),
            isEnabled: () => true,
            isVisible: () => true,
        });
    }

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.VIEW_VIEWS, {
            commandId: RbacManagementCommands.OPEN.id,
            label: RbacManagementCommands.OPEN.label,
            order: 'a10'
        });
    }
}
