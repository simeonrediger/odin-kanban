import '@/shared/styles/utilities.css';
import '../styles/board-options-menu.css';

let container;
let context;
let handleRename;
let handleDelete;

const actions = {
    renameBoard: 'rename-board',
    deleteBoard: 'delete-board',
};

function init(renameHandlerFunction, deleteHandlerFunction) {
    handleRename = renameHandlerFunction;
    handleDelete = deleteHandlerFunction;
    bindEvents();
}

function bindEvents() {
    container.addEventListener('click', handleInnerClick);
}

function move(x, y) {
    container.style.left = x + 'px';
    container.style.top = y + 'px';
}

function open(board) {
    container.classList.remove('hidden');
}

function close() {
    container.classList.add('hidden');
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
}

const boardOptionsMenu = {
    init,
    move,
    open,
    close,

    get container() {
        return container;
    },

    set container(element) {
        container = element;
    },

    get isOpen() {
        return !container.classList.contains('hidden');
    },

    get context() {
        return context;
    },

    set context(element) {
        context = element;
    },
};

export default boardOptionsMenu;
