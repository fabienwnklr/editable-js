enum EditableJSEvent {
  UPDATE = 'update',
  RESTORE = 'restore',
}

type EditableJSAvailableTypes =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'date'
  | 'color'
  | 'time'
  | 'select'
  | 'textarea';

interface EditableJSOptions {
  type: EditableJSAvailableTypes;
  placeholder: string | undefined;
  restore: boolean | undefined;
  forceValidation: boolean | undefined;
};

