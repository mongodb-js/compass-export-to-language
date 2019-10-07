import { inputQueryChanged } from 'modules/input-query';
import { modalOpenChanged } from 'modules/modal-open';
import { modeChanged } from 'modules/mode';
import { uriChanged } from 'modules/uri';
import { runQuery } from 'modules';
import { copyToClipboardFnChanged } from 'modules/copy-to-clipboard';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  localAppRegistryActivated,
  globalAppRegistryActivated
} from 'mongodb-redux-common/app-registry';
import reducer from 'modules';

/**
 * Set the custom copy to clipboard function.
 *
 * @param {Store} store - The store.
 * @param {Function} fn - The function.
 */
export const setCopyToClipboardFn = (store, fn) => {
  store.dispatch(copyToClipboardFnChanged(fn));
};

/**
 * Configure the store for use.
 *
 * @param {Object} options - The options.
 *
 * @returns {Store} The store.
 */
const configureStore = (options = {}) => {
  const store = createStore(reducer, applyMiddleware(thunk));

  if (options.localAppRegistry) {
    const localAppRegistry = options.localAppRegistry;
    store.dispatch(localAppRegistryActivated(localAppRegistry));
    localAppRegistry.on('open-aggregation-export-to-language', (aggregation) => {
      store.dispatch(modeChanged('Pipeline'));
      store.dispatch(modalOpenChanged(true));
      store.dispatch(runQuery('python', { aggregation: aggregation }));
      store.dispatch(inputQueryChanged({ aggregation: aggregation }));
    });

    localAppRegistry.on('open-query-export-to-language', (query) => {
      store.dispatch(modeChanged('Query'));
      store.dispatch(modalOpenChanged(true));
      store.dispatch(runQuery('python', query));
      store.dispatch(inputQueryChanged(query));
    });

    localAppRegistry.on('data-service-initialized', (dataService) => {
      store.dispatch(uriChanged(dataService.client.model.driverUrl));
    });

  }

  if (options.globalAppRegistry) {
    const globalAppRegistry = options.globalAppRegistry;
    store.dispatch(globalAppRegistryActivated(globalAppRegistry));
  }

  if (options.copyToClipboardFn) {
    store.dispatch(copyToClipboardFnChanged(options.copyToClipboardFn));
  }

  return store;
};

export default configureStore;
