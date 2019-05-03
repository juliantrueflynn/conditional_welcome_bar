import React from 'react';
import PropTypes from 'prop-types';
import { apiFetch } from '../../util/apiUtil';
import LoadingManager from '../LoadingManager';
import SingleBarForm from '../SingleBarForm';
import withLoading from '../../hocs/withLoading';

class SingleBarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bar: {} };
  }

  componentDidMount() {
    const {
      match: { params },
      toggleLoading,
    } = this.props;

    apiFetch(`/bars/${params.barId}`).then((bar) => {
      toggleLoading();
      this.setState({ bar });
    });
  }

  render() {
    const { history, toggleToast, isLoading, toggleModal } = this.props;
    const { bar } = this.state;

    const breadcrumbs = [{ content: 'Welcome Bars', onAction: () => history.push('/') }];

    if (!isLoading && !bar.id) {
      return null;
    }

    return (
      <LoadingManager loadingTo="single" isLoading={isLoading}>
        <SingleBarForm
          bar={bar}
          toggleToast={toggleToast}
          breadcrumbs={breadcrumbs}
          toggleModal={toggleModal}
        />
      </LoadingManager>
    );
  }
}

SingleBarView.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  toggleToast: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  toggleLoading: PropTypes.func.isRequired,
};

export default withLoading(SingleBarView);
