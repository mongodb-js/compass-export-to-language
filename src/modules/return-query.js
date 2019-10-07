/**
 * The prefix.
 */
const PREFIX = 'export-to-language/return-query';

/**
 * ReturnQuery changed action.
 */
export const RETURN_QUERY_CHANGED = `${PREFIX}/RETURN_QUERY_CHANGED`;

/**
 * The initial state.
 */
export const INITIAL_STATE = '';

/**
 * Reducer function for handle state changes to returnQuery.
 *
 * @param {String} state - The returnQuery state.
 * @param {Object} action - The action.
 *
 * @returns {String} The new state.
 */
export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === RETURN_QUERY_CHANGED) {
    return action.returnQuery;
  }

  return state;
}

/**
 * Action creator for returnQuery changed events.
 *
 * @param {String} returnQuery - The returnQuery value.
 *
 * @returns {Object} The returnQuery changed action.
 */
export const returnQueryChanged = (returnQuery) => ({
  type: RETURN_QUERY_CHANGED,
  returnQuery
});
