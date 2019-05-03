import React from 'react';

const withLoading = (WrappedComponent) => {
  class WithLoading extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isLoading: true };
      this.handleLoading = this.handleLoading.bind(this);
    }

    handleLoading() {
      const { isLoading } = this.state;

      this.setState({ isLoading: !isLoading });
    }

    render() {
      const { isLoading } = this.state;

      return (
        <WrappedComponent
          {...this.props}
          isLoading={isLoading}
          toggleLoading={this.handleLoading}
        />
      );
    }
  }

  return WithLoading;
};

export default withLoading;
