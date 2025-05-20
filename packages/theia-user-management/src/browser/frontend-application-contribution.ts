import { Container, ContainerModule } from '@theia/core/shared/inversify';
import { WidgetFactory } from '@theia/core/lib/browser';
import { UserManagementWidget } from './user-management-widget';
import { CommandContribution, MenuContribution } from '@theia/core';
import { UserManagementCommandContribution } from './user-management-command-contribution';

export default new ContainerModule(bind => {
  // Bind the widget
  bind(WidgetFactory).toDynamicValue(ctx => ({
    id: UserManagementWidget.ID,
    createWidget: () => {
      const child = new Container({ defaultScope: 'Singleton' });
      child.parent = ctx.container;
      return child.get(UserManagementWidget);
    }
  })).inSingletonScope();
  
  bind(UserManagementWidget).toSelf().inSingletonScope();
  
  // Bind command contributions
  bind(CommandContribution).to(UserManagementCommandContribution).inSingletonScope();
  bind(MenuContribution).to(UserManagementCommandContribution).inSingletonScope();
});
