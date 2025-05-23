import { ContainerModule } from '@theia/core/shared/inversify';
import { ConnectionHandler, RpcConnectionHandler } from '@theia/core/lib/common';
import { UserManagementService, UserManagementServicePath } from '../common/user-management-service';
import { UserManagementServiceImpl } from './user-management-service-impl';

export default new ContainerModule(bind => {
    bind(UserManagementService).to(UserManagementServiceImpl).inSingletonScope();
    
    bind(ConnectionHandler).toDynamicValue(ctx =>
        new RpcConnectionHandler(UserManagementServicePath, () =>
            ctx.container.get<UserManagementService>(UserManagementService)
        )
    ).inSingletonScope();
});
