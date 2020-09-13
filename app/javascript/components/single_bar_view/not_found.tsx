import React from 'react';
import {useHistory} from 'react-router-dom';
import EmptyState from '../empty_state';

const NotFound = () => {
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

export default NotFound;
