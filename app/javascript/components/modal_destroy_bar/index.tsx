import React from 'react';
import { Modal, TextContainer } from '@shopify/polaris';
import { DESTROY_BAR } from '../../utilities/graphql_tags';
import { useHistory } from 'react-router';
import { useMutation } from '@apollo/client';
import { useToastDispatchContext } from '../ToastContext';

type Props = {
  isModalOpen: boolean;
  barId: string | number;
  onClose: () => void;
};

const ModalDestroyBar = ({ barId, isModalOpen, onClose }: Props) => {
  const history = useHistory();
  const dispatch = useToastDispatchContext();

  const [destroyBar, { loading }] = useMutation(DESTROY_BAR, {
    onCompleted: () => {
      dispatch({ type: 'bar/destroy' });
      history.push({ pathname: '/' });
    },
    ignoreResults: true,
  });

  return (
    <Modal
      open={isModalOpen}
      onClose={onClose}
      title="Delete Welcome Bar?"
      primaryAction={{
        content: 'Delete',
        onAction: () => destroyBar({ variables: { input: { id: barId } } }),
        destructive: true,
        loading,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: onClose,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>
          <p>This will delete the current welcome bar and cannot be undone.</p>
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
};

export default ModalDestroyBar;
