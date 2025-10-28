import '@/shared/styles/utilities.css';
import '../styles/board-list.css';

import assert from '@/shared/validation/assert.js';
import boardEditor from './board-editor.js';
import eventBus, { events } from '../event-bus.js';
import optionsMenu from '@/domains/board/components/options-menu.js';

import {
    createThreeDotsHorizontalIcon,
} from '@/shared/components/icons/create-icons.js';

let workspace;
let container;
let createNewBoardButton;
let list;
let boardEditorContainer;
let optionsMenuContainer;

let activeEditItem;

const roles = {
    boardListItem: 'board-list-item',
};

const actions = {
    selectBoard: 'select-board',
    openOptionsMenu: 'open-board-options-menu',
}

function init(containerElement, workspaceModel) {
    container = containerElement;
    workspace = workspaceModel;

    cacheElements();
    bindEvents();
    boardEditor.init(boardEditorContainer, { onExit: showActiveEditItem });
    optionsMenu.init(optionsMenuContainer, {
        optionsMenuButtonSelectorString:
            `[data-action='${actions.openOptionsMenu}']`,
    });
}

function cacheElements() {
    createNewBoardButton = container.querySelector(
        "[data-action='create-new-board']"
    );
    list = container.querySelector("[data-role='board-list']");
    boardEditorContainer = container.querySelector(
        "[data-role='board-editor']"
    );
    optionsMenuContainer = container.querySelector(
        "[data-role='board-options-menu']"
    );

    assert.notNull(createNewBoardButton, "'createNewBoardButton'");
    assert.notNull(list, "'list'");
    assert.notNull(boardEditorContainer, "'boardEditorContainer'");
    assert.notNull(optionsMenuContainer, "'optionsMenuContainer'");
}

function bindEvents() {
    eventBus.on(events.BOARD_CREATED, addHiddenListItem);
    eventBus.on(events.BOARD_NAME_UPDATED, updateBoardItemText);

    createNewBoardButton.addEventListener('click', handleCreateNewBoardClick);
    list.addEventListener('click', handleListClick);
}

function render() {
    removeAllBoardListItems();

    for (const board of workspace.boards) {
        const listItem = createListItem(board.id, board.name);
        addListItem(listItem);
    }
}

function handleCreateNewBoardClick() {
    list.append(boardEditorContainer);
    boardEditor.enterCreateMode();
}

function handleListClick(event) {
    const button = event.target.closest('button');

    if (!button) {
        return;
    }

    const action = button.dataset.action;

    if (!Object.values(actions).includes(action)) {
        return;
    }

    const listItem = button.closest(`[data-role='${roles.boardListItem}']`);
    const board = workspace.getBoard(listItem.dataset.id);

    if (action === actions.openOptionsMenu) {
        highlightListItem(listItem);
        optionsMenu.toggle({
            anchorElement: listItem,
            onOpen: () => highlightListItem(listItem),
            onCloseOrMove: () => unhighlightListItem(listItem),
            onRenameClick: () => handleRenameClick(board.name, listItem),
            onConfirmDeletionClick: () => deleteBoard(board),
        });

    } else if (action === actions.selectBoard) {
        eventBus.emit(events.BOARD_SELECTION_REQUESTED, { boardId: board.id });
    }
}

function highlightListItem(listItem) {
    listItem.classList.add('is-menu-context');
}

function unhighlightListItem(listItem) {
    listItem.classList.remove('is-menu-context');
}

function addHiddenListItem({boardId, boardName}) {
    const listItem = createListItem(boardId, boardName);
    activeEditItem = listItem;
    activeEditItem.classList.add('hidden');
    addListItem(activeEditItem);
}

function updateBoardItemText({ boardId, boardName }) {
    const boardSelectButton = list.querySelector(
        `[data-id='${boardId}'] [data-action='${actions.selectBoard}']`
    );
    boardSelectButton.textContent = boardName;
}

function showActiveEditItem() {
    activeEditItem.classList.remove('hidden');
}

function handleRenameClick(boardName, listItem) {
    const boardId = listItem.dataset.id;
    activeEditItem = listItem;
    activeEditItem.classList.add('hidden');
    list.insertBefore(boardEditorContainer, activeEditItem);
    boardEditor.enterEditMode(boardId, boardName);
}

function deleteBoard(board) {
    workspace.removeBoard(board);
    render();
}

function addListItem(listItem) {
    list.append(listItem);
}

function removeAllBoardListItems() {
    const boardListItems = Array.from(list.children);
    boardListItems.forEach(listItem => listItem.remove());
}

function createListItem(boardId, boardName) {
    const listItem = document.createElement('li');
    listItem.classList.add('board-list-item');
    listItem.dataset.role = roles.boardListItem;
    listItem.dataset.id = boardId;

    const selectButton = createSelectButton(boardName);
    const optionsButton = createOptionsButton();
    listItem.append(selectButton, optionsButton);

    return listItem;
}

function createSelectButton(boardName) {
    const button = document.createElement('button');
    button.dataset.action = actions.selectBoard;
    button.classList.add('board-select-button');
    button.textContent = boardName;
    button.ariaLabel = 'Select board';

    return button;
}

function createOptionsButton() {
    const button = document.createElement('button');
    button.dataset.action = actions.openOptionsMenu;
    button.classList.add('board-options-button');
    button.ariaLabel = 'Open board options menu';

    const icon = createThreeDotsHorizontalIcon();
    icon.classList.add('board-options-icon');
    button.append(icon);

    return button;
}

const boardList = {
    init,
    render,
};

export default boardList;
