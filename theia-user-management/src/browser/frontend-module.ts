import { ContainerModule } from '@theia/core/shared/inversify';
import { WidgetFactory } from '@theia/core/lib/browser';
import { RbacManagementWidget } from './rbac-management-widget';
import { RbacManagementCommandContribution } from './rbac-management-command-contribution';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { UserManagementService } from '../common/user-management-service';
import { User, Role } from '@local/rbac-admin-ui-react';

// Mock implementation of UserManagementService
const mockUserManagementService: UserManagementService = {
    getUsers: async (): Promise<User[]> => [],
    createUser: async (user: Omit<User, 'id'>): Promise<User> => ({
        ...user,
        id: Date.now().toString(),
        roles: []
    } as User),
    updateUser: async (user: User): Promise<User> => user,
    deleteUser: async (userId: string): Promise<void> => {},
    getRoles: async (): Promise<Role[]> => [],
    createRole: async (role: Omit<Role, 'id'>): Promise<Role> => ({
        ...role,
        id: Date.now().toString(),
        permissions: []
    } as Role),
    updateRole: async (role: Role): Promise<Role> => role,
    deleteRole: async (roleId: string): Promise<void> => {}
};

export default new ContainerModule(bind => {
    // Bind the mock UserManagementService using the symbol
    bind(UserManagementService).toConstantValue(mockUserManagementService).whenTargetIsDefault();
    bind(UserManagementService).toService(UserManagementService);

    // Bind the RBAC management widget
    bind(RbacManagementWidget).toSelf().inSingletonScope();
    
    // Bind the widget factory
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: RbacManagementWidget.ID,
        createWidget: () => {
            const widget = ctx.container.get<RbacManagementWidget>(RbacManagementWidget);
            widget.id = RbacManagementWidget.ID;
            widget.title.label = RbacManagementWidget.LABEL;
            widget.title.caption = RbacManagementWidget.LABEL;
            widget.title.closable = true;
            return widget;
        }
    })).inSingletonScope();

    // Bind command contributions
    bind(RbacManagementCommandContribution).toSelf().inSingletonScope();
    bind(CommandContribution).toService(RbacManagementCommandContribution);
    bind(MenuContribution).toService(RbacManagementCommandContribution);
});
