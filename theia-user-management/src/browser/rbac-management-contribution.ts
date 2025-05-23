import { injectable, inject, postConstruct } from '@theia/core/shared/inversify';
import { FrontendApplicationContribution, WidgetManager } from '@theia/core/lib/browser';
import { RbacManagementWidget } from './rbac-management-widget';

@injectable()
export class RbacManagementContribution implements FrontendApplicationContribution {
    
    @inject(WidgetManager)
    protected readonly widgetManager: WidgetManager;

    protected widget: RbacManagementWidget | undefined;

    @postConstruct()
    protected async init(): Promise<void> {
        console.log('RBAC Management Contribution initialized');
    }

    async initialize(): Promise<void> {
        // No need to call init() here as it's already called by postConstruct
    }

    async onStart(): Promise<void> {
        try {
            // Get or create the widget
            this.widget = await this.widgetManager.getOrCreateWidget<RbacManagementWidget>('rbac-management:widget');
            
            // If widget is not already attached to the main area
            if (this.widget && !this.widget.isAttached) {
                // Get the main area and activate it
                const mainArea = this.widgetManager.getWidgets('main').find(w => w.id === 'main');
                if (mainArea) {
                    await mainArea.activate();
                }
                
                // Create the widget in the main area
                await this.widgetManager.getOrCreateWidget('main-area-widget', { widget: this.widget });
            }
            
            // Activate the widget
            if (this.widget) {
                await this.widget.activate();
            }
        } catch (error) {
            console.error('Failed to initialize RBAC Management Widget:', error);
            throw error; // Re-throw to allow error handling by the framework
        }
    }
}
