export interface CheckboxOption {
  id: string;
  label: string;
  required?: boolean;
}

export interface Form {
  createdAt: string;
  description?: string;
  elements: FormElement[];
  id: string;
  name: string;
  updatedAt: string;
  url?: string;
}

export interface FormElement {
  checkboxOptions?: CheckboxOption[];
  fileSettings?: {
    allowedTypes?: 'documents' | 'images';
    maxFiles?: number;
    maxSize?: number;
  };
  id: string;
  label: string;
  options?: string[];
  order: number;
  placeholder?: string;
  required?: boolean;
  size?: {
    height?: number;
    width?: number;
  };
  type: FormElementType;
  validation?: {
    maxLength?: number;
    minLength?: number;
    pattern?: string;
  };
}

export interface FormElementTemplate {
  defaultProps: Partial<FormElement>;
  icon: string;
  label: string;
  type: FormElementType;
}

export type FormElementType =
  | 'checkbox'
  | 'checkboxGroup'
  | 'date'
  | 'email'
  | 'file'
  | 'number'
  | 'password'
  | 'radio'
  | 'select'
  | 'text'
  | 'textarea';
export type FormElementTypeToValue<T extends FormElementType> = FormElementValueMap[T];

export type FormElementValue = FormElementValueMap[FormElementType];

export interface FormElementValueMap {
  checkbox: boolean;
  checkboxGroup: string[];
  date: string;
  email: string;
  file: File | null;
  number: string;
  password: string;
  radio: string;
  select: string;
  text: string;
  textarea: string;
}

export interface FormInput {
  description?: string;
  elements: FormElement[];
  name: string;
  url?: string;
}

export interface FormSubmission {
  data: Record<string, number>;
  formId: string;
  submittedAt: string;
}
