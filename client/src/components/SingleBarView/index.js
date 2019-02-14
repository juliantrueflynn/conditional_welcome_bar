import React from 'react';
import PropTypes from 'prop-types';
import SingleBarForm from '../SingleBarForm';
import { apiFetch } from '../../util/apiUtil';

class SingleBarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bar: {}, isLoading: true };
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    apiFetch(`/bars/${params.barId}`).then((bar) => this.setState({ bar }));
  }

  render() {
    const { history, toggleToast } = this.props;
    const { bar } = this.state;

    const breadcrumbs = [{
      content: 'Welcome Bars',
      onAction: () => history.push('/'),
    }];

    if (!bar.id) {
      return null;
    }

    return (
      <SingleBarForm
        bar={bar}
        toggleToast={toggleToast}
        breadcrumbs={breadcrumbs}
      />
    );
  }
}

SingleBarView.propTypes = {
  match: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object),
  toggleToast: PropTypes.func.isRequired,
};

export default SingleBarView;
