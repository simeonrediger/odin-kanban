import '@/shared/styles/utilities.css';
import '../styles/board-options-menu.css';

let container;
let anchorElement;
let isTrigger;
let handleRename;
let handleDelete;

let isOpen = false;

const actions = {
    renameBoard: 'rename-board',
    deleteBoard: 'delete-board',
};

function bindEvents() {
    container.addEventListener('click', handleInnerClick);
}

function unbindEvents() {
    container?.removeEventListener('click', handleInnerClick);
}

function toggle(context) {
    const isSameAnchorElement = context.anchorElement === anchorElement;
    ({ anchorElement, isTrigger, handleRename, handleDelete } = context);

    if (isOpen) {

        if (isSameAnchorElement) {
            close();
        } else {
            moveNextToElement();
        }

    } else {
        moveNextToElement();
        open();
    }
}

function open() {
    isOpen = true;
    document.addEventListener('click', closeOnOuterClick, { capture: true });
    container.classList.remove('hidden');
}

function close() {
    isOpen = false;
    anchorElement = null;
    document.removeEventListener('click', closeOnOuterClick, { capture: true });
    container.classList.add('hidden');
}

function moveNextToElement() {
    const rect = anchorElement.getBoundingClientRect();
    const width = rect.right - rect.left;

    container.style.left = rect.x + width + 'px';
    container.style.top = rect.y + 'px';
}

function closeOnOuterClick(event) {
    const isInnerClick = container.contains(event.target);

    if (isInnerClick || isTrigger(event)) {
        return;
    }

    close();
}

function handleInnerClick(event) {
    const clickedButton = event.target.closest('button');

    if (!clickedButton) {
        return;
    }

    const action = clickedButton.dataset.action;

    if (action === actions.renameBoard) {
        handleRename();

    } else if (action === actions.deleteBoard) {
        handleDelete();
    }

    close();
}

const boardOptionsMenu = {
    toggle,

    set container(element) {
        unbindEvents();
        container = element;
        bindEvents();
    },
};

export default boardOptionsMenu;
