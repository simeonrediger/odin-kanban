import '@/shared/styles/utilities.css';
import '../styles/board-list.css';

import assert from '@/shared/validation/assert.js';
import boardEditor from './board-editor.js';
import optionsMenu from '@/domains/board/components/options-menu.js';

import {
    createThreeDotsHorizontalIcon,
} from '@/shared/components/icons/create-icons.js';

let workspace;
let container;
let createNewBoardButton;
let list;
let boardEditorContainer;
let onBoardSelect;

let editingBoardName = false;
let editedListItem;

const roles = {
    boardListItem: 'board-list-item',
};

const actions = {
    selectBoard: 'select-board',
    openOptionsMenu: 'open-board-options-menu',
}

function init(containerElement, workspaceModel, onBoardSelectHandler) {
    container = containerElement;
    workspace = workspaceModel;
    onBoardSelect = onBoardSelectHandler;

    cacheElements();
    bindEvents();
    boardEditor.init(boardEditorContainer, {
        onSubmit: addBoardAndRender,
        onExitEditMode: showEditedListItem,
    });
}

function render() {
    removeAllBoardListItems();

    for (const board of workspace.boards) {
        const listItem = createListItem(board);
        addListItem(listItem);
    }
}

function cacheElements() {
    createNewBoardButton = container.querySelector(
        "[data-action='create-new-board']"
    );
    list = container.querySelector("[data-role='board-list']");
    boardEditorContainer = container.querySelector(
        "[data-role='board-editor']"
    );
    optionsMenu.container = container.querySelector(
        "[data-role='board-options-menu']"
    );

    assert.notNull(createNewBoardButton, "'createNewBoardButton'");
    assert.notNull(boardEditorContainer, "'boardEditorContainer'");
    assert.notNull(optionsMenu.container, "'optionsMenu.container'");
}

function bindEvents() {
    createNewBoardButton.addEventListener('click', handleCreateNewBoardClick);
    list.addEventListener('click', handleListClick);
}

function addBoardAndRender(boardName) {
    workspace.addEmptyBoard(boardName);
    render();
}

function addListItem(listItem) {
    list.insertBefore(listItem, boardEditorContainer);
}

function removeAllBoardListItems() {
    const boardListItems = Array.from(list.children).filter(
        element => element !== boardEditorContainer
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
        optionsMenu.toggle({
            anchorElement: listItem,
            isTrigger: isOptionsButton,
            onRenameClick: () => editBoardName(board.name, listItem),
            onConfirmDeleteClick: () => deleteBoard(board),
        });

    } else if (action === actions.selectBoard) {
        onBoardSelect(board);
    }
}

function editBoardName(boardName, listItem) {
    editedListItem = listItem;
    editedListItem.classList.add('hidden');
    list.insertBefore(boardEditorContainer, editedListItem);
    boardEditor.enterEditMode(boardName);
}

function showEditedListItem() {
    list.insertBefore(editedListItem, boardEditorContainer);
    editedListItem.classList.remove('hidden');
}

function isOptionsButton(element) {
    const optionsButton = element.closest(
        `[data-action='${actions.openOptionsMenu}']`
    );

    return Boolean(optionsButton);
}

function handleCreateNewBoardClick() {
    list.append(boardEditorContainer);
    boardEditor.enterCreateMode();
}

function deleteBoard(board) {
    workspace.removeBoard(board);
    render();
}

const boardList = {
    init,
    render,
};

export default boardList;
