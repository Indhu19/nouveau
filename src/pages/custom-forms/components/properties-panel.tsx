import { Plus, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Switch } from '@/components/ui/switch.tsx';

import { CheckboxOption, FormElement } from '../types/form-builder.ts';

interface PropertiesPanelProps {
  onElementUpdate: (element: FormElement) => void;
  selectedElement: FormElement | null;
}

export function PropertiesPanel({ onElementUpdate, selectedElement }: PropertiesPanelProps) {
  if (!selectedElement) {
    return (
      <div className="p-4">
        <h2 className={`text-lg font-semibold mb-4`}>Properties</h2>
        <div className={`text-center text-muted-foreground mt-8`}>
          <div className="text-4xl mb-4">⚙️</div>
          <p className="text-sm">Select an element to edit its properties</p>
        </div>
      </div>
    );
  }

  const handlePropertyChange = <K extends keyof FormElement>(
    property: K,
    value: FormElement[K]
  ) => {
    onElementUpdate({
      ...selectedElement,
      [property]: value,
    });
  };

  type ValidationKeys = keyof NonNullable<FormElement['validation']>;
  const handleValidationChange = <K extends ValidationKeys>(
    property: K,
    value: NonNullable<FormElement['validation']>[K]
  ) => {
    onElementUpdate({
      ...selectedElement,
      validation: {
        ...selectedElement.validation,
        [property]: value,
      },
    });
  };

  const handleFileSettingsChange = (property: string, value: number | string | undefined) => {
    onElementUpdate({
      ...selectedElement,
      fileSettings: {
        ...selectedElement.fileSettings,
        [property]: value,
      },
    });
  };

  const handleAddCheckboxOption = () => {
    const newOptions = [
      ...(selectedElement.checkboxOptions ?? []),
      {
        id: `option-${Date.now().toString()}`,
        label: `Option ${((selectedElement.checkboxOptions?.length ?? 0) + 1).toString()}`,
        required: false,
      },
    ];
    handlePropertyChange('checkboxOptions', newOptions);
  };

  const handleRemoveCheckboxOption = (index: number) => {
    const newOptions = selectedElement.checkboxOptions?.filter((_, i) => i !== index) ?? [];
    handlePropertyChange('checkboxOptions', newOptions);
  };

  const handleCheckboxOptionChange = (
    index: number,
    field: keyof CheckboxOption,
    value: boolean | string
  ) => {
    const newOptions = [...(selectedElement.checkboxOptions ?? [])];
    newOptions[index] = { ...newOptions[index], [field]: value };
    handlePropertyChange('checkboxOptions', newOptions);
  };

  const handleAddOption = () => {
    const newOptions = [
      ...(selectedElement.options ?? []),
      `Option ${((selectedElement.options?.length ?? 0) + 1).toString()}`,
    ];
    handlePropertyChange('options', newOptions);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = selectedElement.options?.filter((_, i) => i !== index) ?? [];
    handlePropertyChange('options', newOptions);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(selectedElement.options ?? [])];
    newOptions[index] = value;
    handlePropertyChange('options', newOptions);
  };

  const showOptions = selectedElement.type === 'select' || selectedElement.type === 'radio';
  const showCheckboxOptions = selectedElement.type === 'checkboxGroup';
  const showFileSettings = selectedElement.type === 'file';

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full">
      <h2 className={`text-lg font-bold`}>Properties</h2>

      {/* Basic Properties */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Basic Properties</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium" htmlFor="label">
              Label
            </Label>
            <Input
              className="mt-1"
              id="label"
              onChange={e => {
                handlePropertyChange('label', e.target.value);
              }}
              value={selectedElement.label}
            />
          </div>

          {selectedElement.type !== 'checkbox' &&
            selectedElement.type !== 'radio' &&
            selectedElement.type !== 'checkboxGroup' && (
              <div>
                <Label className="text-sm font-medium" htmlFor="placeholder">
                  Placeholder
                </Label>
                <Input
                  className="mt-1"
                  id="placeholder"
                  onChange={e => {
                    handlePropertyChange('placeholder', e.target.value);
                  }}
                  value={selectedElement.placeholder ?? ''}
                />
              </div>
            )}

          <div className="flex items-center space-x-2">
            <Switch
              checked={selectedElement.required ?? false}
              id="required"
              onCheckedChange={(checked: boolean) => {
                handlePropertyChange('required', checked);
              }}
            />
            <Label className="text-sm font-medium" htmlFor="required">
              Required
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Options */}
      {showOptions && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedElement.options?.map((option, index) => (
              <div className="flex items-center space-x-2" key={index}>
                <Input
                  className="flex-1"
                  onChange={e => {
                    handleOptionChange(index, e.target.value);
                  }}
                  value={option}
                />
                <Button
                  className="p-2"
                  disabled={selectedElement.options?.length === 1}
                  onClick={() => {
                    handleRemoveOption(index);
                  }}
                  size="sm"
                  variant="outline"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button className="w-full" onClick={handleAddOption} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Option
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Checkbox Group Options */}
      {showCheckboxOptions && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Checkbox Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedElement.checkboxOptions?.map((option, index) => (
              <div className="space-y-2 p-3 border rounded-lg" key={option.id}>
                <div className="flex items-center space-x-2">
                  <Input
                    className="flex-1"
                    onChange={e => {
                      handleCheckboxOptionChange(index, 'label', e.target.value);
                    }}
                    placeholder="Option label"
                    value={option.label}
                  />
                  <Button
                    className="p-2"
                    onClick={() => {
                      handleRemoveCheckboxOption(index);
                    }}
                    size="sm"
                    variant="outline"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={option.required ?? false}
                    id={`option-required-${index.toString()}`}
                    onCheckedChange={checked => {
                      handleCheckboxOptionChange(index, 'required', checked);
                    }}
                  />
                  <Label className="text-xs" htmlFor={`option-required-${index.toString()}`}>
                    Required
                  </Label>
                </div>
              </div>
            ))}
            <Button
              className="w-full"
              onClick={handleAddCheckboxOption}
              size="sm"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Checkbox Option
            </Button>
          </CardContent>
        </Card>
      )}

      {/* File Upload Settings */}
      {showFileSettings && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">File Upload Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium" htmlFor="maxSize">
                Max File Size (MB)
              </Label>
              <Input
                className="mt-1"
                id="maxSize"
                max="100"
                min="1"
                onChange={e => {
                  handleFileSettingsChange('maxSize', Number.parseInt(e.target.value) || undefined);
                }}
                type="number"
                value={selectedElement.fileSettings?.maxSize ?? ''}
              />
            </div>

            <div>
              <Label className="text-sm font-medium" htmlFor="maxFiles">
                Max Number of Files
              </Label>
              <Input
                className="mt-1"
                id="maxFiles"
                max="10"
                min="1"
                onChange={e => {
                  handleFileSettingsChange(
                    'maxFiles',
                    Number.parseInt(e.target.value) || undefined
                  );
                }}
                type="number"
                value={selectedElement.fileSettings?.maxFiles ?? ''}
              />
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Allowed File Types</Label>
              <div className="flex gap-2">
                <Badge
                  className="cursor-pointer"
                  onClick={() => {
                    handleFileSettingsChange('allowedTypes', 'documents');
                  }}
                  variant={
                    selectedElement.fileSettings?.allowedTypes === 'documents'
                      ? 'default'
                      : 'outline'
                  }
                >
                  📄 Documents
                </Badge>
                <Badge
                  className="cursor-pointer"
                  onClick={() => {
                    handleFileSettingsChange('allowedTypes', 'images');
                  }}
                  variant={
                    selectedElement.fileSettings?.allowedTypes === 'images' ? 'default' : 'outline'
                  }
                >
                  🖼️ Images
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Validation */}
      {(selectedElement.type === 'text' ||
        selectedElement.type === 'textarea' ||
        selectedElement.type === 'email') && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Validation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium" htmlFor="minLength">
                Min Length
              </Label>
              <Input
                className="mt-1"
                id="minLength"
                onChange={e => {
                  const val = e.target.value;
                  handleValidationChange('minLength', val ? Number(val) : undefined);
                }}
                type="number"
                value={selectedElement.validation?.minLength ?? ''}
              />
            </div>
            <div>
              <Label className="text-sm font-medium" htmlFor="maxLength">
                Max Length
              </Label>
              <Input
                className="mt-1"
                id="maxLength"
                onChange={e => {
                  const val = e.target.value;
                  handleValidationChange('maxLength', val ? Number(val) : undefined);
                }}
                type="number"
                value={selectedElement.validation?.maxLength ?? ''}
              />
            </div>
            <div>
              <Label className="text-sm font-medium" htmlFor="pattern">
                Pattern (Regex)
              </Label>
              <Input
                className="mt-1"
                id="pattern"
                onChange={e => {
                  handleValidationChange('pattern', e.target.value);
                }}
                placeholder="^[a-zA-Z0-9]+$"
                value={selectedElement.validation?.pattern ?? ''}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
