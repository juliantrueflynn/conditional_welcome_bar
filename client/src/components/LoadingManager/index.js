import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Loading, SkeletonPage } from '@shopify/polaris';
import LoadingSkeletonLayout from '../LoadingSkeletonLayout';

class LoadingManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, loadingTo: props.router.route };
    this.handleUpdateLoading = this.handleUpdateLoading.bind(this);
  }

  componentDidMount() {
    this.handleUpdateLoading(null);
  }

  render() {
    const { children } = this.props;
    const { isLoading, loadingTo } = this.state;

    if (!isLoading) {
      return children;
    }

    const skeletonTitle = !loadingTo || loadingTo === '/' ? 'Home' : null;

    return (
      <Fragment>
        <Loading />
        <SkeletonPage primaryAction title={skeletonTitle}>
          <LoadingSkeletonLayout loadingTo={loadingTo} />
        </SkeletonPage>
      </Fragment>
    );
  }
}

LoadingManager.propTypes = {
  children: PropTypes.node.isRequired,
  router: PropTypes.shape({ route: PropTypes.string }).isRequired,
};

export default withRouter(LoadingManager);
