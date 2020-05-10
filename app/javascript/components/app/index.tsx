import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from '../../utilities/graphql_utilities';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import OverlaysContextProvider from '../../contexts/overlays_context_provider';
import MissingPageView from '../missing_page_view';
import SingleBarView from '../single_bar_view';
import IndexBarsView from '../index_bars_view';
import BarModalManager from '../bar_modal_manager';

const App: React.FC = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <AppProvider i18n={enTranslations}>
        <OverlaysContextProvider>
          <BarModalManager />
          <Switch>
            <Route exact path="/" component={IndexBarsView} />
            <Route path="/bars/:barId" component={SingleBarView} />
            <Route component={MissingPageView} />
          </Switch>
        </OverlaysContextProvider>
      </AppProvider>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
