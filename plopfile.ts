import { NodePlopAPI } from 'plop';

export default function (plop: NodePlopAPI) {
  plop.setGenerator('page', {
    description: 'Generate a new React page with routing, store, and query setup',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Page name (e.g., Dashboard)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/pages/{{kebabCase name}}/Index.tsx',
        templateFile: 'templates/page/Index.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/pages/{{kebabCase name}}/routes.ts',
        templateFile: 'templates/page/routes.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/pages/{{kebabCase name}}/store.ts',
        templateFile: 'templates/page/store.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/pages/{{kebabCase name}}/queries.ts',
        templateFile: 'templates/page/queries.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/pages/{{kebabCase name}}/stories/Index.stories.tsx',
        templateFile: 'templates/page/Index.stories.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/pages/{{kebabCase name}}/tests/Index.test.tsx',
        templateFile: 'templates/page/Index.test.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/pages/{{kebabCase name}}/PageSkeleton.tsx',
        templateFile: 'templates/page/PageSkeleton.tsx.hbs',
      },
    ],
  });
}
