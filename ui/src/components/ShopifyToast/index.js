import React, { useContext } from 'react';
import { AlertsContext } from '../../contexts/AlertsContextProvider';
import { Toast } from '@shopify/polaris';

const ShopifyToast = () => {
  const { toastContent, toggleToast } = useContext(AlertsContext);

  return toastContent && <Toast content={toastContent} onDismiss={toggleToast} />;
};

export default ShopifyToast;
