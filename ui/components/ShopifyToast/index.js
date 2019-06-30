import React, { useContext } from 'react';
import { OverlaysContext } from '../../contexts/OverlaysContextProvider';
import { Toast } from '@shopify/polaris';

const ShopifyToast = () => {
  const { toastContent, toggleToast } = useContext(OverlaysContext);

  return toastContent && <Toast content={toastContent} onDismiss={toggleToast} />;
};

export default ShopifyToast;
