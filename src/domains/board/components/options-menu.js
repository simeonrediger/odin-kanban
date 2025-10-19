import '@/shared/styles/utilities.css';
import '../styles/options-menu.css';

import assert from '@/shared/validation/assert.js';

let container;
let anchorElement;
let optionsMenuButtonSelector;
let deleteBoardOption;
let confirmBoardDeletionOption;

let isOpen = false;

const actions = {
    renameBoard: 'rename-board',
    deleteBoard: 'delete-board',
    confirmBoardDeletion: 'confirm-board-deletion',
};

const handlers = {
    onRenameClick: undefined,
    onConfirmDeletionClick: undefined,
};

function init(containerElement, { optionsMenuButtonSelectorString }) {
    container = containerElement;
    optionsMenuButtonSelector = optionsMenuButtonSelectorString;
    setUpElementReferences();
    bindEvents();
}

function bindEvents() {
    container.addEventListener('click', handleClick);
}

function setUpElementReferences() {
    deleteBoardOption = container.querySelector(
        "[data-role='delete-board-option']"
    );
    confirmBoardDeletionOption = container.querySelector(
        "[data-role='confirm-board-deletion-option']"
    );

    assert.notNull(deleteBoardOption, "'deleteBoardOption'");
    assert.notNull(confirmBoardDeletionOption, "'confirmBoardDeletionOption'");
}

function toggle(context) {
    const isSameAnchorElement = context.anchorElement === anchorElement;

    if (isOpen) {

        if (isSameAnchorElement) {
            close();
        } else {
            open(context);
        }

    } else {
        open(context);
    }
}

function open({
    anchorElement: anchorElementArg,
    onRenameClick,
    onConfirmDeletionClick,
}) {
    anchorElement = anchorElementArg;
    handlers.onRenameClick = onRenameClick;
    handlers.onConfirmDeletionClick = onConfirmDeletionClick;

    moveNextToElement();

    if (isOpen) {
        return;
    }

    isOpen = true;
    document.addEventListener('click', closeOnOuterClick, { capture: true });
    container.classList.remove('hidden');
}

function close() {
    isOpen = false;
    anchorElement = null;
    document.removeEventListener('click', closeOnOuterClick, { capture: true });
    container.classList.add('hidden');
    confirmBoardDeletionOption.classList.add('hidden');
    deleteBoardOption.classList.remove('hidden');
}

function moveNextToElement() {
    const rect = anchorElement.getBoundingClientRect();
    const width = rect.right - rect.left;

    container.style.left = rect.x + width + 'px';
    container.style.top = rect.y + 'px';
}

function closeOnOuterClick(event) {
    const isInnerClick = container.contains(event.target);

    if (isInnerClick) {
        return;
    }

    if (event.target.closest(optionsMenuButtonSelector)) {
        return;
    }

    close();
}

function handleClick(event) {
    const clickedButton = event.target.closest('button');

    if (!clickedButton) {
        return;
    }

    const action = clickedButton.dataset.action;

    if (action === actions.renameBoard) {
        close();
        handlers.onRenameClick?.();

    } else if (action === actions.deleteBoard) {
        showConfirmDeletionButton();

    } else if (action === actions.confirmBoardDeletion) {
        close();
        handlers.onConfirmDeletionClick?.();
    }
}

function showConfirmDeletionButton() {
    deleteBoardOption.classList.add('hidden');
    confirmBoardDeletionOption.classList.remove('hidden');
}

const boardOptionsMenu = {
    init,
    toggle,

    get anchorElement() {
        return anchorElement;
    }
};

export default boardOptionsMenu;
