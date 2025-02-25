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
  placeholder: string | null;
  restore: boolean | null;
  forceValidation: boolean | null;
};

