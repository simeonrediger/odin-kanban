// Event payloads

/**
 * @typedef {Object} BoardSelectionRequestedDetail
 * @property {string} boardId - Unique ID of the board.
 */

/**
 * @typedef {Object} BoardSelectedDetail
 * @property {string} boardId - Unique ID of the board.
 */

/**
 * @typedef {Object} BoardCreationRequestedDetail
 * @property {string} boardName - Name for the board.
 */

/**
 * @typedef {Object} BoardCreatedDetail
 * @property {string} boardId - Unique ID of the board.
 * @property {string} boardName - Name of the board.
 */

/**
 * @typedef {Object} BoardNameUpdateRequestedDetail
 * @property {string} boardId - Unique ID of the board.
 * @property {string} boardName - New name for the board.
 */

/**
 * @typedef {Object} BoardNameUpdatedDetail
 * @property {string} boardId - Unique ID of the board.
 * @property {string} boardName - New name of the board.
 */

/**
 * @typedef {Object} BoardDeletionRequestedDetail
 * @property {string} boardId - Unique ID of the board.
 */

/**
 * @typedef {Object} BoardDeletedDetail
 * @property {string} boardId - Unique ID of the board.
 */

/**
 * @typedef {Object} ListCreationRequestedDetail
 * @property {string} listName - Name for the list.
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

/**
 * @description Emitted when board creation is requested.
 * @event board:creation-requested
 * @type {string}
 * @see {@link BoardCreationRequestedDetail}
 */
export const BOARD_CREATION_REQUESTED = 'board:creation-requested';

/**
 * @description Emitted when a board is created.
 * @event board:created
 * @type {string}
 * @see {@link BoardCreatedDetail}
 */
export const BOARD_CREATED = 'board:created';

/**
 * @description Emitted when a board name update is requested.
 * @event board:name-update-requested
 * @type {string}
 * @see {@link BoardNameUpdateRequestedDetail}
 */
export const BOARD_NAME_UPDATE_REQUESTED = 'board:name-update-requested';

/**
 * @description Emitted when a board name is updated.
 * @event board:name-updated
 * @type {string}
 * @see {@link BoardNameUpdatedDetail}
 */
export const BOARD_NAME_UPDATED = 'board:name-updated';

/**
 * @description Emitted when board deletion is requested.
 * @event board:deletion-requested
 * @type {string}
 * @see {@link BoardDeletionRequestedDetail}
 */
export const BOARD_DELETION_REQUESTED = 'board:deletion-requested';

/**
 * @description Emitted when a board name is deleted.
 * @event board:deleted
 * @type {string}
 * @see {@link BoardDeletedDetail}
 */
export const BOARD_DELETED = 'board:deleted';

/**
 * @description Emitted when list creation is requested.
 * @event list:creation-requested
 * @type {string}
 * @see {@link ListCreationRequestedDetail}
 */
export const LIST_CREATION_REQUESTED = 'list:creation-requested';
