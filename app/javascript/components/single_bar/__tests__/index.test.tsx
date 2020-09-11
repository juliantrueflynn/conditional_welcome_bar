import React from 'react';
import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MockedProvider} from '@apollo/client/testing';
import {PolarisTestProvider} from '@shopify/polaris';
import {mockBarFields} from '../../../__mocks__/single_bar_mocks';
import SingleBar from '..';
import ToastContextProvider from '../../ToastContext';

const stubWindowScroll = () => {
  Object.defineProperty(window, 'scroll', {
    value: jest.fn(),
  });
};

it('triggers destroy modal on click', async () => {
  const confirmationText =
    'This will delete the current welcome bar and cannot be undone.';
  stubWindowScroll();
  render(
    <MockedProvider>
      <PolarisTestProvider>
        <ToastContextProvider>
          <SingleBar bar={mockBarFields} />
        </ToastContextProvider>
      </PolarisTestProvider>
    </MockedProvider>
  );

  expect(screen.queryByText(confirmationText)).not.toBeInTheDocument();

  userEvent.click(screen.getByText('Delete'));

  expect(await screen.findByText(confirmationText)).toBeInTheDocument();
});
