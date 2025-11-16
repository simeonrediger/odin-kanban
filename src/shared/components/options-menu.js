import '../styles/options-menu.css';
import '../styles/utilities.css';

import assert from '../validation/assert.js';

export default class OptionsMenu {

    static #actions = {
        edit: 'edit',
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
        onEditClick: undefined,
        onConfirmDeletionClick: undefined,
    };

    constructor() {
        this.#container = this.#createContainer();
        this.#cacheElements();
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

    #cacheElements() {
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
        clientX,
        clientY,
        onOpen,
        onCloseOrMove,
        onEditClick,
        onConfirmDeletionClick,
    }) {
        this.#handlers.onCloseOrMove?.();

        this.#anchorElement = anchorElementArg;
        this.#handlers.onOpen = onOpen;
        this.#handlers.onCloseOrMove = onCloseOrMove;
        this.#handlers.onEditClick = onEditClick;
        this.#handlers.onConfirmDeletionClick = onConfirmDeletionClick;

        this.#handlers.onOpen?.();
        this.#positionContainer(clientX, clientY);

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

    #positionContainer(clientX, clientY) {
        const containerDisplay = this.#container.style.display;
        const containerVisibility = this.#container.style.visibility;

        this.#container.style.left = 0;
        this.#container.style.top = 0;
        this.#container.style.visibility = 'hidden';
        this.#container.style.display = 'block';
        const containerRect = this.#container.getBoundingClientRect();

        this.#container.style.display = containerDisplay;
        this.#container.style.visibility = containerVisibility;

        const parent = this.#container.parentNode;
        const parentRect = parent.getBoundingClientRect();

        const clickRelativeToParent = {
            x: clientX - parentRect.left + parent.scrollLeft,
            y: clientY - parentRect.top + parent.scrollTop,
        };

        const bodyRect = document.body.getBoundingClientRect();

        const containerOverflowsViewport = {
            x: clientX + containerRect.width > bodyRect.right,
            y: clientY + containerRect.height > bodyRect.bottom,
        };

        this.#container.style.left = (
            containerOverflowsViewport.x
                ? clickRelativeToParent.x - containerRect.width
                : clickRelativeToParent.x
        ) + 'px';

        this.#container.style.top = (
            containerOverflowsViewport.y
                ? clickRelativeToParent.y - containerRect.height
                : clickRelativeToParent.y
        ) + 'px';
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

        if (action === OptionsMenu.#actions.edit) {
            this.#close();
            this.#handlers.onEditClick?.();

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
