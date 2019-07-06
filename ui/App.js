import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import IndexBarsView from './views/IndexBarsView'
import SingleBarView from './views/SingleBarView'
import ShopifyProvider from './components/ShopifyProvider'
import MissingPageView from './views/MissingPageView'

const App = () => {
  const client = new ApolloClient({
    uri: process.env.GRAPHQL_API_URL,
    credentials: 'include',
    request: operation => {
      const csrfMetaTag = document.querySelector('meta[name=csrf-token]')

      if (!csrfMetaTag) {
        return
      }

      operation.setContext({
        headers: {
          'X-CSRF-Token': csrfMetaTag.getAttribute('content'),
        },
      })
    },
  })

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ShopifyProvider>
          <Switch>
            <Route exact path="/" component={IndexBarsView} />
            <Route path="/bars/:barId" component={SingleBarView} />
            <Route component={MissingPageView} />
          </Switch>
        </ShopifyProvider>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
