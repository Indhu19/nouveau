import * as React from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { FormFieldContext, FormItemContext } from '@/contexts/form.ts';

export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const itemContext = React.useContext(FormItemContext);
  if (!itemContext) {
    throw new Error('useFormField should be used within <FormItem>');
  }

  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};
