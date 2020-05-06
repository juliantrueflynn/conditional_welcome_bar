import React from 'react'
import PropTypes from 'prop-types'
import { AppProvider } from '@shopify/polaris'
import { shopOrigin } from '../../util/shopifyUtil'
import ShopifyLinkRouter from '../ShopifyLinkRouter'
import OverlaysContextProvider from '../../contexts/OverlaysContextProvider'
import ShopifyAppRouter from '../ShopifyAppRouter'
import BarModalManager from '../BarModalManager'
import ShopifyToast from '../ShopifyToast'

const ShopifyProvider = ({ children }) => {
  const { SHOPIFY_API_KEY } = process.env

  return (
    <AppProvider
      apiKey={SHOPIFY_API_KEY}
      shopOrigin={shopOrigin}
      linkComponent={ShopifyLinkRouter}
      forceRedirect
    >
      <OverlaysContextProvider>
        <ShopifyAppRouter />
        <BarModalManager />
        <ShopifyToast />
        {children}
      </OverlaysContextProvider>
    </AppProvider>
  )
}

ShopifyProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ShopifyProvider
