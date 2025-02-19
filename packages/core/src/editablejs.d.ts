enum EditableJSEvent {
    UPDATE = 'update',
    RESTORE = 'restore',
}

type EditableJSAvailableTypes = 'text' | 'email' | 'password' | 'number' | 'date' | 'color' | 'time' | 'select' | 'textarea';



type EditableJSOptions = {
    type: EditableJSAvailableTypes;
    placeholder?: string;
    restore?: boolean;
    forceValidation?: boolean;
};
