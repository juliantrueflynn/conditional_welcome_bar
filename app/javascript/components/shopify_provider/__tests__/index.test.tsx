import React from 'react';
import ShopifyProvider from '..';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

const originalEnv = process.env;
const originalLocation = window.location;

const stubbedWindowLocation = (): Location => ({
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
});

const stubbedWindowMatchMedia = (): void => {
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
  window.location = originalLocation;
});

it('renders child if apiKey and shopOrigin present', () => {
  delete window.location;
  stubbedWindowMatchMedia();
  window.location = stubbedWindowLocation();
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
