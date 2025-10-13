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
    optionsMenu.init(startEntryEdit, promptBoardDeletion);
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
    const isSameContext = optionsMenu.context === listItem;

    if (action === actions.openOptionsMenu) {
        handleOptionsButtonClick(button, listItem, isSameContext);

    } else if (action === actions.selectBoard) {
        // TODO
    }
}

function handleOptionsButtonClick(button, listItem, isSameContext) {

    if (!optionsMenu.isOpen || !isSameContext) {

        if (!optionsMenu.isOpen) {
            setTimeout(monitorMenuCloseCondition);

        } else {
            setOptionMenuContext(null);
        }

        const { x, y } = getTopRightCornerCoordinates(button);
        optionsMenu.move(x, y);
        setOptionMenuContext(listItem);

        if (!optionsMenu.isOpen) {
            optionsMenu.open();
        }

    } else {
        optionsMenu.close();
        setOptionMenuContext(null);
    }
}

function setOptionMenuContext(context) {
    list.querySelector('.is-menu-context')?.classList.remove('is-menu-context');
    optionsMenu.context = context;
    context?.classList.add('is-menu-context');
}

function getTopRightCornerCoordinates(element) {
    const rect = element.getBoundingClientRect();
    const width = rect.right - rect.left;

    return {
        x: rect.x + width,
        y: rect.y,
    };
}

function monitorMenuCloseCondition() {
    document.addEventListener('click', closeOptionsMenuOnOuterClick);
}

function closeOptionsMenuOnOuterClick(event) {
    const isInnerClick = optionsMenu.container.contains(event.target);
    const isOptionsButtonClick = Boolean(event.target.closest(
        `[data-action='${actions.openOptionsMenu}']`
    ));

    if (isInnerClick || isOptionsButtonClick) {
        return;
    }

    document.removeEventListener('click', closeOptionsMenuOnOuterClick);
    optionsMenu.close();
    setOptionMenuContext(null);
}

function startEntryEdit() {
}

function startEntry() {
    boardNameInput.value = '';
    entry.classList.remove('hidden');
    boardNameInput.focus();
}

function cancelEntry() {
    entry.classList.add('hidden');
}

function confirmEntry() {
    const boardName = boardNameInput.value.trim()
        || boardNameInput.placeholder;

    workspace.addEmptyBoard(boardName);
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

function promptBoardDeletion() {
}

const boardList = {
    render,
};

export default boardList;
