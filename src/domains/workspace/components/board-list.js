import '@/shared/styles/utilities.css';
import '../styles/board-list.css';

import assert from '@/shared/validation/assert.js';

import {
    createThreeDotsHorizontalIcon,
} from '@/shared/components/icons/create-icons.js';

let workspace;
let container;
let createNewBoardButton;
let list;
let newBoardNameInput;
let cancelNewBoardButton;
let confirmNewBoardButton;
let newBoardEntry;

function render(workspaceEntity, containerElement) {
    workspaceEntity ? workspace = workspaceEntity : null;
    containerElement ? container = containerElement : null;

    setUpElementReferences();
    bindEvents();
    removeAllBoardListItems();

    for (const board of workspace.boards) {
        const boardListItem = createListItem(board);
        addBoardListItem(boardListItem);
    }
}

function setUpElementReferences() {
    createNewBoardButton = container.querySelector(
        "[data-action='create-new-board']"
    );
    list = container.querySelector("[data-role='board-list']");
    newBoardEntry = container.querySelector("[data-role='new-board-entry']");
    newBoardNameInput = container.querySelector(
        "[data-input='new-board-name']"
    );
    cancelNewBoardButton = container.querySelector(
        "[data-action='cancel-new-board']"
    );
    confirmNewBoardButton = container.querySelector(
        "[data-action='confirm-new-board']"
    );

    assert.notNull(createNewBoardButton, "'createNewBoardButton'");
    assert.notNull(newBoardEntry, "'newBoardEntry'");
    assert.notNull(newBoardNameInput, "'newBoardNameInput'");
    assert.notNull(cancelNewBoardButton, "'cancelNewBoardButton'");
    assert.notNull(confirmNewBoardButton, "'confirmNewBoardButton'");
}

function bindEvents() {
    createNewBoardButton.addEventListener('click', startNewBoardEntry);
    newBoardNameInput.addEventListener('keydown', handleNewBoardNameKeyDown);
    cancelNewBoardButton.addEventListener('click', cancelNewBoardEntry);
    confirmNewBoardButton.addEventListener('click', confirmNewBoardEntry);
    newBoardEntry.addEventListener('focusout', handleNewBoardEntryFocusOut);
}

function addBoardListItem(listItem) {
    list.insertBefore(listItem, newBoardEntry);
}

function removeAllBoardListItems() {
    const boardListItems = Array.from(list.children).filter(
        element => element !== newBoardEntry
    );

    boardListItems.forEach(listItem => listItem.remove());
}

function createListItem(board) {
    const boardListItem = document.createElement('li');
    boardListItem.classList.add('board-list-item');

    const boardSelectButton = createSelectButton(board);
    const boardOptionsButton = createOptionsButton();
    boardListItem.append(boardSelectButton, boardOptionsButton);

    return boardListItem;
}

function createSelectButton(board) {
    const boardSelectButton = document.createElement('button');
    boardSelectButton.classList.add('board-select-button');
    boardSelectButton.textContent = board.name;
    boardSelectButton.ariaLabel = 'Select board';

    return boardSelectButton;
}

function createOptionsButton() {
    const boardOptionsButton = document.createElement('button');
    boardOptionsButton.classList.add('board-options-button');
    boardOptionsButton.ariaLabel = 'Open board options menu';

    const boardOptionsIcon = createThreeDotsHorizontalIcon();
    boardOptionsIcon.classList.add('board-options-icon');
    boardOptionsButton.append(boardOptionsIcon);

    return boardOptionsButton;
}

function startNewBoardEntry() {
    newBoardNameInput.value = '';
    newBoardEntry.classList.remove('hidden');
    newBoardNameInput.focus();
}

function cancelNewBoardEntry() {
    newBoardEntry.classList.add('hidden');
}

function confirmNewBoardEntry() {
    const boardName = newBoardNameInput.value.trim()
        || newBoardNameInput.placeholder;

    workspace.addEmptyBoard(boardName);
    cancelNewBoardEntry();
    boardList.render();
}

function handleNewBoardNameKeyDown(event) {

    switch (event.key) {
        case 'Enter':
            confirmNewBoardEntry();
            break;
        case 'Escape':
            cancelNewBoardEntry();
            break;
    }
}

function handleNewBoardEntryFocusOut(event) {
    const noChildFocused = !newBoardEntry.contains(event.relatedTarget);
    const isVisible = !newBoardEntry.classList.contains('hidden');

    if (noChildFocused && isVisible) {
        cancelNewBoardEntry();
    }
}

const boardList = {
    render,
};

export default boardList;
