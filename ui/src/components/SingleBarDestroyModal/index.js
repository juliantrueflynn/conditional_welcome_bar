import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal } from '@shopify/polaris';
import { apiDestroy } from '../../util/apiUtil';
import { AlertsContext } from '../../contexts/AlertsContextProvider';

const SingleBarDestroyModal = ({ history, barId }) => {
  const [isDestroying, setIsDestroying] = useState(false);
  const { toggleModal, toggleToast } = useContext(AlertsContext);

  const handleClose = () => {
    if (barId) {
      toggleModal();
    }
  };

  const handleDestroyClick = () => {
    setIsDestroying(true);

    apiDestroy(`/bars/${barId}`).then(() => {
      handleClose();
      toggleToast('Welcome bar deleted');
      history.push('/');
    });
  };

  const isOpen = barId > 0;
  const primaryAction = {
    content: 'Delete',
    onAction: handleDestroyClick,
    loading: isDestroying,
    destructive: true,
  };
  const secondaryAction = [{ content: 'Close', onAction: handleClose }];

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      title="Delete Confirmation"
      message="Are you sure you want to delete this welcome bar?"
      primaryAction={primaryAction}
      secondaryActions={secondaryAction}
    />
  );
};

SingleBarDestroyModal.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  barId: PropTypes.number,
};

SingleBarDestroyModal.defaultProps = {
  barId: -1,
};

export default withRouter(SingleBarDestroyModal);
