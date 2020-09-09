import React from 'react';
import { PolarisTestProvider } from '@shopify/polaris';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NetworkErrorState from '..';

const ACTION_BUTTON_TEXT = 'Reload this page';

const setupMockWindowReload = () => {
  Object.defineProperty(window, 'location', {
    value: { reload: jest.fn() },
  });
};

it('renders', () => {
  render(
    <PolarisTestProvider>
      <NetworkErrorState />
    </PolarisTestProvider>
  );

  expect(screen.getByText(ACTION_BUTTON_TEXT)).toBeInTheDocument();
  expect(
    screen.getByText('The page couldn’t be displayed due to a network issue.')
  ).toBeInTheDocument();
});

it('reloads on click', () => {
  setupMockWindowReload();
  render(
    <PolarisTestProvider>
      <NetworkErrorState />
    </PolarisTestProvider>
  );

  userEvent.click(screen.getByText(ACTION_BUTTON_TEXT));

  expect(window.location.reload).toHaveBeenCalledTimes(1);
});
