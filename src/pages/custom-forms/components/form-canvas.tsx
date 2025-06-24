import type React from 'react';

import { GripVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { FormElementRenderer } from '@/pages/custom-forms/components/form-element-renderer.tsx';

import { FormElement } from '../types/form-builder.ts';

interface FormCanvasProps {
  elements: FormElement[];
  onDrop: (targetIndex?: number) => void;
  onElementDelete: (elementId: string) => void;
  onElementReorder: (dragIndex: number, hoverIndex: number) => void;
  onElementSelect: (element: FormElement) => void;
  selectedElement: FormElement | null;
}

export function FormCanvas({
  elements,
  onDrop,
  onElementDelete,
  onElementReorder,
  onElementSelect,
  selectedElement,
}: FormCanvasProps) {
  const [dragOverIndex, setDragOverIndex] = useState<null | number>(null);
  const [draggedIndex, setDraggedIndex] = useState<null | number>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverIndex(null);

    const dropIndex = dragOverIndex ?? elements.length;
    onDrop(dropIndex);
  };

  const handleElementDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleElementDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleElementDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedIndex !== null && draggedIndex !== index) {
      onElementReorder(draggedIndex, index);
    }

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleFormAreaDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) {
      setDragOverIndex(index);
    }
  };

  const sortedElements = [...elements].sort((a, b) => a.order - b.order);

  return (
    <div className={`h-full overflow-y-auto`} onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="p-2">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Form Builder</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Drop zone at the beginning */}
              <div
                className={`h-2 rounded transition-all duration-200 ${
                  dragOverIndex === 0 ? 'bg-ring' : 'bg-transparent'
                }`}
                onDragOver={e => {
                  handleFormAreaDragOver(e, 0);
                }}
              />

              {sortedElements.length === 0 ? (
                <div className={`text-center py-12`}>
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-lg font-medium mb-2">Start Building Your Form</h3>
                  <p className="text-sm">Drag elements from the left panel to get started</p>
                </div>
              ) : (
                sortedElements.map((element, index) => (
                  <div key={element.id}>
                    <div
                      className={`group relative p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedElement?.id === element.id
                          ? 'border-blue-500'
                          : 'border hover:border-accent-foreground bg-card'
                      }`}
                      draggable
                      onClick={() => {
                        onElementSelect(element);
                      }}
                      onDragOver={e => {
                        handleElementDragOver(e, index);
                      }}
                      onDragStart={e => {
                        handleElementDragStart(e, index);
                      }}
                      onDrop={e => {
                        handleElementDrop(e, index);
                      }}
                    >
                      {/* Drag handle */}
                      <div
                        className={`absolute left-1 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab 
                      }`}
                      >
                        <GripVertical className="w-4 h-4" />
                      </div>

                      {/* Delete button */}
                      {selectedElement?.id === element.id && (
                        <Button
                          className="absolute -top-2 -right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={e => {
                            e.stopPropagation();
                            onElementDelete(element.id);
                          }}
                          size="sm"
                          variant="destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}

                      <div>
                        <FormElementRenderer element={element} />
                      </div>
                    </div>

                    {/* Drop zone between elements */}
                    <div
                      className={`h-2 rounded transition-all duration-200 ${
                        dragOverIndex === index + 1 ? 'bg-ring' : 'bg-transparent'
                      }`}
                      onDragOver={e => {
                        handleFormAreaDragOver(e, index + 1);
                      }}
                    />
                  </div>
                ))
              )}
            </CardContent>
            {/*<CardFooter className="flex justify-between">*/}
            {/*  <Button variant="outline" onClick={() => { console.log("Reset form"); }}>*/}
            {/*    Reset*/}
            {/*  </Button>*/}
            {/*  <Button onClick={() => { console.log("Form elements:", sortedElements); }}>Preview Submit</Button>*/}
            {/*</CardFooter>*/}
          </Card>
        </div>
      </div>
    </div>
  );
}
