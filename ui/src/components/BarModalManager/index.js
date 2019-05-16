import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { matchPath } from 'react-router';
import { Modal } from '@shopify/polaris';
import { Mutation } from 'react-apollo';
import { DESTROY_BAR } from '../../util/graphQlUtil';
import { OverlaysContext } from '../../contexts/OverlaysContextProvider';

const BarModalManager = ({ history, location }) => {
  const { toggleModal, toggleToast, modalAction } = useContext(OverlaysContext);

  let match;

  if (modalAction.type === 'delete') {
    match = matchPath(location.pathname, { path: '/bars/:barId' });
  }

  const capitalizeFirstLetter = () =>
    modalAction.type.charAt(0).toUpperCase() + modalAction.type.slice(1);

  const isOpen = !!modalAction.type;

  const secondaryAction = [{ content: 'Close', onAction: toggleModal }];

  const onCompleted = (response) => {
    if (response.destroyBar.bar) {
      toggleModal();
      toggleToast('Welcome bar deleted');
      history.push({ pathname: '/', search: location.search });
    }
  };

  const mutationInput = { input: { id: match && match.params.barId } };

  return (
    <Mutation mutation={DESTROY_BAR} variables={mutationInput} onCompleted={onCompleted}>
      {(destroyBar, { loading }) => {
        const onAction = () => {
          if (modalAction.type === 'delete') {
            destroyBar();
          }

          modalAction.onAction();
          toggleModal();
        };

        const primaryAction = {
          content: capitalizeFirstLetter(),
          onAction,
          destructive: true,
          loading: modalAction.type === 'delete' ? loading : undefined,
        };

        return (
          <Modal
            open={isOpen}
            onClose={toggleModal}
            title={modalAction.title}
            message="This action cannot be undone."
            primaryAction={primaryAction}
            secondaryActions={secondaryAction}
          />
        );
      }}
    </Mutation>
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
