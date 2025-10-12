import '@/shared/styles/utilities.css';
import '../styles/board-options-menu.css';

let container;
let context;

const actions = {
    renameBoard: 'rename-board',
    deleteBoard: 'delete-board',
};

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
