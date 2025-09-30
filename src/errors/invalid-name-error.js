export default class InvalidNameError extends Error {

    constructor(name, className) {
        const errorMessage = className
            ? `${className} name is invalid: '${name}'`
            : `Name is invalid: '${name}'`;

        super(errorMessage);
        this.name = this.constructor.name;
    }
}
