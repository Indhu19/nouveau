import {
  Calendar,
  Copy,
  FileText,
  Link,
  Search,
  Trash2
} from "lucide-react"
import { useMemo, useState } from "react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useDeleteForm, useForms } from "@/pages/custom-forms/query.ts"

interface FormManagerProps {
  onLoadForm: (formId: string) => void
  onOpenChange: (open: boolean) => void
  open: boolean
}

export function FormManager({ onLoadForm, onOpenChange, open }: FormManagerProps) {
  const { data: forms = [], isLoading } = useForms()
  const { isPending: isDeleting, mutate: deleteForm } = useDeleteForm()
  const [searchTerm, setSearchTerm] = useState("")

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString()

  const filteredForms = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return forms.filter(form => form.name.toLowerCase().includes(term))
  }, [forms, searchTerm])

  return (
    <>
      <Dialog onOpenChange={onOpenChange} open={open}>
        <DialogContent className="w-[90vw] max-w-6xl max-h-[85vh] p-6">
          <DialogHeader>
            <DialogTitle>Saved Forms</DialogTitle>
          </DialogHeader>

          <div className="flex items-center mb-4">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <Input
              className="w-full"
              onChange={e => {
                setSearchTerm(e.target.value);
              }}
              placeholder="Search by form name..."
              value={searchTerm}
            />
          </div>

          <div className="overflow-y-auto pr-1" style={{ maxHeight: 'calc(85vh - 150px)' }}>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-sm text-gray-500">Loading forms...</div>
              </div>
            ) : filteredForms.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No matching forms</h3>
                <p className="text-sm text-gray-500">Try a different search term.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {filteredForms.map(form => (
                  <Card className="hover:shadow-md transition-shadow" key={form.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{form.name}</CardTitle>
                          {form.description && (
                            <p className="text-sm text-gray-600 mt-1">{form.description}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={() => {
                              onLoadForm(form.id);
                            }}
                            size="sm"
                            variant="outline"
                          >
                            Load
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button disabled={isDeleting} size="sm" variant="outline">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure you want to delete "{form.name}"?
                                </AlertDialogTitle>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  disabled={isDeleting}
                                  onClick={() => {
                                    deleteForm(form.id);
                                  }}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-col gap-2 text-sm text-gray-500">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Badge variant="secondary">
                              {form.elements.length}
                              {"element"}
                              {form.elements.length !== 1 ? 's' : ''}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>Created {formatDate(form.createdAt)}</span>
                            </div>
                          </div>
                        </div>

                        {form.url && (
                          <div className="flex items-center justify-between mt-2 p-2 bg-gray-50 rounded-md">
                            <div className="flex items-center space-x-2 overflow-hidden">
                              <Link className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate text-xs">
                                {window.location.origin}/forms/{form.id}
                              </span>
                            </div>
                            <Button
                              className="h-6 w-6 p-0"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  `${window.location.origin}/forms/${form.id}`
                                );
                                toast.success('Form URL copied to clipboard');
                              }}
                              size="sm"
                              variant="ghost"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
