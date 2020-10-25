import React from 'react';
import {Modal, TextContainer} from '@shopify/polaris';
import {useHistory, useLocation} from 'react-router';
import {useMutation, ApolloError} from '@apollo/client';
import {DestroyBar, DestroyBarVariables, DESTROY_BAR} from './graphql';
import {useToastDispatchContext} from '../toast_context';

type Props = {
  isModalOpen: boolean;
  barId: string;
  onClose: () => void;
};

const hasRecordMissingError = ({graphQLErrors}: ApolloError) =>
  graphQLErrors && graphQLErrors.some((error) => error.extensions?.code === 'RECORD_NOT_FOUND');

const ModalDestroyBar = ({barId, isModalOpen, onClose}: Props) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useToastDispatchContext();

  const [destroyBar, destroyBarQuery] = useMutation<DestroyBar, DestroyBarVariables>(DESTROY_BAR, {
    onCompleted: () => {
      dispatch({type: 'bar/destroy'});
      navigateToHomepage();
    },
    onError: (error) => {
      if (hasRecordMissingError(error)) {
        navigateToHomepage();
      }
    },
    ignoreResults: true,
  });

  const navigateToHomepage = () => history.push({pathname: '/', search: location.search});

  return (
    <Modal
      open={isModalOpen}
      onClose={onClose}
      title="Delete Welcome Bar?"
      primaryAction={{
        content: 'Delete',
        onAction: () => destroyBar({variables: {input: {id: barId}}}),
        destructive: true,
        loading: destroyBarQuery.loading,
        disabled: destroyBarQuery.called && !destroyBarQuery.error,
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
