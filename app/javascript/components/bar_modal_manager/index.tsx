import React, { useContext } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { Modal } from '@shopify/polaris';
import { DESTROY_BAR } from '../../utilities/graphql_utilities';
import { OverlaysContext } from '../../contexts/overlays_context_provider';
import { BarPayload } from '../../types/bar';
import { useMutation } from '@apollo/react-hooks';

const BarModalManager: React.FC = () => {
  const history = useHistory();
  const { barId } = useParams();
  const { search } = useLocation();
  const { toggleModal, modalAction } = useContext(OverlaysContext);

  const closeModal = (): void => toggleModal(null);

  const capitalizeFirstLetter = (): string =>
    modalAction.type.charAt(0).toUpperCase() + modalAction.type.slice(1);

  const secondaryAction = [{ content: 'Close', onAction: closeModal }];

  const [destroyBar, { loading }] = useMutation(DESTROY_BAR, {
    variables: { input: { id: barId } },
    onCompleted: (response: BarPayload): void => {
      if (response.destroyBar.bar) {
        toggleModal(null);
        history.push({ pathname: '/', search });
      }
    },
  });

  const primaryAction = {
    content: capitalizeFirstLetter(),
    onAction: (): void => {
      if (modalAction.type === 'delete') {
        destroyBar();
      }

      if (modalAction.onAction) {
        modalAction.onAction();
      }

      toggleModal(null);
    },
    destructive: true,
    loading: modalAction.type === 'delete' ? loading : undefined,
  };

  return (
    <Modal
      open={!!modalAction.type}
      onClose={closeModal}
      title={modalAction.title}
      message="This action cannot be undone."
      primaryAction={primaryAction}
      secondaryActions={secondaryAction}
    />
  );
};

export default BarModalManager;
