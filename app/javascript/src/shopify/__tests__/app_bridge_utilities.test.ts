import {getShopifyAppConfig} from '../app_bridge_utilities';

const originalEnv = process.env;

const setupExampleHtml = (shopOrigin: string) => {
  document.body.innerHTML = `
    <div id="shopify-app-init" data-shop-origin="${shopOrigin}"></div>
  `;
};

afterEach(() => {
  process.env = originalEnv;
});

describe('getShopifyAppConfig', () => {
  test('returns config object containing shop name', () => {
    const shopOrigin = 'example.myshopify.com';
    const apiKey = 'someApiKey';
    setupExampleHtml(shopOrigin);
    process.env.SHOPIFY_API_KEY = apiKey;

    const result = getShopifyAppConfig();

    expect(result).toEqual({shopOrigin, apiKey, forceRedirect: true});
  });

  test('returns null if missing shopOrigin', () => {
    const apiKey = 'someApiKey';
    setupExampleHtml('');
    process.env.SHOPIFY_API_KEY = apiKey;

    const result = getShopifyAppConfig();

    expect(result).toBeNull();
  });

  test('returns null if missing apiKey', () => {
    const shopOrigin = 'example.myshopify.com';
    setupExampleHtml(shopOrigin);
    delete process.env.SHOPIFY_API_KEY;

    const result = getShopifyAppConfig();

    expect(result).toBeNull();
  });
});
