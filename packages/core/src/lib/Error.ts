export class EditableJSError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EditableJS - Error';
    }
}

export class InvalidTypeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EditableJS - InvalidType';
    }
}

export class MissingPropertyError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EditableJS - MissingProperty';
    }
}
