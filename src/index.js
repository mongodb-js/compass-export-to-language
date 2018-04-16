import ExportToLanguagePlugin from './plugin';
import ExportToLanguageStore from 'stores';

/**
 * A sample role for the component.
 */
const ROLE = {
  name: 'ExportToLanguage',
  component: ExportToLanguagePlugin
};

/**
 * Activate all the components in the Export To Language package.
 * @param {Object} appRegistry - The Hadron appRegisrty to activate this plugin with.
 **/
function activate(appRegistry) {
  // Register the ExportToLanguagePlugin as a role in Compass
  //
  // Available roles are:
  //   - Instance.Tab: { name: <String>, component: <React.Component>, order: <Number> }
  //   - Database.Tab: { name: <String>, component: <React.Component>, order: <Number> }
  //   - Collection.Tab: { name: <String>, component: <React.Component>, order: <Number> }
  //   - CollectionHUD.Item: { name <String>, component: <React.Component> }
  //   - Header.Item: { name: <String>, component: <React.Component>, alignment: <String> }

  appRegistry.registerRole('Instance.Tab', ROLE);
  appRegistry.registerStore('ExportToLanguage.Store', ExportToLanguageStore);
}

/**
 * Deactivate all the components in the Export To Language package.
 * @param {Object} appRegistry - The Hadron appRegisrty to deactivate this plugin with.
 **/
function deactivate(appRegistry) {
  appRegistry.deregisterRole('Instance.Tab', ROLE);
  appRegistry.deregisterStore('ExportToLanguage.Store');
}

export default ExportToLanguagePlugin;
export { activate, deactivate };
