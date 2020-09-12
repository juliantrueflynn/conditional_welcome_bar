import React, {useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {
  Layout,
  Loading,
  SkeletonBodyText,
  SkeletonPage,
  TextContainer,
} from '@shopify/polaris';
import {FORM_SECTION_IDS} from '../../constants/form_sections';
import {GET_SINGLE_BAR} from '../../utilities/graphql_tags';
import SingleBar from '../single_bar';
import EmptyState from '../empty_state';
import NetworkErrorState from '../network_error_state';
import ModalDestroyBar from '../modal_destroy_bar';
import {FieldGroup} from '../form_fields';

type RouterProps = {
  barId: string;
};

const NoWelcomeBarFound = () => {
  const history = useHistory();

  return (
    <EmptyState
      heading="The page you&rsquo;re looking for couldn&rsquo;t be found"
      action={{
        content: 'View all welcome bars',
        onAction: () => history.push({pathname: '/'}),
      }}
    >
      Check the web address to make sure you entered the right welcome bar. Or
      navigate to the page from the View All welcome bars list.
    </EmptyState>
  );
};

const LoadingWelcomeBar = ({barId}: RouterProps) => (
  <>
    <Loading />
    <SkeletonPage primaryAction title={`Edit Welcome Bar ${barId}`}>
      <Layout>
        {FORM_SECTION_IDS.map((formSection) => (
          <FieldGroup key={formSection} id={formSection}>
            <TextContainer>
              <SkeletonBodyText />
              <SkeletonBodyText />
            </TextContainer>
          </FieldGroup>
        ))}
      </Layout>
    </SkeletonPage>
  </>
);

const SingleBarView = () => {
  const {barId} = useParams<RouterProps>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {loading, data, error} = useQuery(GET_SINGLE_BAR, {
    variables: {id: barId},
  });

  if (error) {
    return <NetworkErrorState />;
  }

  if (loading) {
    return <LoadingWelcomeBar barId={barId} />;
  }

  if (!loading && !data?.bar) {
    return <NoWelcomeBarFound />;
  }

  return (
    <>
      <SingleBar bar={data.bar} openModal={() => setIsModalOpen(true)} />
      <ModalDestroyBar
        onClose={() => setIsModalOpen(false)}
        isModalOpen={isModalOpen}
        barId={barId}
      />
    </>
  );
};

export default SingleBarView;
