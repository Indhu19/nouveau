import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formViewRoute} from '@/routes/standalone.ts';

import { fetchForm, submitForm } from '../query';
import { Form, FormElement, FormElementValue } from '../types/form-builder';
import { FormElementRenderer } from './form-element-renderer';

export function FormView() {
  
  const { t } = useTranslation();
  const params: {"formId": string } = formViewRoute.useParams();
  console.log('formId', params.formId);
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [formValues, setFormValues] = useState<Record<string, FormElementValue>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadForm = async () => {
      try {
        setLoading(true);

        // try {
        //   const formData = await fetchFormByUrl(formId);
        //   setForm(formData);
        //   setError(null);
        //   return;
        // } catch (urlErr) {
        //   console.log('Form not found by URL, trying by ID...', urlErr);
        // }

        const formData = await fetchForm(params.formId);
        setForm(formData);
        setError(null);
      } catch (err) {
        setError("Failed to load form. It may have been deleted or doesn't exist.");
        console.error('Error loading form:', err);
      } finally {
        setLoading(false);
      }
    };

    void loadForm();
  }, [params.formId]);

  const validateField = (element: FormElement, value: unknown): null | string => {
    if (element.required) {
      switch (element.type) {
        case 'checkbox':
          if (typeof value !== 'boolean' || !value) return 'This field is required';
          break;
        case 'checkboxGroup':
          if (!Array.isArray(value) || value.length === 0)
            return 'At least one option must be selected';
          break;
        case 'file':
          if (!value || (value instanceof File && value.size === 0)) return 'File is required';
          break;
        default:
          if (typeof value !== 'string' || value.trim() === '') return 'This field is required';
      }
    }

    if (typeof value === 'string') {
      if (element.validation?.minLength && value.length < element.validation.minLength) {
        return `Minimum length is ${element.validation.minLength.toString()} characters`;
      }

      if (element.validation?.maxLength && value.length > element.validation.maxLength) {
        return `Maximum length is ${element.validation.maxLength.toString()} characters`;
      }

      if (element.validation?.pattern) {
        const regex = new RegExp(element.validation.pattern);
        if (!regex.test(value)) {
          return 'Invalid format';
        }
      }
    }

    return null;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setValidationErrors({});

    if (!form) return;

    const newErrors: Record<string, string> = {};
    form.elements.forEach(element => {
      const fieldId = `field-${element.id}`;
      const error = validateField(element, formValues[fieldId]);
      if (error) {
        newErrors[fieldId] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      setSubmitting(false);
      return;
    }

    try {
      const submitId = form.id;
      await submitForm(submitId, formValues);
      setSubmitted(true);
      toast.success('Form submitted successfully!');

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      toast.error('Failed to submit form');
      console.error('Submit error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormValues({});
    setValidationErrors({});
    setSubmitted(false);
  };

  const handleInputChange = (fieldId: string, value: FormElementValue) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }));
    if (validationErrors[fieldId]) {
      setValidationErrors(prev => ({ ...prev, [fieldId]: '' }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading form...</p>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-bold mb-2">{t("Error")}</h2>
        <p>{error ?? 'Form not found'}</p>
      </div>
    );
  }

  const sortedElements = [...form.elements].sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{form.name}</CardTitle>
          {form.description && <p className="text-sm text-gray-600">{form.description}</p>}
        </CardHeader>
        <CardContent>
          {submitted && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                {t("form.submission.success")}
              </AlertDescription>
            </Alert>
          )}

          <form
            className="space-y-6"
            id="form"
            onSubmit={e => {
              e.preventDefault();
              void handleSubmit();
            }}
          >
            {sortedElements.map(element => {
              const fieldId = `field-${element.id}`;

              return (
                <div className="space-y-2" key={element.id}>
                  <FormElementRenderer
                    element={element}
                    onChange={value => {
                      handleInputChange(fieldId, value);
                    }}
                    value={formValues[fieldId]}
                  />
                  {validationErrors[fieldId] && (
                    <p className="text-sm text-red-500">{validationErrors[fieldId]}</p>
                  )}
                </div>
              );
            })}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleReset} type="button" variant="outline">
            {t("Reset")}
          </Button>
          <Button disabled={submitting} form="form" type="submit">
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}