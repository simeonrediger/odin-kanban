import '@/shared/styles/utilities.css';
import '../styles/board-list.css';

import assert from '@/shared/validation/assert.js';
import optionsMenu from '@/domains/board/components/options-menu.js';

import {
    createThreeDotsHorizontalIcon,
} from '@/shared/components/icons/create-icons.js';

let workspace;
let container;
let createNewBoardButton;
let list;
let boardNameInput;
let cancelEntryButton;
let confirmEntryButton;
let entry;

let editingBoardName = false;

const roles = {
    boardListItem: 'board-list-item',
};

const actions = {
    selectBoard: 'select-board',
    openOptionsMenu: 'open-board-options-menu',
}

function render(workspaceEntity, containerElement) {
    workspaceEntity ? workspace = workspaceEntity : null;
    containerElement ? container = containerElement : null;

    setUpElementReferences();
    bindEvents();
    removeAllBoardListItems();

    for (const board of workspace.boards) {
        const listItem = createListItem(board);
        addListItem(listItem);
    }
}

function setUpElementReferences() {
    createNewBoardButton = container.querySelector(
        "[data-action='create-new-board']"
    );
    list = container.querySelector("[data-role='board-list']");
    entry = container.querySelector("[data-role='board-entry']");
    boardNameInput = container.querySelector(
        "[data-input='board-name']"
    );
    cancelEntryButton = container.querySelector(
        "[data-action='cancel-board-entry']"
    );
    confirmEntryButton = container.querySelector(
        "[data-action='confirm-board-entry']"
    );
    optionsMenu.container = container.querySelector(
        "[data-role='board-options-menu']"
    );

    assert.notNull(createNewBoardButton, "'createNewBoardButton'");
    assert.notNull(entry, "'entry'");
    assert.notNull(boardNameInput, "'boardNameInput'");
    assert.notNull(cancelEntryButton, "'cancelEntryButton'");
    assert.notNull(confirmEntryButton, "'confirmEntryButton'");
    assert.notNull(optionsMenu.container, "'optionsMenu.container'");
}

function bindEvents() {
    createNewBoardButton.addEventListener('click', startEntry);
    list.addEventListener('click', handleInnerClick);
    boardNameInput.addEventListener('keydown', handleBoardNameInputKeyDown);
    cancelEntryButton.addEventListener('click', cancelEntry);
    confirmEntryButton.addEventListener('click', confirmEntry);
    entry.addEventListener('focusout', handleEntryFocusOut);
}

function addListItem(listItem) {
    list.insertBefore(listItem, entry);
}

function removeAllBoardListItems() {
    const boardListItems = Array.from(list.children).filter(
        element => element !== entry
    );

    boardListItems.forEach(listItem => listItem.remove());
}

function createListItem(board) {
    const listItem = document.createElement('li');
    listItem.classList.add('board-list-item');
    listItem.dataset.role = roles.boardListItem;
    listItem.dataset.id = board.id;

    const selectButton = createSelectButton(board);
    const optionsButton = createOptionsButton();
    listItem.append(selectButton, optionsButton);

    return listItem;
}

function createSelectButton(board) {
    const button = document.createElement('button');
    button.dataset.action = actions.selectBoard;
    button.classList.add('board-select-button');
    button.textContent = board.name;
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

function handleInnerClick(event) {
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
        optionsMenu.toggle({
            anchorElement: listItem,
            isTrigger: isOptionsButton,
            handleRename: startEntryEdit,
            handleDelete: () => deleteBoard(board),
        });

    } else if (action === actions.selectBoard) {
        // TODO
    }
}

function isOptionsButton(event) {
    const optionsButton = event.target.closest(
        `[data-action='${actions.openOptionsMenu}']`
    );

    return Boolean(optionsButton);
}

function startEntryEdit() {
    const listItem = optionsMenu.anchorElement;

    const board = workspace.getBoard(listItem.dataset.id);
    boardNameInput.value = board.name;
    list.insertBefore(entry, listItem);
    editingBoardName = true;

    listItem.classList.add('hidden');
    entry.classList.remove('hidden');
    boardNameInput.focus();
}

function startEntry() {
    boardNameInput.value = '';
    entry.classList.remove('hidden');
    boardNameInput.focus();
}

function cancelEntry() {
    entry.classList.add('hidden');

    if (editingBoardName) {
        const listItem = entry.nextElementSibling;
        listItem.classList.remove('hidden');
    }

    editingBoardName = false;
}

function confirmEntry() {
    const boardName = boardNameInput.value.trim()
        || boardNameInput.placeholder;

    if (editingBoardName) {
        const listItem = entry.nextElementSibling;
        const board = workspace.getBoard(listItem.dataset.id);
        board.name = boardName;

    } else {
        workspace.addEmptyBoard(boardName);
    }

    cancelEntry();
    boardList.render();
}

function handleBoardNameInputKeyDown(event) {

    switch (event.key) {
        case 'Enter':
            confirmEntry();
            break;
        case 'Escape':
            cancelEntry();
            break;
    }
}

function handleEntryFocusOut(event) {
    const noChildFocused = !entry.contains(event.relatedTarget);
    const isVisible = !entry.classList.contains('hidden');

    if (noChildFocused && isVisible) {
        cancelEntry();
    }
}

function deleteBoard(board) {
    workspace.removeBoard(board);
    render();
}

const boardList = {
    render,
};

export default boardList;
