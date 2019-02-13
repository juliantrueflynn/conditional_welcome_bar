import React from 'react';
import AppRoutes from './components/AppRoutes';
import ShopifyAppProvider from './components/ShopifyAppProvider';
// import LoadingManager from './components/LoadingManager';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shouldShowToast: false, toastContent: '' };
    this.handleToggleToast = this.handleToggleToast.bind(this);
  }

  handleToggleToast(message) {
    const { shouldShowToast } = this.state;
    const toastContent = shouldShowToast ? '' : message;
    this.setState({ shouldShowToast: !shouldShowToast, toastContent });
  }

  render() {
    const { shouldShowToast, toastContent } = this.state;

    return (
      <ShopifyAppProvider
        toggleToast={this.handleToggleToast}
        shouldShowToast={shouldShowToast}
        toastContent={toastContent}
      >
        {/* <LoadingManager> */}
          <AppRoutes />
        {/* </LoadingManager> */}
      </ShopifyAppProvider>
    );
  }
}

export default App;
