/**
 * The prefix.
 */
const PREFIX = 'export-to-language/query-error';

/**
 * QueryError changed action.
 */
export const QUERY_ERROR_CHANGED = `${PREFIX}/QUERY_ERROR_CHANGED`;

/**
 * The initial state.
 */
export const INITIAL_STATE = null;

/**
 * Reducer function for handle state changes to queryError.
 *
 * @param {String} state - The queryError state.
 * @param {Object} action - The action.
 *
 * @returns {String} The new state.
 */
export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === QUERY_ERROR_CHANGED) {
    return action.queryError;
  }

  return state;
}

/**
 * Action creator for queryError changed events.
 *
 * @param {String} queryError - The queryError value.
 *
 * @returns {Object} The queryError changed action.
 */
export const queryErrorChanged = (queryError) => ({
  type: QUERY_ERROR_CHANGED,
  queryError
});
