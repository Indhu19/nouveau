// import { CheckCircle } from "lucide-react"
// import type React from "react"
//
// import { useState } from "react"
//
// import { toast } from "sonner"
// import { Alert, AlertDescription } from "@/components/ui/alert.tsx"
// import { Button } from "@/components/ui/button.tsx"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx"
//
// import { FormElementRenderer } from '@/pages/custom-forms/components/form-element-renderer.tsx';
// import { submitForm } from '@/pages/custom-forms/query.ts';
// import { FormElement } from '@/pages/custom-forms/types/form-builder.ts';
//
// interface FormRendererProps {
//   formId: string
//   formName: string
//   elements: FormElement[]
//   onSubmit?: (data: Record<string, any>) => void
// }
//
// export function FormRenderer({ formId, formName, elements, onSubmit }: FormRendererProps) {
//   const [formValues, setFormValues] = useState<Record<string, any>>({})
//   const [submitting, setSubmitting] = useState(false)
//   const [submitted, setSubmitted] = useState(false)
//   const [errors, setErrors] = useState<Record<string, string>>({})
//
//   const validateField = (element: FormElement, value: any): string | null => {
//     if (element.required && (!value || value.toString().trim() === "")) {
//       return "This field is required"
//     }
//
//     if (element.validation?.minLength && value && value.length < element.validation.minLength) {
//       return `Minimum length is ${element.validation.minLength} characters`
//     }
//
//     if (element.validation?.maxLength && value && value.length > element.validation.maxLength) {
//       return `Maximum length is ${element.validation.maxLength} characters`
//     }
//
//     if (element.validation?.pattern && value) {
//       const regex = new RegExp(element.validation.pattern)
//       if (!regex.test(value)) {
//         return "Invalid format"
//       }
//     }
//
//     return null
//   }
//
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setSubmitting(true)
//     setErrors({})
//
//     // Validate all fields
//     const newErrors: Record<string, string> = {}
//     elements.forEach((element) => {
//       const fieldId = `field-${element.id}`
//       const error = validateField(element, formValues[fieldId])
//       if (error) {
//         newErrors[fieldId] = error
//       }
//     })
//
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors)
//       setSubmitting(false)
//       return
//     }
//
//     try {
//       await submitForm(formId, formValues)
//       setSubmitted(true)
//       toast.success("Form submitted successfully!")
//       onSubmit?.(formValues)
//
//       // Reset success message after 3 seconds
//       setTimeout(() => { setSubmitted(false); }, 3000)
//     } catch (error) {
//       toast.error("Failed to submit form")
//       console.error("Submit error:", error)
//     } finally {
//       setSubmitting(false)
//     }
//   }
//
//   const handleReset = () => {
//     setFormValues({})
//     setErrors({})
//     setSubmitted(false)
//   }
//
//   const handleInputChange = (fieldId: string, value: any) => {
//     setFormValues((prev) => ({ ...prev, [fieldId]: value }))
//     // Clear error when user starts typing
//     if (errors[fieldId]) {
//       setErrors((prev) => ({ ...prev, [fieldId]: "" }))
//     }
//   }
//
//   // Sort elements by order
//   const sortedElements = [...elements].sort((a, b) => a.order - b.order)
//
//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <Card className="shadow-lg">
//         <CardHeader>
//           <CardTitle>{formName}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {submitted && (
//             <Alert className="mb-6 border-green-200 bg-green-50">
//               <CheckCircle className="h-4 w-4 text-green-600" />
//               <AlertDescription className="text-green-800">Form submitted successfully!</AlertDescription>
//             </Alert>
//           )}
//
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {sortedElements.map((element) => {
//               const fieldId = `field-${element.id}`
//
//               return (
//                 <div key={element.id} className="space-y-2">
//                   <FormElementRenderer
//                     element={element}
//                     value={formValues[fieldId]}
//                     onChange={(value) => { handleInputChange(fieldId, value); }}
//                   />
//                   {errors[fieldId] && <p className="text-sm text-red-500">{errors[fieldId]}</p>}
//                 </div>
//               )
//             })}
//           </form>
//         </CardContent>
//         <CardFooter className="flex justify-between">
//           <Button variant="outline" onClick={handleReset} type="button">
//             Reset
//           </Button>
//           <Button type="submit" form="form" disabled={submitting} onClick={handleSubmit}>
//             {submitting ? "Submitting..." : "Submit"}
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }
