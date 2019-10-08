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
import copyToClipboard, {
  INITIAL_STATE as CTCFC_INITIAL_STATE
} from 'modules/copy-to-clipboard';
import driver, {
  INITIAL_STATE as DRIVER_INITIAL_STATE
} from 'modules/driver';
import imports, {
  INITIAL_STATE as IMPORTS_INITIAL_STATE,
  importsChanged
} from 'modules/imports';
import inputExpression, {
  INITIAL_STATE as INPUT_EXPRESSION_INITIAL_STATE
} from 'modules/input-expression';
import modalOpen, {
  INITIAL_STATE as MODAL_INITIAL_STATE
} from 'modules/modal-open';
import mode, {
  INITIAL_STATE as MODE_INITIAL_STATE
} from 'modules/mode';
import outputLang, {
  INITIAL_STATE as OUTPUT_LANG_INITIAL_STATE
} from 'modules/output-lang';
import error, {
  INITIAL_STATE as ERROR_INITIAL_STATE,
  errorChanged
} from 'modules/error';
import transpiledExpression, {
  INITIAL_STATE as TRANSPILED_EXPRESSION_INITIAL_STATE,
  transpiledExpressionChanged
} from 'modules/transpiled-expression';
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
  inputExpression: INPUT_EXPRESSION_INITIAL_STATE,
  modalOpen: MODAL_INITIAL_STATE,
  mode: MODE_INITIAL_STATE,
  outputLang: OUTPUT_LANG_INITIAL_STATE,
  error: ERROR_INITIAL_STATE,
  transpiledExpression: TRANSPILED_EXPRESSION_INITIAL_STATE,
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
  copyToClipboard,
  driver,
  imports,
  inputExpression,
  modalOpen,
  mode,
  outputLang,
  error,
  transpiledExpression,
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


export const runTranspiler = (outputLang, input) => {
  return (dispatch, getState) => {
    const state = getState();
    try {
      let output;
      if (state.driver) {
        const toCompile = Object.assign({uri: state.uri}, input);
        input.uri = state.uri;
        if (state.mode === 'Query') {
          output = compiler.shell[outputLang].compileQuery(
            toCompile, state.builders
          );
        } else {
          output = compiler.shell[outputLang].compileAggregation(
            toCompile, state.builders
          );
        }
      } else {
        const filter = state.mode === 'Query' ? input.filter : input.aggregation;
        output = compiler.shell[outputLang].compile(filter, state.builders);
      }
      dispatch(importsChanged(compiler.shell[outputLang].getImports()));
      dispatch(transpiledExpressionChanged(output));
      dispatch(errorChanged(null));
      dispatch(
        globalAppRegistryEmit(
          'compass:export-to-language:run',
          { language: outputLang, showImports: state.showImports, type: state.mode }
        )
      );
      // return state;
    } catch (e) {
      return dispatch(errorChanged(e.message));
    }
  };
};

export default rootReducer;
