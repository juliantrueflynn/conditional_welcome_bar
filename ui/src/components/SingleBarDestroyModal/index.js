import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Modal } from '@shopify/polaris';
import { apiDestroy } from '../../util/apiUtil';

const SingleBarDestroyModal = ({ barId, history, toggleModal, toggleToast }) => {
  const [isDestroying, setIsDestroying] = useState(false);

  const handleClose = () => {
    if (barId) {
      toggleModal();
    }
  }

  const handleDestroyClick = () => {
    setIsDestroying(true);

    apiDestroy(`/bars/${barId}`).then(() => {
      handleClose();
      toggleToast('Welcome bar deleted');
      history.push('/');
    });
  }

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
  toggleModal: PropTypes.func.isRequired,
  toggleToast: PropTypes.func.isRequired,
  barId: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

SingleBarDestroyModal.defaultProps = {
  barId: -1,
};

export default withRouter(SingleBarDestroyModal);
