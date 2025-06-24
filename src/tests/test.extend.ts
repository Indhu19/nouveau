import { test as testBase } from 'vitest';

import { worker } from '@/tests/mocks/browser';

export const test = testBase.extend({
  worker: [
    async (_, use) => {
      // Start the worker before the test.
      await worker.start({
        onUnhandledRequest: 'error'
      });

      // Expose the worker object on the test's context.
      await use(worker);

      // Stop the worker after the test is done.
      worker.stop();
    },
    {
      auto: true
    }
  ]
});
