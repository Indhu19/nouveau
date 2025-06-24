import { createLazyRoute } from '@tanstack/react-router';
import { Copy, FolderOpen, Link, Plus, Save } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button.tsx';
import { ElementLibrary } from '@/pages/custom-forms/components/element-library.tsx';
import { FormCanvas } from '@/pages/custom-forms/components/form-canvas.tsx';
import { FormManager } from '@/pages/custom-forms/components/form-manager.tsx';
import { PropertiesPanel } from '@/pages/custom-forms/components/properties-panel.tsx';
import { SaveFormDialog } from '@/pages/custom-forms/components/save-form-dialog.tsx';

import type { FormElement, FormElementType } from '../types/form-builder.ts';

import { fetchForm, useCreateForm } from '../query.ts';

export default function FormBuilder() {
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<FormElement | null>(null);
  const [draggedElementType, setDraggedElementType] = useState<FormElementType | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showFormManager, setShowFormManager] = useState(false)
  const [currentFormId, setCurrentFormId] = useState<null | string>(null);
  const [currentFormName, setCurrentFormName] = useState<string>('');
  const { isPending: isSaving, mutateAsync: saveFormMutation } = useCreateForm();

  const handleDragStart = useCallback((elementType: FormElementType) => {
    setDraggedElementType(elementType);
  }, []);

  const handleDrop = useCallback(
    (targetIndex?: number) => {
      if (!draggedElementType) return;

      const newElement: FormElement = {
        id: `element-${Date.now().toString()}`,
        label: `${draggedElementType.charAt(0).toUpperCase() + draggedElementType.slice(1)} Field`,
        order: targetIndex ?? formElements.length,
        placeholder: `Enter ${draggedElementType}`,
        required: false,
        type: draggedElementType,
        ...(draggedElementType === 'select' || draggedElementType === 'radio'
          ? { options: ['Option 1', 'Option 2'] }
          : {}),
        ...(draggedElementType === 'checkboxGroup'
          ? {
              checkboxOptions: [
                { id: `option-${Date.now().toString()}-1`, label: 'Option 1', required: false },
                { id: `option-${Date.now().toString()}-2`, label: 'Option 2', required: false },
              ],
            }
          : {}),
        ...(draggedElementType === 'file'
          ? {
              fileSettings: {
                allowedTypes: 'documents' as const,
                maxFiles: 1,
                maxSize: 10,
              },
            }
          : {}),
      };

      if (targetIndex !== undefined) {
        const updatedElements = [...formElements];
        updatedElements.splice(targetIndex, 0, newElement);
        updatedElements.forEach((el, index) => {
          el.order = index;
        });
        setFormElements(updatedElements);
      } else {
        setFormElements(prev => [...prev, newElement]);
      }

      setSelectedElement(newElement);
      setDraggedElementType(null);
    },
    [draggedElementType, formElements]
  );

  const handleElementSelect = useCallback((element: FormElement) => {
    setSelectedElement(element);
  }, []);

  const handleElementUpdate = useCallback((updatedElement: FormElement) => {
    setFormElements(prev => prev.map(el => (el.id === updatedElement.id ? updatedElement : el)));
    setSelectedElement(updatedElement);
  }, []);

  const handleElementDelete = useCallback((elementId: string) => {
    setFormElements(prev => {
      const filtered = prev.filter(el => el.id !== elementId);
      return filtered.map((el, index) => ({ ...el, order: index }));
    });
    setSelectedElement(null);
  }, []);

  const handleElementReorder = useCallback((dragIndex: number, hoverIndex: number) => {
    setFormElements(prev => {
      const draggedElement = prev[dragIndex];
      const newElements = [...prev];
      newElements.splice(dragIndex, 1);
      newElements.splice(hoverIndex, 0, draggedElement);
      return newElements.map((el, index) => ({ ...el, order: index }));
    });
  }, []);

  const handleSaveForm = async (name: string, description?: string) => {
    if (formElements.length === 0) {
      toast.error('Cannot save an empty form');
      return;
    }
    const result = await saveFormMutation({
      description,
      elements: formElements,
      name,
    });

    setCurrentFormId(result.id);
    setCurrentFormName(name);
    setShowSaveDialog(false);
    toast.success('Form saved successfully!');
  };

    const handleLoadForm = async (formId: string) => {
    try {
      console.log("Loading form", formId)
      const form = await fetchForm(formId)
      setFormElements(form.elements)
      setCurrentFormId(form.id)
      setCurrentFormName(form.name)
      setSelectedElement(null)
      setShowFormManager(false)
      toast.success(`Loaded form: ${form.name}`)
    } catch (error) {
      toast.error("Failed to load form")
      console.error("Load error:", error)
    }
  }

  const handleNewForm = () => {
    setFormElements([]);
    setSelectedElement(null);
    setCurrentFormId(null);
    setCurrentFormName('');
    toast.success('Started new form');
  };

  return (
    <div className={`flex h-screen`}>
      {/* Left Panel - Element Library */}
      <div className={`w-64 border-r flex-shrink-0`}>
        <ElementLibrary onDragStart={handleDragStart} />
      </div>

      {/* Middle Panel - Form Canvas */}
      <div className="flex-1 flex flex-col">
        <div className={`border-b p-4`}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-xl font-semibold `}>{currentFormName || 'Form Builder'}</h1>
              <p className={`text-sm`}>
                {currentFormId
                  ? 'Editing saved form'
                  : 'Drag elements from the left panel to build your form'}
              </p>
              {/*{currentFormId && (*/}
              {/*  <div className="flex items-center mt-2 p-2 rounded-md max-w-md">*/}
              {/*    <div className="flex items-center space-x-2 overflow-hidden flex-1">*/}
              {/*      <Link className="w-4 h-4 flex-shrink-0 text-blue-500" />*/}
              {/*      <span className="truncate text-xs">*/}
              {/*        {window.location.origin}/forms/{currentFormId}*/}
              {/*      </span>*/}
              {/*    </div>*/}
              {/*    <Button*/}
              {/*      className="h-6 w-6 p-0 ml-2"*/}
              {/*      onClick={() => {*/}
              {/*        navigator.clipboard.writeText(`${window.location.origin}/forms/${currentFormId}`);*/}
              {/*        toast.success('Form URL copied to clipboard');*/}
              {/*      }}*/}
              {/*      size="sm"*/}
              {/*    >*/}
              {/*      <Copy className="w-4 h-4" />*/}
              {/*    </Button>*/}
              {/*  </div>*/}
              {/*)}*/}
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={handleNewForm} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
              <Button onClick={() => { setShowFormManager(true); }} size="sm" variant="outline">
                <FolderOpen className="w-4 h-4 mr-2" />
                Load
              </Button>
              <Button
                disabled={formElements.length === 0 || isSaving}
                onClick={() => {
                  setShowSaveDialog(true);
                }}
                size="sm"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <FormCanvas
            elements={formElements}
            onDrop={handleDrop}
            onElementDelete={handleElementDelete}
            onElementReorder={handleElementReorder}
            onElementSelect={handleElementSelect}
            selectedElement={selectedElement}
          />
        </div>
      </div>

      {/* Right Panel - Properties */}
      <div className={`w-80 border-l flex-shrink-0`}>
        <PropertiesPanel onElementUpdate={handleElementUpdate} selectedElement={selectedElement} />
      </div>

      {/* Dialogs */}
      <SaveFormDialog
        defaultName={currentFormName}
        onOpenChange={setShowSaveDialog}
        onSave={handleSaveForm}
        open={showSaveDialog}
        saving={isSaving}
      />

      <FormManager onLoadForm={handleLoadForm} onOpenChange={setShowFormManager} open={showFormManager} />
    </div>
  );
}

export const Route = createLazyRoute('/form-builder')({
  component: FormBuilder
});