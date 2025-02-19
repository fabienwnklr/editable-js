export class EditableJSError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EditableJS - Error';
    }
}

export class EditableJSInvalidType extends EditableJSError {
    constructor(message: string) {
        super(message);
        this.name = 'EditableJS - InvalidType';
    }
}
