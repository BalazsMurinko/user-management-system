import { ContainerModule } from '@theia/core/shared/inversify';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { RbacManagementContribution } from './rbac-management-contribution';

export default new ContainerModule((bind, unbind, isBound) => {
    // Bind the RBAC management contribution directly as a FrontendApplicationContribution
    bind(FrontendApplicationContribution).to(RbacManagementContribution).inSingletonScope();
    
    // Bind the class itself as well
    bind(RbacManagementContribution).toSelf().inSingletonScope();
    
    // Import the frontend module that contains our widget bindings
    if (!isBound('frontend-module-loaded')) {
        bind('frontend-module-loaded').toConstantValue(true);
        require('./frontend-module');
    }
});
