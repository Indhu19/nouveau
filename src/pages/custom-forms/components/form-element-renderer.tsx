import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';

import { FormElement, FormElementType, FormElementTypeToValue } from '../types/form-builder';

interface FormElementRendererProps<T extends FormElementType> {
  disabled?: boolean;
  element: FormElement & { type: T };
  onChange?: (value: FormElementTypeToValue<T>) => void;
  value?: FormElementTypeToValue<T>;
}

export function FormElementRenderer<T extends FormElementType>({
  disabled = false,
  element,
  onChange,
  value,
}: FormElementRendererProps<T>) {
  const [internalValue, setInternalValue] = useState<FormElementTypeToValue<T> | undefined>(value);

  const handleChange = (newValue: FormElementTypeToValue<T>) => {
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const currentValue = onChange ? value : internalValue;

  const renderElement = () => {
    const fieldId = `field-${element.id}`;

    switch (element.type) {
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={!!currentValue}
              disabled={disabled}
              id={fieldId}
              onCheckedChange={v => {
                handleChange(v as FormElementTypeToValue<T>);
              }}
            />
            <Label className="text-sm font-medium" htmlFor={fieldId}>
              {element.label}
            </Label>
          </div>
        );
      case 'checkboxGroup':
        return (
          <div className="space-y-3">
            {element.checkboxOptions?.map(option => {
              const isChecked = Array.isArray(currentValue)
                ? currentValue.includes(option.id)
                : false;
              return (
                <div className="flex items-center space-x-2" key={option.id}>
                  <Checkbox
                    checked={isChecked}
                    disabled={disabled}
                    id={`${fieldId}-${option.id}`}
                    onCheckedChange={(checked: boolean) => {
                      const selected = new Set(Array.isArray(currentValue) ? currentValue : []);
                      if (checked) selected.add(option.id);
                      else selected.delete(option.id);
                      handleChange(Array.from(selected) as FormElementTypeToValue<T>);
                    }}
                  />
                  <Label className="text-sm font-medium" htmlFor={`${fieldId}-${option.id}`}>
                    {option.label}
                    {option.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                </div>
              );
            })}
          </div>
        );
      case 'date':
        return (
          <Input
            className="w-full"
            disabled={disabled}
            id={fieldId}
            onChange={e => {
              handleChange(e.target.value as FormElementTypeToValue<T>);
            }}
            type="date"
            value={(currentValue as string) || ''}
          />
        );
      case 'email':
      case 'password':

      case 'text':
        return (
          <Input
            className="w-full"
            disabled={disabled}
            id={fieldId}
            onChange={e => {
              handleChange(e.target.value as FormElementTypeToValue<T>);
            }}
            placeholder={element.placeholder}
            type={element.type}
            value={(currentValue as string) || ''}
          />
        );

      case 'file': {
        const fileSettings = element.fileSettings;
        const acceptTypes =
          fileSettings?.allowedTypes === 'images'
            ? 'image/*'
            : '.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx';

        return (
          <div className="space-y-2">
            <Input
              accept={acceptTypes}
              className="w-full"
              disabled={disabled}
              id={fieldId}
              multiple={!!fileSettings?.maxFiles && fileSettings.maxFiles > 1}
              onChange={e => {
                const files = e.target.files;
                handleChange(
                  (files ? Array.from(files) : []) as unknown as FormElementTypeToValue<T>
                );
              }}
              type="file"
            />
            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
              {fileSettings?.allowedTypes && (
                <Badge className="text-xs" variant="secondary">
                  {fileSettings.allowedTypes === 'images' ? '🖼️ Images' : '📄 Documents'}
                </Badge>
              )}
              {fileSettings?.maxSize && (
                <Badge className="text-xs" variant="outline">
                  Max: {fileSettings.maxSize}MB
                </Badge>
              )}
              {fileSettings?.maxFiles && fileSettings.maxFiles > 1 && (
                <Badge className="text-xs" variant="outline">
                  Up to {fileSettings.maxFiles} files
                </Badge>
              )}
            </div>
          </div>
        );
      }
      case 'number':
        return (
          <Input
            className="w-full"
            disabled={disabled}
            id={fieldId}
            onChange={e => {
              handleChange(e.target.valueAsNumber as unknown as FormElementTypeToValue<T>);
            }}
            placeholder={element.placeholder}
            type="number"
            value={currentValue as number | undefined}
          />
        );
      case 'radio':
        return (
          <RadioGroup
            disabled={disabled}
            onValueChange={v => {
              handleChange(v as FormElementTypeToValue<T>);
            }}
            value={(currentValue as string) || ''}
          >
            {element.options?.map((option, index) => (
              <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem id={`${fieldId}-${index.toString()}`.toString()} value={option} />
                <Label className="text-sm font-medium" htmlFor={`${fieldId}-${index.toString()}`}>
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'select':
        return (
          <Select
            disabled={disabled}
            onValueChange={v => {
              handleChange(v as FormElementTypeToValue<T>);
            }}
            value={(currentValue as string) || ''}
          >
            <SelectTrigger className="w-full" id={fieldId}>
              <SelectValue placeholder={element.placeholder ?? 'Select an option'} />
            </SelectTrigger>
            <SelectContent>
              {element.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'textarea':
        return (
          <Textarea
            className="w-full resize-none"
            disabled={disabled}
            id={fieldId}
            onChange={e => {
              handleChange(e.target.value as FormElementTypeToValue<T>);
            }}
            placeholder={element.placeholder}
            value={(currentValue as string) || ''}
          />
        );
      default:
        return <div>Unknown element type</div>;
    }
  };

  return (
    <div>
      {element.type !== 'checkbox' && (
        <Label
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor={`field-${element.id}`}
        >
          {element.label}
          {element.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      {renderElement()}
    </div>
  );
}
