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
let list;
let boardEditorContainer;

let activeEditItem;
let movingClone;
let indexBeforeMove;

const roles = {
    boardListItem: 'board-list-item',
};

const actions = {
    createBoard: 'create-board',
    selectBoard: 'select-board',
    openBoardOptionsMenu: 'open-board-options-menu',
}

function init(containerElement) {
    container = containerElement;
    cacheElements();
    bindEvents();

    boardEditor.init(boardEditorContainer, { onExit: handleBoardEditorExit });

    boardOptionsMenu.init({
        optionsMenuButtonSelector: (
            `[data-action='${actions.openBoardOptionsMenu}']`
        ),
    });

    container.append(boardOptionsMenu.container);
}
 
function cacheElements() {
    list = container.querySelector("[data-role='board-list']");
    boardEditorContainer = container.querySelector(
        "[data-role='board-editor']"
    );

    assert.notNull(list, "'list'");
    assert.notNull(boardEditorContainer, "'boardEditorContainer'");
}

function bindEvents() {
    eventBus.on(events.BOARD_SELECTED, highlightSelectedListItem);
    eventBus.on(events.BOARD_CREATED, handleBoardCreation);
    eventBus.on(events.BOARD_NAME_UPDATED, handleBoardNameUpdate);
    eventBus.on(events.BOARD_MOVED, handleBoardMove);
    eventBus.on(events.BOARD_DELETED, handleBoardDeletion);

    document.addEventListener('click', handleClick);
}

function render() {
    removeAllBoardListItems();

    for (const boardId of boardListStore.getBoardIds()) {
        const boardName = boardListStore.getBoardName(boardId);
        const listItem = createListItem(boardId, boardName);
        addListItem(listItem);
    }
}

function handleClick(event) {

    if (!boardOptionsMenu.container.contains(event.target) && movingClone) {
        stopItemMove();
    }

    if (
        !container.contains(event.target
        || movingClone?.contains(event.target))
    ) {
        return;
    }

    const button = event.target.closest('button');

    if (!button) {
        return;
    }

    const action = button.dataset.action;

    if (!Object.values(actions).includes(action)) {
        return;
    }

    if (action === actions.createBoard) {
        handleCreateBoardClick();
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
            onEditClick: () => handleEditClick(boardName, listItem),
            onMoveClick: () => handleMoveClick(boardId),
            onConfirmDeletionClick: () => handleDeleteClick(boardId),
        });
    }
}

function handleCreateBoardClick() {
    list.append(boardEditorContainer);
    boardEditor.enterCreateMode();
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

function handleBoardEditorExit() {

    if (activeEditItem) {
        showActiveEditItem();
    }

    activeEditItem = null;
}

function showActiveEditItem() {
    activeEditItem.classList.remove('hidden');
}

function handleEditClick(boardName, listItem) {
    const boardId = listItem.dataset.id;
    activeEditItem = listItem;
    activeEditItem.classList.add('hidden');
    list.insertBefore(boardEditorContainer, activeEditItem);
    boardEditor.enterEditMode(boardId, boardName);
}

function handleMoveClick(boardId) {
    stopItemMove();
    activeEditItem = list.querySelector(`[data-id='${boardId}']`);
    
    const boardListItems = Array.from(
        list.querySelectorAll(`[data-role='${roles.boardListItem}']`)
    );

    indexBeforeMove = boardListItems.indexOf(activeEditItem);

    createMovingClone();
    document.addEventListener('keydown', handleMoveKeyDown);
}

function createMovingClone() {
    movingClone = activeEditItem.cloneNode(true);
    delete movingClone.dataset.role;
    delete movingClone.dataset.id;

    moveClone();

    list.append(movingClone);
    activeEditItem.classList.add('moving');
    movingClone.classList.add('moving-clone');
}

function moveClone() {
    const listRect = list.getBoundingClientRect();
    const itemRect = activeEditItem.getBoundingClientRect();

    const relativePosition = {
        top: itemRect.top - listRect.top,
        left: itemRect.left - listRect.left,
    };

    movingClone.style.top = relativePosition.top + 'px';
    movingClone.style.left = relativePosition.left + 'px';
    movingClone.style.width = itemRect.width + 'px';
}

function handleMoveKeyDown(event) {

    switch (event.key) {

        case 'Enter':
            submitItemMove();
            break;

        case 'Escape':
            cancelItemMove();
            break;

        case 'ArrowUp':
            moveItemUp();
            break;

        case 'ArrowDown':
            moveItemDown();
            break;
    }
}

function submitItemMove() {
    const boardListItems = Array.from(
        list.querySelectorAll(`[data-role='${roles.boardListItem}']`)
    );

    const targetIndex = boardListItems.indexOf(activeEditItem);
    const boardId = activeEditItem.dataset.id;

    eventBus.emit(events.BOARD_MOVE_REQUESTED, { boardId, targetIndex });
}

function cancelItemMove() {
    moveItemToIndex(indexBeforeMove);
    stopItemMove();
}

function stopItemMove() {
    indexBeforeMove = null;

    movingClone?.remove();
    movingClone = null;

    activeEditItem?.classList.remove('moving');
    activeEditItem = null;

    document.removeEventListener('keydown', handleMoveKeyDown);
}

function handleBoardMove({ boardId, newIndex }) {
    const boardListItems = Array.from(
        list.querySelectorAll(`[data-role='${roles.boardListItem}']`)
    );

    const activeEditItemId = activeEditItem.dataset.id;
    const activeEditItemIndex = boardListItems.indexOf(activeEditItem);

    if (boardId !== activeEditItemId) {
        cancelItemMove();
        throw new Error(`Unexpected 'boardId': ${boardId}`);
    }

    if (newIndex !== activeEditItemIndex) {
        cancelItemMove();
        throw new Error(`Unexpected 'newIndex': ${newIndex}`);
    }

    stopItemMove();
}

function moveItemDown() {
    const boardListItems = Array.from(
        list.querySelectorAll(`[data-role='${roles.boardListItem}']`)
    );

    const currentIndex = boardListItems.indexOf(activeEditItem);
    const targetIndex = currentIndex + 1;
    const maxIndex = boardListItems.length - 1;

    if (targetIndex > maxIndex) {
        return;
    }

    moveItemToIndex(targetIndex);
}

function moveItemUp() {
    const boardListItems = Array.from(
        list.querySelectorAll(`[data-role='${roles.boardListItem}']`)
    );

    const currentIndex = boardListItems.indexOf(activeEditItem);
    const targetIndex = currentIndex - 1;
    const minIndex = 0;

    if (targetIndex < minIndex) {
        return;
    }

    moveItemToIndex(targetIndex);
}

function moveItemToIndex(targetIndex) {
    const boardListItems = Array.from(
        list.querySelectorAll(`[data-role='${roles.boardListItem}']`)
    );

    const maxIndex = boardListItems.length - 1;

    if (targetIndex === 0) {
        list.prepend(activeEditItem);

    } else if (targetIndex === maxIndex) {
        list.append(activeEditItem);

    } else {
        let targetNextItem = boardListItems[targetIndex + 1];

        if (targetNextItem === activeEditItem) {
            targetNextItem = boardListItems[targetIndex];
        }

        list.insertBefore(activeEditItem, targetNextItem);
    }

    moveClone();
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
