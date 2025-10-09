import '@/shared/styles/utilities.css';
import '../styles/sidebar.css';

import assert from '@/shared/validation/assert.js';

import {
    createThreeDotsHorizontalIcon,
} from '@/shared/components/icons/create-icons.js';

let workspace;
let container;
let createNewBoardButton;
let boardList;
let newBoardEntry;
let newBoardNameInput;
let cancelNewBoardButton;
let confirmNewBoardButton;

function render(workspaceEntity, containerElement) {
    workspace = workspaceEntity;
    container = containerElement;

    setUpElementReferences();
    bindEvents();
    renderBoardList();
}

function setUpElementReferences() {
    createNewBoardButton = container.querySelector(
        "[data-action='create-new-board']"
    );
    boardList = container.querySelector("[data-role='board-list']");
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
    assert.notNull(boardList, "'boardList'");
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

function renderBoardList() {
    boardList.innerHTML = '';

    for (const board of workspace.boards) {
        const boardListItem = createBoardListItem(board);
        boardList.append(boardListItem);
    }
}

function startNewBoardEntry() {
    newBoardEntry.classList.remove('hidden');
    newBoardNameInput.focus();
}

function cancelNewBoardEntry() {
    newBoardEntry.classList.add('hidden');
    newBoardNameInput.value = '';
}

function confirmNewBoardEntry() {
    const boardName = newBoardNameInput.value.trim()
        || newBoardNameInput.placeholder;

    workspace.addEmptyBoard(boardName);
    cancelNewBoardEntry();
    renderBoardList();
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

function createBoardListItem(board) {
    const boardListItem = document.createElement('li');
    boardListItem.classList.add('board-list-item');

    const boardSelectButton = createBoardSelectButton(board);
    const boardOptionsButton = createBoardOptionsButton();
    boardListItem.append(boardSelectButton, boardOptionsButton);

    return boardListItem;
}

function createBoardSelectButton(board) {
    const boardSelectButton = document.createElement('button');
    boardSelectButton.classList.add('board-select-button');
    boardSelectButton.textContent = board.name;

    return boardSelectButton;
}

function createBoardOptionsButton() {
    const boardOptionsButton = document.createElement('button');
    boardOptionsButton.classList.add('board-options-button');

    const boardOptionsButtonPrompt = 'Open board options menu';
    boardOptionsButton.title = boardOptionsButtonPrompt;
    boardOptionsButton.ariaLabel = boardOptionsButtonPrompt;

    const boardOptionsIcon = createThreeDotsHorizontalIcon();
    boardOptionsIcon.classList.add('board-options-icon');
    boardOptionsButton.append(boardOptionsIcon);

    return boardOptionsButton;
}

const sidebar = {
    render,
};

export default sidebar;
