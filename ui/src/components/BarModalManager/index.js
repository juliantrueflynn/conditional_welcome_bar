import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { matchPath } from 'react-router';
import PropTypes from 'prop-types';
import { Modal } from '@shopify/polaris';
import { apiDestroy } from '../../util/apiUtil';
import { OverlaysContext } from '../../contexts/OverlaysContextProvider';

const BarModalManager = ({ history, location }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toggleModal, toggleToast, modalAction } = useContext(OverlaysContext);

  const match = matchPath(location.pathname, {
    path: '/bars/:barId',
  });

  const handleDestroyClick = () => {
    setIsUpdating(true);

    apiDestroy(`bars/${match.params.barId}`).then(() => {
      toggleModal();
      toggleToast('Welcome bar deleted');
      history.push({ pathname: '/', search: location.search });
    });
  };

  const onAction = () => {
    if (modalAction.type === 'delete') {
      return handleDestroyClick();
    }

    modalAction.onAction();
    toggleModal();
  };

  const capitalizeFirstLetter = () =>
    modalAction.type.charAt(0).toUpperCase() + modalAction.type.slice(1);

  const isOpen = !!modalAction.type;
  const primaryAction = {
    content: capitalizeFirstLetter(),
    onAction,
    loading: isUpdating,
    destructive: true,
  };
  const secondaryAction = [{ content: 'Close', onAction: toggleModal }];

  return (
    <Modal
      open={isOpen}
      onClose={toggleModal}
      title={modalAction.title}
      message={modalAction.message}
      primaryAction={primaryAction}
      secondaryActions={secondaryAction}
    />
  );
};

BarModalManager.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(BarModalManager);
