import * as React from 'react';
import { injectable, inject } from '@theia/core/shared/inversify';
import { ReactWidget } from '@theia/core/lib/browser';
import { MessageService } from '@theia/core';
import { UserManagementService } from '../common/user-management-service';
import { User, Role } from '@local/rbac-admin-ui-react';

// Import the styles directly as a string to avoid webpack processing
const rbacManagementStyles = require('@local/rbac-admin-ui-react/lib/styles/index.js').rbacManagementStyles;

// Inject styles when the module is loaded
const styleElement = document.createElement('style');
styleElement.textContent = rbacManagementStyles;
if (!document.head.contains(styleElement)) {
    document.head.appendChild(styleElement);
}

// Define the props interface for the RbacManagement component
interface RbacManagementProps {
    // User management methods
    getUsers: () => Promise<User[]>;
    getRoles: () => Promise<Role[]>;
    createUser: (user: Omit<User, 'id'>) => Promise<User>;
    updateUser: (user: User) => Promise<User>;
    deleteUser: (userId: string) => Promise<void>;
    createRole: (role: Omit<Role, 'id'>) => Promise<Role>;
    updateRole: (role: Role) => Promise<Role>;
    deleteRole: (roleId: string) => Promise<void>;
    
    // UI callbacks
    onError: (error: Error) => void;
    onSuccess: (message: string) => void;
}

// Import the RBAC management component from the package
const RbacManagement = React.lazy(async () => {
    try {
        const module = await import('@local/rbac-admin-ui-react');
        return { default: module.RbacManagement as React.ComponentType<RbacManagementProps> };
    } catch (error) {
        console.error('Failed to load RBAC management component:', error);
        throw error; // Re-throw to handle in the ErrorBoundary
    }
});

@injectable()
export class RbacManagementWidget extends ReactWidget {
    static readonly ID = 'rbac-management:widget';
    static readonly LABEL = 'RBAC Management';

    constructor(
        @inject(UserManagementService) protected readonly userManagementService: UserManagementService,
        @inject(MessageService) protected readonly messageService: MessageService
    ) {
        super();
        this.id = RbacManagementWidget.ID;
        this.title.label = RbacManagementWidget.LABEL;
        this.title.caption = RbacManagementWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-users';
        this.addClass('rbac-management-widget');
    }

    protected override render(): React.ReactNode {
        const handleError = (error: Error) => {
            this.messageService.error(error.message || 'An error occurred');
            console.error('RBAC Management Error:', error);
        };

        const handleSuccess = (message: string) => {
            this.messageService.info(message);
        };

        return (
            <div className='rbac-management-container'>
                <React.Suspense fallback={<div>Loading RBAC Management...</div>}>
                    <RbacManagement 
                        getUsers={() => this.userManagementService.getUsers()}
                        getRoles={() => this.userManagementService.getRoles()}
                        createUser={(user) => this.userManagementService.createUser(user)}
                        updateUser={(user) => this.userManagementService.updateUser(user)}
                        deleteUser={(userId) => this.userManagementService.deleteUser(userId)}
                        createRole={(role) => this.userManagementService.createRole(role)}
                        updateRole={(role) => this.userManagementService.updateRole(role)}
                        deleteRole={(roleId) => this.userManagementService.deleteRole(roleId)}
                        onError={handleError}
                        onSuccess={handleSuccess}
                    />
                </React.Suspense>
            </div>
        );
    }

    protected override onActivateRequest(msg: any): void {
        super.onActivateRequest(msg);
        const node = this.node;
        if (node) {
            node.focus();
        }
    }

    protected override onUpdateRequest(msg: any): void {
        super.onUpdateRequest(msg);
        // Update the widget content if needed
    }
}
