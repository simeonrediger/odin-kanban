export default class Task {
    #name;

    constructor(name) {
        this.#name = name.trim();
    }

    set name(name) {
        this.#name = name;
    }
}
