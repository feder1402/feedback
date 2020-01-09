import React from 'react';
import App from './App';
import { render, cleanup } from '@testing-library/react';
import testModel from './testModel'

describe('feedback app', () => {
  const testPlans = testModel.getSimplePathPlans();
  testPlans.forEach(plan => {
    describe(plan.description, () => {
      afterEach(cleanup);
      plan.paths.forEach(path => {
        it(path.description, () => {
          const rendered = render(<App />);
          return path.test(rendered);
        });
      });
    });
  });

  it('coverage', () => {
    testModel.testCoverage();
  });
});
