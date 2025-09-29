export default class InvalidNameError extends Error {

    constructor(name) {
        super(`Name '${name}' is invalid`);
        this.name = this.constructor.name;
    }
}
