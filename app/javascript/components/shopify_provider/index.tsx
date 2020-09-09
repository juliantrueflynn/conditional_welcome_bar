import React from 'react';
import {
  Provider,
  ClientRouter,
  RoutePropagator,
  Loading,
} from '@shopify/app-bridge-react';
import { AppProvider, Frame } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppConfig } from '@shopify/app-bridge';
import { useHistory, useLocation } from 'react-router-dom';

const getShopOrigin = (): string | null => {
  const appData = document.getElementById('shopify-app-init');

  return appData && appData.getAttribute('data-shop-origin');
};

type Props = {
  children: React.ReactNode;
};

const ShopifyProvider = ({ children }: Props) => {
  const location = useLocation();
  const history = useHistory();

  const config = {
    apiKey: process.env.SHOPIFY_API_KEY,
    shopOrigin: getShopOrigin(),
    forceRedirect: true,
  } as AppConfig;

  if (!config.apiKey || !config.shopOrigin) {
    return null;
  }

  return (
    <Provider config={config}>
      <AppProvider i18n={enTranslations}>
        <Frame>
          <ClientRouter history={history} />
          <RoutePropagator location={location} />
          <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
        </Frame>
      </AppProvider>
    </Provider>
  );
};

export default ShopifyProvider;
