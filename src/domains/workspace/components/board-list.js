import '@/shared/styles/utilities.css';
import '../styles/board-list.css';

import assert from '@/shared/validation/assert.js';
import boardEditor from './board-editor.js';
import boardListStore from '../board-list-store.js';
import eventBus, { events } from '../event-bus.js';
import boardOptionsMenu from '@/domains/board/components/options-menu.js';

import {
    createThreeDotsHorizontalIcon,
} from '@/shared/components/icons/create-icons.js';

let container;
let createNewBoardButton;
let list;
let boardEditorContainer;

let activeEditItem;

const roles = {
    boardListItem: 'board-list-item',
};

const actions = {
    selectBoard: 'select-board',
    openBoardOptionsMenu: 'open-board-options-menu',
}

function init(containerElement) {
    container = containerElement;
    cacheElements();
    bindEvents();

    boardEditor.init(boardEditorContainer, { onExit: showActiveEditItem });

    boardOptionsMenu.init({
        optionsMenuButtonSelector: (
            `[data-action='${actions.openBoardOptionsMenu}']`
        ),
    });

    container.append(boardOptionsMenu.container);
}
 
function cacheElements() {
    createNewBoardButton = container.querySelector(
        "[data-action='create-new-board']"
    );
    list = container.querySelector("[data-role='board-list']");
    boardEditorContainer = container.querySelector(
        "[data-role='board-editor']"
    );

    assert.notNull(createNewBoardButton, "'createNewBoardButton'");
    assert.notNull(list, "'list'");
    assert.notNull(boardEditorContainer, "'boardEditorContainer'");
}

function bindEvents() {
    eventBus.on(events.BOARD_SELECTED, highlightSelectedListItem);
    eventBus.on(events.BOARD_CREATED, handleBoardCreation);
    eventBus.on(events.BOARD_NAME_UPDATED, handleBoardNameUpdate);
    eventBus.on(events.BOARD_DELETED, handleBoardDeletion);

    createNewBoardButton.addEventListener('click', handleCreateNewBoardClick);
    list.addEventListener('click', handleListClick);
}

function render() {
    removeAllBoardListItems();

    for (const boardId of boardListStore.getBoardIds()) {
        const boardName = boardListStore.getBoardName(boardId);
        const listItem = createListItem(boardId, boardName);
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
    const boardId = listItem.dataset.id;
    const boardName = boardListStore.getBoardName(boardId);

    if (action === actions.selectBoard) {
        eventBus.emit(events.BOARD_SELECTION_REQUESTED, { boardId });

    } else if (action === actions.openBoardOptionsMenu) {
        highlightListItem(listItem);

        boardOptionsMenu.toggle({
            anchorElement: listItem,
            clientX: event.clientX,
            clientY: event.clientY,
            onOpen: () => highlightListItem(listItem),
            onCloseOrMove: () => unhighlightListItem(listItem),
            onRenameClick: () => handleRenameClick(boardName, listItem),
            onConfirmDeletionClick: () => handleDeleteClick(boardId),
        });
    }
}

function highlightListItem(listItem) {
    listItem.classList.add('is-menu-context');
}

function unhighlightListItem(listItem) {
    listItem.classList.remove('is-menu-context');
}

function highlightSelectedListItem({ boardId }) {
    const selectedListItem = list.querySelector(`[data-id='${boardId}']`);
    list.querySelector('.selected')?.classList.remove('selected');
    selectedListItem?.classList.add('selected');
}

function handleBoardCreation({ boardId, boardName }) {
    addHiddenListItem(boardId, boardName);
}

function addHiddenListItem(boardId, boardName) {
    const listItem = createListItem(boardId, boardName);
    activeEditItem = listItem;
    activeEditItem.classList.add('hidden');
    addListItem(activeEditItem);
}

function handleBoardNameUpdate({ boardId, boardName }) {
    updateBoardItemText(boardId, boardName);
}

function updateBoardItemText(boardId, boardName) {
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

function handleDeleteClick(boardId) {
    eventBus.emit(events.BOARD_DELETION_REQUESTED, { boardId });
}

function handleBoardDeletion({ boardId, boardName }) {
    removeListItem(boardId);
}

function removeListItem(boardId) {
    const listItem = list.querySelector(`[data-id='${boardId}']`);
    listItem.remove();
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
    button.dataset.action = actions.openBoardOptionsMenu;
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
