import React from 'react';
import NetworkErrorState from '..';
import { fireEvent, render } from '@testing-library/react';
import { PolarisTestProvider } from '@shopify/polaris';

const ACTION_BUTTON_TEXT = 'Reload this page';

const originalLocation = window.location;

const stubWindowLocation = () => {
  delete global.window.location;

  global.window.location = {
    ancestorOrigins: { length: 0 } as DOMStringList,
    assign: jest.fn(),
    hash: '',
    host: 'example.myshopify.com',
    hostname: 'example.myshopify.com',
    href: 'https://example.myshopify.com',
    origin: 'https://example.myshopify.com',
    pathname: '',
    port: '',
    protocol: 'https:',
    reload: jest.fn(),
    replace: jest.fn(),
    search: '',
  };
};

afterEach(() => {
  window.location = originalLocation;
});

it('renders', () => {
  const { getByText } = render(
    <PolarisTestProvider>
      <NetworkErrorState />
    </PolarisTestProvider>
  );

  const button = getByText(ACTION_BUTTON_TEXT);
  const heading = getByText(
    'The page couldn’t be displayed due to a network issue.'
  );

  expect(button).toBeInTheDocument();
  expect(heading).toBeInTheDocument();
});

it('reloads on click', () => {
  stubWindowLocation();
  jest.spyOn(window.location, 'reload');
  const { getByText } = render(
    <PolarisTestProvider>
      <NetworkErrorState />
    </PolarisTestProvider>
  );

  fireEvent.click(getByText(ACTION_BUTTON_TEXT));

  expect(window.location.reload).toHaveBeenCalled();
});
