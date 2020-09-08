import React from 'react';
import ShopifyProvider from '..';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

const originalEnv = process.env;
const originalLocation = window.location;

const setupMockWindow = (): void => {
  Object.defineProperty(window, 'location', {
    value: {
      ...originalLocation,
      reload: jest.fn(),
      assign: jest.fn(),
    },
  });

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      matches: false,
      media: jest.fn(),
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

const setupCaseHtmlBody = (shopOrigin?: string): void => {
  document.body.innerHTML = `
    <div id="shopify-app-init" data-shop-origin="${shopOrigin || ''}"></div>
  `;
};

afterEach(() => {
  process.env = originalEnv;
});

it('renders child if apiKey and shopOrigin present', () => {
  setupMockWindow();
  process.env.SHOPIFY_API_KEY = 'SomeShopifyAPIKey';
  setupCaseHtmlBody('SomeShopOrigin');

  const { queryByTestId } = render(
    <MemoryRouter>
      <ShopifyProvider>
        <div data-testid="child" />
      </ShopifyProvider>
    </MemoryRouter>
  );
  const child = queryByTestId('child');

  expect(child).not.toBeNull();
});

it('does not render child if missing shopOrigin', () => {
  setupCaseHtmlBody();

  const { queryByTestId } = render(
    <MemoryRouter>
      <ShopifyProvider>
        <div data-testid="child" />
      </ShopifyProvider>
    </MemoryRouter>
  );
  const child = queryByTestId('child');

  expect(child).toBeNull();
});

it('does not render child if missing apiKey', () => {
  delete process.env.SHOPIFY_API_KEY;
  setupCaseHtmlBody('SomeShopOrigin');

  const { queryByTestId } = render(
    <MemoryRouter>
      <ShopifyProvider>
        <div data-testid="child" />
      </ShopifyProvider>
    </MemoryRouter>
  );
  const child = queryByTestId('child');

  expect(child).toBeNull();
});
