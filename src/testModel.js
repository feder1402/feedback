import { Machine } from 'xstate';
import { createModel } from '@xstate/test';
import { fireEvent } from '@testing-library/react';
import testMachineConfig from './testMachineConfig'

const testMachine = Machine(testMachineConfig);

const testModel = createModel(testMachine).withEvents({
        // getByTestId, etc. will be passed into path.test(...) later.
        CLICK_GOOD: ({ getByText }) => {
            fireEvent.click(getByText('Good'));
        },
        CLICK_BAD: ({ getByText }) => {
            fireEvent.click(getByText('Bad'));
        },
        CLOSE: ({ getByTestId }) => {
            fireEvent.click(getByTestId('close-button'));
        },
        SUBMIT: {
            exec: async ({ getByTestId }, event) => {
                fireEvent.change(getByTestId('response-input'), {
                    target: { value: event.value }
                });
                fireEvent.click(getByTestId('submit-button'));
            },
            cases: [{ value: 'something' }, { value: '' }]
        }
    });

export default testModel;

