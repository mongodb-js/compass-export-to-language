/**
 * The prefix.
 */
const PREFIX = 'export-to-language/copy-to-clipboard';
const { clipboard } = require('electron');

/**
 * CopyToClipboardFnChanged changed action.
 */
export const COPY_TO_CLIPBOARD_FN_CHANGED = `${PREFIX}/COPY_TO_CLIPBOARD_FN_CHANGED`;
export const COPY_TO_CLIPBOARD = `${PREFIX}/COPY_TO_CLIPBOARD`;

/**
 * The initial state.
 */
export const INITIAL_STATE = (action) => {
  clipboard.writeText(action.input.query);
};

/**
 * Reducer function for handle state changes to copyToClipboardFnChanged.
 *
 * @param {String} state - The copyToClipboardFnChanged state.
 * @param {Object} action - The action.
 *
 * @returns {String} The new state.
 */
export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === COPY_TO_CLIPBOARD_FN_CHANGED) {
    return action.copyToClipboardFnChanged;
  }
  if (action.type === COPY_TO_CLIPBOARD) {
    state.copyToClipboardFn(action.input.query);
    return { ...state, copySuccess: action.input.type };
  }

  return state;
}

/**
 * Action creator for copyToClipboardFnChanged changed events.
 *
 * @param {String} copyToClipboardFnChanged - The copyToClipboardFnChanged value.
 *
 * @returns {Object} The copyToClipboardFnChanged changed action.
 */
export const copyToClipboardFnChanged = (copyToClipboardFnChanged) => ({
  type: COPY_TO_CLIPBOARD_FN_CHANGED,
  copyToClipboardFnChanged
});

export const copyToClipboard = (input) => ({
  type: COPY_TO_CLIPBOARD,
  input: input
});
