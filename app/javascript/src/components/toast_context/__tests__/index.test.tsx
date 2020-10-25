import React from 'react';
import ToastContextProvider, {useToastDispatchContext} from '..';
import {render, screen} from '@testing-library/react';
import {PolarisTestProvider, Frame} from '@shopify/polaris';
import userEvent from '@testing-library/user-event';

const MockButton = () => {
  const dispatch = useToastDispatchContext();

  return (
    <button
      data-testid="MockButton"
      onClick={() => dispatch({type: 'bar/destroy'})}
    >
      Click
    </button>
  );
};

it('renders toast message on dispatch', () => {
  render(
    <PolarisTestProvider>
      <Frame>
        <ToastContextProvider>
          <MockButton />
        </ToastContextProvider>
      </Frame>
    </PolarisTestProvider>
  );

  userEvent.click(screen.getByTestId('MockButton'));

  expect(screen.getByText('Welcome bar deleted')).toBeInTheDocument();
});
