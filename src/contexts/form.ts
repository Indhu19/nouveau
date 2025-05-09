import * as React from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';

export interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

export interface FormItemContextValue {
  id: string;
}

export const FormFieldContext = React.createContext<FormFieldContextValue | undefined>(undefined);
export const FormItemContext = React.createContext<FormItemContextValue | undefined>(undefined);
