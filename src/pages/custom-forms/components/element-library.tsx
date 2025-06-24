import type React from 'react';

import {
  Calendar,
  CheckSquare,
  ChevronDown,
  Circle,
  FileText,
  Hash,
  List,
  Lock,
  Mail,
  Type,
  Upload,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Card } from '@/components/ui/card.tsx';

import { FormElementTemplate, FormElementType } from '../types/form-builder.ts';

const elementTemplates: FormElementTemplate[] = [
  {
    defaultProps: {
      placeholder: 'Enter text',
    },
    icon: 'Type',
    label: 'Text Input',
    type: 'text',
  },
  {
    defaultProps: {
      placeholder: 'Enter email',
    },
    icon: 'Mail',
    label: 'Email Input',
    type: 'email',
  },
  {
    defaultProps: {
      placeholder: 'Enter password',
    },
    icon: 'Lock',
    label: 'Password Input',
    type: 'password',
  },
  {
    defaultProps: {
      placeholder: 'Enter text',
    },
    icon: 'FileText',
    label: 'Textarea',
    type: 'textarea',
  },
  {
    defaultProps: {
      options: ['Option 1', 'Option 2', 'Option 3'],
    },
    icon: 'ChevronDown',
    label: 'Select Dropdown',
    type: 'select',
  },
  {
    defaultProps: {},
    icon: 'CheckSquare',
    label: 'Checkbox',
    type: 'checkbox',
  },
  {
    defaultProps: {
      checkboxOptions: [
        { id: 'option-1', label: 'Option 1', required: false },
        { id: 'option-2', label: 'Option 2', required: false },
      ],
    },
    icon: 'List',
    label: 'Checkbox Group',
    type: 'checkboxGroup',
  },
  {
    defaultProps: {
      options: ['Option 1', 'Option 2'],
    },
    icon: 'Circle',
    label: 'Radio Group',
    type: 'radio',
  },
  {
    defaultProps: {
      placeholder: 'Enter number',
    },
    icon: 'Hash',
    label: 'Number Input',
    type: 'number',
  },
  {
    defaultProps: {},
    icon: 'Calendar',
    label: 'Date Input',
    type: 'date',
  },
  {
    defaultProps: {
      fileSettings: {
        allowedTypes: 'documents',
        maxFiles: 1,
        maxSize: 10,
      },
    },
    icon: 'Upload',
    label: 'File Upload',
    type: 'file',
  },
];

const iconMap = {
  Calendar,
  CheckSquare,
  ChevronDown,
  Circle,
  FileText,
  Hash,
  List,
  Lock,
  Mail,
  Type,
  Upload,
};

interface ElementLibraryProps {
  onDragStart: (elementType: FormElementType) => void;
}

export function ElementLibrary({ onDragStart }: ElementLibraryProps) {
  const handleDragStart = (e: React.DragEvent, elementType: FormElementType) => {
    e.dataTransfer.setData('text/plain', elementType);
    onDragStart(elementType);
  };
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <h2 className={`text-lg font-semibold text-foreground) mb-4`}>{t("form.elements")}</h2>
      <div className="space-y-2">
        {elementTemplates.map(template => {
          const IconComponent = iconMap[template.icon as keyof typeof iconMap];
          return (
            <Card
              className={`p-3 cursor-grab transition-colors hover:border-primary`}
              draggable
              key={template.type}
              onDragStart={e => {
                handleDragStart(e, template.type);
              }}
            >
              <div className="flex items-center space-x-2">
                <IconComponent className={`w-5 h-5 text-muted-foreground)]`} />
                <span className={`text-sm font-medium text-muted-foreground)]`}>
                  {template.label}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
