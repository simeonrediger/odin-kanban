export default class DuplicateNameError extends Error {

    constructor(name) {
        super(`Name '${name}' is already in use`);
        this.name = this.constructor.name;
    }
}
