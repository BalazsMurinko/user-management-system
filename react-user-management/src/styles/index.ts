// CSS as a template literal with Theia theme variables
export const rbacManagementStyles = `
  :root {
    /* Base Colors */
    --theia-foreground: var(--theia-foreground, #333);
    --theia-background: var(--theia-editor-background, #ffffff);
    --theia-border: var(--theia-panel-border, #e0e0e0);
    
    /* Primary Colors */
    --theia-primary: var(--theia-button-background, #4CAF50);
    --theia-primary-hover: var(--theia-button-hoverBackground, #45a049);
    --theia-primary-text: var(--theia-button-foreground, #ffffff);
    
    /* Danger Colors */
    --theia-error: var(--theia-errorForeground, #f44336);
    --theia-error-background: var(--theia-inputValidation-errorBackground, #ffebee);
    
    /* Table Colors */
    --theia-table-header: var(--theia-panelTitle-inactiveForeground, #616161);
    --theia-table-row-hover: var(--theia-list-hoverBackground, #f5f5f5);
    --theia-table-row-alt: var(--theia-list-inactiveSelectionBackground, #f9f9f9);
    
    /* Form Colors */
    --theia-input-background: var(--theia-input-background, #ffffff);
    --theia-input-foreground: var(--theia-input-foreground, #333333);
    --theia-input-border: var(--theia-input-border, #ced4da);
    
    /* Modal Colors */
    --theia-modal-backdrop: rgba(0, 0, 0, 0.5);
    --theia-modal-background: var(--theia-editor-background, #ffffff);
  }

  /* Container */
  .user-management {
    font-family: var(--theia-ui-font-family, Arial, sans-serif);
    max-width: 100%;
    margin: 0 auto;
    padding: 20px;
    color: var(--theia-foreground);
    background-color: var(--theia-background);
  }

  /* Header */
  .user-management-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  /* Buttons */
  .user-management-button {
    background-color: var(--theia-primary);
    color: var(--theia-primary-text);
    border: none;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  .user-management-button:hover {
    background-color: var(--theia-primary-hover);
  }

  .user-management-button.delete {
    background-color: var(--theia-error);
  }
  
  .user-management-button.delete:hover {
    background-color: var(--theia-error-background);
    color: var(--theia-error);
  }

  /* Tables */
  .user-management-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    border: 1px solid var(--theia-border);
    border-radius: 4px;
    overflow: hidden;
  }

  .user-management-table th,
  .user-management-table td {
    border: 1px solid var(--theia-border);
    padding: 8px 12px;
    text-align: left;
  }

  .user-management-table th {
    background-color: var(--theia-table-header);
    color: var(--theia-foreground);
    font-weight: 500;
  }

  .user-management-table tr:nth-child(even) {
    background-color: var(--theia-table-row-alt);
  }

  .user-management-table tr:hover {
    background-color: var(--theia-table-row-hover);
  }

  /* Forms */
  .user-management-form {
    margin-top: 20px;
  }

  .user-management-form-group {
    margin-bottom: 15px;
  }

  .user-management-form-group label {
    display: block;
    margin-bottom: 5px;
    color: var(--theia-foreground);
    font-weight: 500;
  }

  .user-management-form-group input,
  .user-management-form-group select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--theia-input-border);
    border-radius: 4px;
    box-sizing: border-box;
    background-color: var(--theia-input-background);
    color: var(--theia-input-foreground);
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .user-management-form-group input:focus,
  .user-management-form-group select:focus {
    border-color: var(--theia-focusBorder);
    outline: none;
    box-shadow: 0 0 0 2px var(--theia-focusBorder);
  }

  /* Error and Success Messages */
  .user-management-error {
    color: var(--theia-errorForeground);
    background-color: var(--theia-inputValidation-errorBackground);
    padding: 10px 15px;
    margin: 10px 0;
    border-radius: 4px;
    border-left: 3px solid var(--theia-errorForeground);
    display: flex;
    align-items: center;
  }

  .user-management-success {
    color: var(--theia-editorInfo-foreground);
    background-color: var(--theia-inputValidation-infoBackground);
    padding: 10px 15px;
    margin: 10px 0;
    border-radius: 4px;
    border-left: 3px solid var(--theia-editorInfo-foreground);
    display: flex;
    align-items: center;
  }
  
  .user-management-error:before,
  .user-management-success:before {
    margin-right: 8px;
    font-family: 'codicon';
    font-size: 16px;
  }
  
  .user-management-error:before {
    content: '\ea87'; /* error icon */
    color: var(--theia-errorForeground);
  }
  
  .user-management-success:before {
    content: '\eab2'; /* check icon */
    color: var(--theia-editorInfo-foreground);
  }

  /* Tabs */
  .user-management-tabs {
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--theia-panel-border);
  }

  .user-management-tab {
    padding: 10px 20px;
    cursor: pointer;
    border: 1px solid transparent;
    border-bottom: none;
    background-color: transparent;
    color: var(--theia-tab-inactiveForeground, var(--theia-foreground));
    margin-right: 2px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    transition: all 0.2s;
    position: relative;
    top: 1px;
  }

  .user-management-tab:hover {
    background-color: var(--theia-tab-hoverBackground, rgba(0, 0, 0, 0.05));
  }

  .user-management-tab.active {
    background-color: var(--theia-tab-activeBackground, var(--theia-editor-background));
    color: var(--theia-tab-activeForeground, var(--theia-foreground));
    border-color: var(--theia-panel-border);
    border-bottom-color: var(--theia-tab-activeBackground, var(--theia-editor-background));
  }

  /* Modal */
  .user-management-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--theia-modal-backdrop);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(2px);
  }

  .user-management-modal-content {
    background-color: var(--theia-modal-background);
    padding: 20px;
    border-radius: 6px;
    width: 80%;
    max-width: 500px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border: 1px solid var(--theia-panel-border);
  }
`;

// For backward compatibility
export default rbacManagementStyles;
