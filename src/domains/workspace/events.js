// Event payloads

/**
 * @typedef {Object} BoardSelectionRequestedDetail
 * @property {string} boardId - Unique ID of the board.
 */

/**
 * @typedef {Object} BoardSelectedDetail
 * @property {string} boardId - Unique ID of the board.
 */



// Event names

/**
 * @description Emitted when board selection is requested.
 * @event board:selection-requested
 * @type {string}
 * @see {@link BoardSelectionRequestedDetail}
 */
export const BOARD_SELECTION_REQUESTED = 'board:selection-requested';

/**
 * @description Emitted when a board is selected.
 * @event board:selected
 * @type {string}
 * @see {@link BoardSelectedDetail}
 */
export const BOARD_SELECTED = 'board:selected';
