import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';

interface SaveFormDialogProps {
  defaultDescription?: string;
  defaultName?: string;
  onOpenChange: (open: boolean) => void;
  onSave: (name: string, description?: string) => Promise<void>;
  open: boolean;
  saving: boolean;
}

export function SaveFormDialog({
  defaultDescription = '',
  defaultName = '',
  onOpenChange,
  onSave,
  open,
  saving,
}: SaveFormDialogProps) {
  const [name, setName] = useState(defaultName);
  const [description, setDescription] = useState(defaultDescription);

  useEffect(() => {
    if (open) {
      setName(defaultName);
      setDescription(defaultDescription);
    }
  }, [open, defaultName, defaultDescription]);

  const handleSave = async () => {
    if (name.trim()) {
      await onSave(name, description);
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Form</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="form-name">Form Name *</Label>
            <Input
              className="mt-1"
              id="form-name"
              onChange={e => {
                setName(e.target.value);
              }}
              placeholder="Enter form name"
              value={name}
            />
          </div>
          <div>
            <Label htmlFor="form-description">Description</Label>
            <Textarea
              className="mt-1"
              id="form-description"
              onChange={e => {
                setDescription(e.target.value);
              }}
              placeholder="Enter form description (optional)"
              value={description}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={saving}
            onClick={() => {
              onOpenChange(false);
            }}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            disabled={!name.trim() || saving}
            onClick={() => {
              void handleSave();
            }}
          >
            {saving ? 'Saving...' : 'Save Form'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
