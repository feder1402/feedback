import {assert} from 'chai';

const testMachineConfig = {
  initial: 'question',
  states: {
    question: {
      on: {
        CLICK_BAD: 'form',
        CLICK_GOOD: 'thanks',
        CLOSE: 'closed'
      },
      meta: {
        // getByTestId, etc. will be passed into path.test(...) later.
        test: ({getByText}) => {
          assert.ok(getByText('How was your experience?'));
        }
      }
    },
    form: {
      on: {
        SUBMIT: 'thanks',
        CLOSE: 'closed'
      },
      meta: {
        test: ({getByText}) => {
          assert.ok(getByText('Care to tell us why?'));
        }
      }
    },
    thanks: {
      on: {
        CLOSE: 'closed'
      },
      meta: {
        test: ({getByText}) => {
          assert.ok(getByText('Thanks for your feedback.'));
        }
      }
    },
    closed: {
      meta: {
        test: () => {
          assert.ok(true);
        }
      }
    }
  }
};

export default testMachineConfig;
