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

/**
 * @typedef {Object} ListCreatedDetail
 * @property {string} listId - Unique ID of the list.
 * @property {string} listName - Name of the list.
 */

/**
 * @typedef {Object} ListNameUpdateRequestedDetail
 * @property {string} listId - Unique ID of the list.
 * @property {string} listName - New name for the list.
 */

/**
 * @typedef {Object} ListNameUpdatedDetail
 * @property {string} listId - Unique ID of the list.
 * @property {string} listName - New name of the list.
 */

/**
 * @typedef {Object} ListDeletionRequestedDetail
 * @property {string} listId - Unique ID of the list.
 */

/**
 * @typedef {Object} ListDeletedDetail
 * @property {string} listId - Unique ID of the list.
 */

/**
 * @typedef {Object} TaskCreationRequestedDetail
 * @property {string} listId - Unique ID of the list containing the task.
 * @property {string} taskName - Name for the task.
 */

/**
 * @typedef {Object} TaskCreatedDetail
 * @property {string} listId - Unique ID of the list containing the task.
 * @property {string} taskId - Unique ID of the task.
 * @property {string} taskName - Name of the task.
 */

/**
 * @typedef {Object} TaskNameUpdateRequestedDetail
 * @property {string} listId - Unique ID of the list containing the task.
 * @property {string} taskId - Unique ID of the task.
 * @property {string} taskName - New name for the task.
 */

/**
 * @typedef {Object} TaskNameUpdatedDetail
 * @property {string} listId - Unique ID of the list containing the task.
 * @property {string} taskId - Unique ID of the task.
 * @property {string} taskName - New name of the task.
 */

/**
 * @typedef {Object} TaskDeletionRequestedDetail
 * @property {string} listId - Unique ID of the list containing the task.
 * @property {string} taskId - Unique ID of the task.
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
 * @description Emitted when a board is deleted.
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

/**
 * @description Emitted when a list is created.
 * @event list:created
 * @type {string}
 * @see {@link ListCreatedDetail}
 */
export const LIST_CREATED = 'list:created';

/**
 * @description Emitted when a list name update is requested.
 * @event list:name-update-requested
 * @type {string}
 * @see {@link ListNameUpdateRequestedDetail}
 */
export const LIST_NAME_UPDATE_REQUESTED = 'list:name-update-requested';

/**
 * @description Emitted when a list name is updated.
 * @event list:name-updated
 * @type {string}
 * @see {@link ListNameUpdatedDetail}
 */
export const LIST_NAME_UPDATED = 'list:name-updated';

/**
 * @description Emitted when list deletion is requested.
 * @event list:deletion-requested
 * @type {string}
 * @see {@link ListDeletionRequestedDetail}
 */
export const LIST_DELETION_REQUESTED = 'list:deletion-requested';

/**
 * @description Emitted when a list is deleted.
 * @event list:deleted
 * @type {string}
 * @see {@link ListDeletedDetail}
 */
export const LIST_DELETED = 'list:deleted';

/**
 * @description Emitted when task creation is requested.
 * @event task:creation-requested
 * @type {string}
 * @see {@link TaskCreationRequestedDetail}
 */
export const TASK_CREATION_REQUESTED = 'task:creation-requested';

/**
 * @description Emitted when a task is created.
 * @event task:created
 * @type {string}
 * @see {@link TaskCreatedDetail}
 */
export const TASK_CREATED = 'task:created';

/**
 * @description Emitted when a task name update is requested.
 * @event task:name-update-requested
 * @type {string}
 * @see {@link TaskNameUpdateRequestedDetail}
 */
export const TASK_NAME_UPDATE_REQUESTED = 'task:name-update-requested';

/**
 * @description Emitted when a task name is updated.
 * @event task:name-updated
 * @type {string}
 * @see {@link TaskNameUpdatedDetail}
 */
export const TASK_NAME_UPDATED = 'task:name-updated';

/**
 * @description Emitted when task deletion is requested.
 * @event task:deletion-requested
 * @type {string}
 * @see {@link TaskDeletionRequestedDetail}
 */
export const TASK_DELETION_REQUESTED = 'task:deletion-requested';
