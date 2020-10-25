import React from 'react';
import {Provider, ClientRouter, RoutePropagator, Loading} from '@shopify/app-bridge-react';
import {AppProvider, Frame} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import {useHistory, useLocation} from 'react-router-dom';
import {AppConfig} from '@shopify/app-bridge';
import ToastContextProvider from '../../components/toast_context';
import ApolloProvider from '../../components/apollo_provider';

type Props = {
  config: AppConfig;
  children: React.ReactNode;
};

const ShopifyProvider = ({config, children}: Props) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <AppProvider i18n={enTranslations}>
      <Provider config={config}>
        <ApolloProvider>
          <RoutePropagator location={location} />
          <ClientRouter history={history} />
          <Frame>
            <ToastContextProvider>
              <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
            </ToastContextProvider>
          </Frame>
        </ApolloProvider>
      </Provider>
    </AppProvider>
  );
};

export default ShopifyProvider;
