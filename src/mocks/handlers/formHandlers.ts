import { DefaultRequestMultipartBody, http, HttpResponse } from 'msw';

import { Form } from '@/pages/custom-forms/types/form-builder.ts';

const forms: Form[] = [
  {
    createdAt: '2025-06-12T02:35:26.296Z',
    elements: [
      {
        id: 'element-1749695694599',
        label: 'Text Field',
        order: 0,
        placeholder: 'Enter text',
        required: false,
        type: 'text',
      },
      {
        id: 'element-1749695712333',
        label: 'Password Field',
        order: 1,
        placeholder: 'Enter password',
        required: false,
        type: 'password',
      },
    ],
    id: 'form-1749695726296',
    name: 'TEst',
    updatedAt: '2025-06-12T02:35:26.297Z',
    url: '/forms/form-1749695726296',
  },
];
const submissions: {
  data:
    | boolean
    | DefaultRequestMultipartBody
    | null
    | number
    | Record<string, number>
    | string
    | undefined;
  formId: string;
  submittedAt: string;
}[] = [];

export const formHandlers = [
  /**
   * GET /api/forms
   * Returns all saved forms.
   */
  http.get('/api/forms', () => {
    return HttpResponse.json(forms);
  }),

  /**
   * GET /api/forms/:id
   * Returns a specific form by ID.
   */
  http.get('/api/forms/:id', ({ params }) => {
    console.log("mocking forms")
    const form = forms.find(f => f.id === params.id);
    if (!form) {
      return HttpResponse.json({ message: 'Form not found' }, { status: 404 });
    }
    return HttpResponse.json(form);
  }),

  /**
   * GET /api/forms/url/:url
   * Returns a specific form by URL.
   */
  http.get('/api/forms/url/:url', ({ params }) => {
    const urlPath = `/forms/${String(params.url)}`;
    const form = forms.find(f => f.url === urlPath);
    if (!form) {
      return HttpResponse.json({ message: 'Form not found' }, { status: 404 });
    }
    return HttpResponse.json(form);
  }),

  /**
   * POST /api/forms
   * Saves a new form.
   */
  http.post('/api/forms', async ({ request }) => {
    const body = (await request.json()) as Partial<Form>;
    const formId = `form-${Date.now().toString()}`;
    const newForm: Form = {
      createdAt: new Date().toISOString(),
      elements: body.elements ?? [],
      id: formId,
      name: body.name ?? 'Untitled Form',
      updatedAt: new Date().toISOString(),
      url: body.url ?? `/forms/${formId}`,
    };

    forms.push(newForm);
    return HttpResponse.json(newForm, { status: 201 });
  }),

  /**
   * DELETE /api/forms/:id
   * Deletes a form.
   */
  http.delete('/api/forms/:id', ({ params }) => {
    const index = forms.findIndex(f => f.id === params.id);
    if (index === -1) {
      return HttpResponse.json({ message: 'Form not found' }, { status: 404 });
    }
    forms.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),

  /**
   * POST /api/forms/:id/submit
   * Submits a filled form.
   */
  http.post('/api/forms/:id/submit', async ({ params, request }) => {
    const data:
      | boolean
      | DefaultRequestMultipartBody
      | null
      | number
      | Record<string, number>
      | string
      | undefined = await request.json();
    const submission = {
      data,
      formId: params.id as string,
      submittedAt: new Date().toISOString(),
    };
    submissions.push(submission);
    return HttpResponse.json({ message: 'Submission received' }, { status: 201 });
  }),
];
