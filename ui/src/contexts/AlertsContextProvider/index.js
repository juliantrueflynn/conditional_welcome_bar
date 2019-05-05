import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const ALERT_INITIAL_STATE = {
  toggleModal: () => {},
  toggleToast: () => {},
};

export const AlertsContext = createContext(ALERT_INITIAL_STATE);

const AlertsContextProvider = ({ children, toggleModal, toggleToast }) => (
  <AlertsContext.Provider value={{ toggleModal, toggleToast }}>{children}</AlertsContext.Provider>
);

AlertsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  toggleModal: PropTypes.func,
  toggleToast: PropTypes.func,
};

AlertsContextProvider.defaultProps = ALERT_INITIAL_STATE;

export default AlertsContextProvider;
