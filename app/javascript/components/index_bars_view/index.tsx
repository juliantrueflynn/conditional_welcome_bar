import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { GET_ALL_BARS, CREATE_BAR } from '../../utilities/graphql_utilities';
import { BarPayload } from '../../types/bar';
import { useQuery, useMutation } from '@apollo/client';
import BarsList from '../bars_list';

const IndexBarsView: React.FC = () => {
  const history = useHistory();
  const { search } = useLocation();

  const { loading: isLoadingBars, data, error } = useQuery(GET_ALL_BARS);
  const bars = data && data.bars;

  const [createBar, { loading: isCreating }] = useMutation(CREATE_BAR, {
    onCompleted: (response: BarPayload): void => {
      if (response.createBar.bar) {
        history.push({
          pathname: `/bars/${response.createBar.bar.id}`,
          search,
        });
      }
    },
    ignoreResults: true,
  });

  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <BarsList
      bars={bars || []}
      createBar={createBar}
      isCreating={isCreating}
      isLoadingBars={isLoadingBars}
    />
  );
};

export default IndexBarsView;
