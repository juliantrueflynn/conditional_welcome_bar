import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const INITIAL_MODAL_BAR_ACTION_STATE = { type: '', title: '' };
const INITIAL_OVERLAY_STATE = Object.freeze({
  toggleModal: () => {},
  toggleToast: () => {},
  modalAction: INITIAL_MODAL_BAR_ACTION_STATE,
  toastContent: '',
});

export const OverlaysContext = createContext(INITIAL_OVERLAY_STATE);

const OverlaysContextProvider = ({ children }) => {
  const [toastContent, setToastContent] = useState('');
  const [modalAction, setModalAction] = useState(INITIAL_MODAL_BAR_ACTION_STATE);

  const handleToggleToast = (content = '') => {
    const message = content.length ? content : ''; // Ensure string to fix Shopify bug.
    setToastContent(message);
  };

  const handleModalToggle = (action) => {
    if (!action || !action.type) {
      return setModalAction(INITIAL_MODAL_BAR_ACTION_STATE);
    }

    setModalAction(action);
  };

  const contextValues = {
    toggleModal: handleModalToggle,
    toggleToast: handleToggleToast,
    toastContent,
    modalAction,
  };

  return <OverlaysContext.Provider value={contextValues}>{children}</OverlaysContext.Provider>;
};

OverlaysContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OverlaysContextProvider;
