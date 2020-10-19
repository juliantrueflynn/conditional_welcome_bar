import {AppConfig, ClientApplication, createApp} from '@shopify/app-bridge';

export const getShopOrigin = (): string | null => {
  const appData = document.getElementById('shopify-app-init');
  const shopOrigin = appData?.getAttribute('data-shop-origin');

  return shopOrigin || null;
};

export const getShopifyAppConfig = (): AppConfig | null => {
  const shopOrigin = getShopOrigin();
  const apiKey = process.env.SHOPIFY_API_KEY;

  if (!shopOrigin || !apiKey) {
    return null;
  }

  return {apiKey, shopOrigin};
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createShopifyAppBridge = (): ClientApplication<any> | null => {
  const config = getShopifyAppConfig();

  if (!config) {
    return null;
  }

  return createApp(config);
};

export * from '@shopify/app-bridge-utils';
