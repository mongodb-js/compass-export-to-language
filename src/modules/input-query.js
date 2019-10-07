/**
 * The prefix.
 */
const PREFIX = 'export-to-language/input-query';

/**
 * InputQuery changed action.
 */
export const INPUT_QUERY_CHANGED = `${PREFIX}/INPUT_QUERY_CHANGED`;

/**
 * The initial state.
 */
export const INITIAL_STATE = {filter: ''};

/**
 * Reducer function for handle state changes to inputQuery.
 *
 * @param {String} state - The inputQuery state.
 * @param {Object} action - The action.
 *
 * @inputs {String} The new state.
 */
export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === INPUT_QUERY_CHANGED) {
    return action.inputQuery;
  }

  return state;
}

/**
 * Action creator for inputQuery changed events.
 *
 * @param {String} inputQuery - The inputQuery value.
 *
 * @inputs {Object} The inputQuery changed action.
 */
export const inputQueryChanged = (inputQuery) => ({
  type: INPUT_QUERY_CHANGED,
  inputQuery
});
