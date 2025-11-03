import '../styles/options-menu.css';
import '../styles/utilities.css';

import assert from '../validation/assert.js';

export default class OptionsMenu {

    static #actions = {
        rename: 'rename',
        delete: 'delete',
        confirmDeletion: 'confirm-deletion',
    };

    #container;
    #anchorElement;
    #optionsMenuButtonSelector;
    #label;
    #deleteOption;
    #confirmDeletionOption;

    #isOpen = false;

    #handlers = {
        onOpen: undefined,
        onCloseOrMove: undefined,
        onRenameClick: undefined,
        onConfirmDeletionClick: undefined,
    };

    constructor() {
        this.#container = this.#createContainer();
        this.#setUpElementReferences();
        this.#bindEvents();
    }

    init({ labelText, optionsMenuButtonSelector }) {
        this.#label.textContent ||= labelText;
        this.#optionsMenuButtonSelector ??= optionsMenuButtonSelector;
    }

    toggle(context) {
        const isSameAnchorElement = (
            context.anchorElement === this.#anchorElement
        );

        if (this.#isOpen) {

            if (isSameAnchorElement) {
                this.#close();
            } else {
                this.#open(context);
            }

        } else {
            this.#open(context);
        }
    }

    get container() {
        return this.#container;
    }

    get anchorElement() {
        return this.#anchorElement;
    }

    #bindEvents() {
        this.#container.addEventListener('click', this.#handleClick.bind(this));
    }

    #setUpElementReferences() {
        this.#label = this.#container.querySelector("[data-role='label']");
        this.#deleteOption = this.#container.querySelector(
            "[data-role='delete-option']"
        );
        this.#confirmDeletionOption = this.#container.querySelector(
            "[data-role='confirm-deletion-option']"
        );

        assert.notNull(this.#label, "'label'");
        assert.notNull(this.#deleteOption, "'deleteOption'");
        assert.notNull(this.#confirmDeletionOption, "'confirmDeletionOption'");
    }

    #open({
        anchorElement: anchorElementArg,
        onOpen,
        onCloseOrMove,
        onRenameClick,
        onConfirmDeletionClick,
    }) {
        this.#handlers.onCloseOrMove?.();

        this.#anchorElement = anchorElementArg;
        this.#handlers.onOpen = onOpen;
        this.#handlers.onCloseOrMove = onCloseOrMove;
        this.#handlers.onRenameClick = onRenameClick;
        this.#handlers.onConfirmDeletionClick = onConfirmDeletionClick;

        this.#handlers.onOpen?.();
        this.#moveNextToElement();

        if (this.#isOpen) {
            return;
        }

        this.#isOpen = true;

        document.addEventListener('click',
            this.#closeOnOuterClick.bind(this),
            { capture: true },
        );

        this.#container.classList.remove('hidden');
    }

    #close() {
        this.#isOpen = false;
        this.#anchorElement = null;

        document.removeEventListener('click',
            this.#closeOnOuterClick.bind(this),
            { capture: true },
        );

        this.#container.classList.add('hidden');
        this.#confirmDeletionOption.classList.add('hidden');
        this.#deleteOption.classList.remove('hidden');
        this.#handlers.onCloseOrMove?.();
    }

    #moveNextToElement() {
        const rect = this.#anchorElement.getBoundingClientRect();
        const width = rect.right - rect.left;

        this.#container.style.left = rect.x + width + 'px';
        this.#container.style.top = rect.y + 'px';
    }

    #closeOnOuterClick(event) {
        const isInnerClick = this.#container.contains(event.target);

        if (isInnerClick
            || event.target.closest(this.#optionsMenuButtonSelector)
        ) {
            return;
        }

        this.#close();
    }

    #handleClick(event) {
        const clickedButton = event.target.closest('button');

        if (!clickedButton) {
            return;
        }

        const action = clickedButton.dataset.action;

        if (action === OptionsMenu.#actions.rename) {
            this.#close();
            this.#handlers.onRenameClick?.();

        } else if (action === OptionsMenu.#actions.delete) {
            this.#showConfirmDeletionButton();

        } else if (action === OptionsMenu.#actions.confirmDeletion) {
            this.#close();
            this.#handlers.onConfirmDeletionClick?.();
        }
    }

    #showConfirmDeletionButton() {
        this.#deleteOption.classList.add('hidden');
        this.#confirmDeletionOption.classList.remove('hidden');
    }

    #createContainer() {
        const templateFragment = document.querySelector(
            "[data-template='options-menu']"
        ).content;

        const container = templateFragment.querySelector(
            "[data-role='options-menu']"
        ).cloneNode(true);

        return container;
    }
}
