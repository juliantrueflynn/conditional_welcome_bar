import { createApp, ClientApplication } from '@shopify/app-bridge';

const getShopifyAppData = (): HTMLElement | null =>
  document.getElementById('shopify-app-init');

const getShopOrigin = (): string | null => {
  const shopifyAppData = getShopifyAppData();

  if (!shopifyAppData) {
    return null;
  }

  return shopifyAppData.getAttribute('data-shop-origin') || null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAppBridge = (): ClientApplication<any> | null => {
  const shopifyAppData = getShopifyAppData();
  const shopOrigin = getShopOrigin();
  const apiKey = shopifyAppData && shopifyAppData.getAttribute('data-api-key');

  if (!apiKey || !shopOrigin) {
    return null;
  }

  return createApp({ apiKey, shopOrigin });
};
