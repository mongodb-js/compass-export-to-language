import { combineReducers } from 'redux';
import appRegistry, {
  INITIAL_STATE as APP_REGISTRY_STATE
} from 'mongodb-redux-common/app-registry';
import builders, {
  INITIAL_STATE as BUILDERS_INITIAL_STATE
} from 'modules/builders';
import copySuccess, {
  INITIAL_STATE as COPY_SUCCESS_INITIAL_STATE
} from 'modules/copy-success';
import copyToClipboardFnChanged, {
  INITIAL_STATE as CTCFC_INITIAL_STATE
} from 'modules/copy-to-clipboard';
import driver, {
  INITIAL_STATE as DRIVER_INITIAL_STATE
} from 'modules/driver';
import imports, {
  INITIAL_STATE as IMPORTS_INITIAL_STATE,
  importsChanged
} from 'modules/imports';
import inputQuery, {
  INITIAL_STATE as INPUT_QUERY_INITIAL_STATE
} from 'modules/input-query';
import modalOpen, {
  INITIAL_STATE as MODAL_INITIAL_STATE
} from 'modules/modal-open';
import mode, {
  INITIAL_STATE as MODE_INITIAL_STATE
} from 'modules/mode';
import outputLang, {
  INITIAL_STATE as OUTPUT_LANG_INITIAL_STATE
} from 'modules/output-lang';
import queryError, {
  INITIAL_STATE as QUERY_ERROR_INITIAL_STATE,
  queryErrorChanged
} from 'modules/query-error';
import returnQuery, {
  INITIAL_STATE as RETURN_QUERY_INITIAL_STATE,
  returnQueryChanged
} from 'modules/return-query';
import showImports, {
  INITIAL_STATE as SHOW_IMPORTS_INITIAL_STATE
} from 'modules/show-imports';
import uri, {
  INITIAL_STATE as URI_INITIAL_STATE
} from 'modules/uri';
import {
  globalAppRegistryEmit
} from 'mongodb-redux-common/app-registry';
import compiler from 'bson-transpilers';


export const INITIAL_STATE = {
  builders: BUILDERS_INITIAL_STATE,
  copySuccess: COPY_SUCCESS_INITIAL_STATE,
  copyToClipboard: CTCFC_INITIAL_STATE,
  driver: DRIVER_INITIAL_STATE,
  imports: IMPORTS_INITIAL_STATE,
  inputQuery: INPUT_QUERY_INITIAL_STATE,
  modalOpen: MODAL_INITIAL_STATE,
  mode: MODE_INITIAL_STATE,
  outputLang: OUTPUT_LANG_INITIAL_STATE,
  queryError: QUERY_ERROR_INITIAL_STATE,
  returnQuery: RETURN_QUERY_INITIAL_STATE,
  showImports: SHOW_IMPORTS_INITIAL_STATE,
  uri: URI_INITIAL_STATE,
  appRegistry: APP_REGISTRY_STATE
};

/**
 * The reducer.
 */
const reducer = combineReducers({
  builders,
  copySuccess,
  copyToClipboardFnChanged,
  driver,
  imports,
  inputQuery,
  modalOpen,
  mode,
  outputLang,
  queryError,
  returnQuery,
  showImports,
  uri,
  appRegistry
});

/**
 * The root reducer.
 *
 * @param {Object} state - The state.
 * @param {Object} action - The action.
 *
 * @returns {Object} The new state.
 */
const rootReducer = (state, action) => {
  return reducer(state, action);
};


export const runQuery = (outputLang, input) => {
  return (dispatch, getState) => {
    const state = getState();
    try {
      let output;
      input.uri = state.uri;
      if (state.driver) {
        if (state.mode === 'Query') {
          output = compiler.shell[outputLang].compileQuery(
            input, state.builders
          );
        } else {
          output = compiler.shell[outputLang].compileAggregation(
            input, state.builders
          );
        }
      } else {
        const filter = state.mode === 'Query' ? input.filter : input.aggregation;
        output = compiler.shell[outputLang].compile(filter, state.builders);
      }
      dispatch(importsChanged(compiler.shell[outputLang].getImports()));
      dispatch(returnQueryChanged(output));
      dispatch(queryErrorChanged(null));
      dispatch(
        globalAppRegistryEmit(
          'compass:export-to-language:run',
          { language: outputLang, showImports: state.showImports, type: state.mode }
        )
      );
      // return state;
    } catch (e) {
      return dispatch(queryErrorChanged(e.message));
    }
  };
};

export default rootReducer;
