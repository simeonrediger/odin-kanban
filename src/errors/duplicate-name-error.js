export default class DuplicateNameError extends Error {

    constructor(name) {
        super(`Name '${name}' already exists`);
        this.name = this.constructor.name;
    }
}
