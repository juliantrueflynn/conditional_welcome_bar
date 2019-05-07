import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const ALERT_INITIAL_STATE = Object.freeze({
  toggleModal: () => {},
  toggleToast: () => {},
  modalBarId: -1,
  toastContent: '',
});

export const AlertsContext = createContext(ALERT_INITIAL_STATE);

const AlertsContextProvider = ({ children }) => {
  const [toastContent, setToastContent] = useState('');
  const [modalBarId, setModalBarId] = useState(-1);

  const handleToggleToast = (content = '') => {
    const message = content.length ? content : ''; // Ensure string to fix Shopify bug.
    setToastContent(message);
  };

  const handleModalToggle = (barId) => setModalBarId(barId);

  const contextValues = {
    toggleModal: handleModalToggle,
    toggleToast: handleToggleToast,
    toastContent,
    modalBarId,
  };

  return <AlertsContext.Provider value={contextValues}>{children}</AlertsContext.Provider>;
};

AlertsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlertsContextProvider;
