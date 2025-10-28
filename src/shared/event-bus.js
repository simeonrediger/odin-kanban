export default class EventBus {
    #listeners = new Map();

    on(eventName, handler) {
        const handlers = this.#listeners.get(eventName) ?? [];
        handlers.push(handler);
        this.#listeners.set(eventName, handlers);
    }

    off(eventName, handler) {
        const handlers = this.#listeners.get(eventName);

        if (!handlers) {
            return;
        }

        const handlerIndex = handlers.indexOf(handler);

        if (handlerIndex !== -1) {
            handlers.splice(handlerIndex, 1);
        }

        if (handlers.length === 0) {
            this.#listeners.delete(eventName);
        }
    }

    emit(eventName, detail) {
        const handlers = this.#listeners.get(eventName);

        if (!handlers) {
            return;
        }

        for (const handler of [...handlers]) {
            handler(detail);
        }
    }
}
