import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Modal } from '@shopify/polaris';
import { apiDestroy } from '../../util/apiUtil';

class SingleBarDestroyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isDestroying: false };
    this.handleDestroyClick = this.handleDestroyClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleDestroyClick() {
    const { barId } = this.props;
    this.setState({ isDestroying: true });
    apiDestroy(`/bars/${barId}`);
    this.handleClose();
  }

  handleClose() {
    const { barId, toggleModal } = this.props;

    if (barId) {
      toggleModal();
    }
  }

  render() {
    const { barId } = this.props;
    const { isDestroying } = this.state;

    const isOpen = barId > 0;

    return (
      <Modal
        open={isOpen}
        onClose={this.handleClose}
        title="Delete Confirmation"
        message="Are you sure you want to delete this welcome bar?"
        primaryAction={{
          content: 'Delete',
          onAction: this.handleDestroyClick,
          loading: isDestroying,
          destructive: true,
        }}
        secondaryActions={[
          {
            content: 'Close',
            onAction: this.handleClose,
          },
        ]}
      />
    );
  }
}

SingleBarDestroyModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  barId: PropTypes.number,
};

SingleBarDestroyModal.defaultProps = {
  barId: -1,
};

export default withRouter(SingleBarDestroyModal);
