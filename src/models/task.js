export default class Task {
    #name;

    constructor(name) {
        this.#name = name.trim();
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }
}
