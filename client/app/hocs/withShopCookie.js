import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { withCookies, Cookies } from 'react-cookie';

const withShopCookie = (WrappedComponent) => {
  class WithShopCookie extends React.Component {
    state = { shopOrigin: '' };

    componentDidMount() {
      const { location, cookies } = this.props;
      const { shop } = queryString.parse(location.search);
      const shopOriginCookie = cookies.get('shopOrigin');
      this.setState({ shopOrigin: shopOriginCookie || shop });
  
      if (!shopOriginCookie) {
        cookies.set('shopOrigin', shop, { httpOnly: false });
      }
    }

    render() {
      const { shopOrigin } = this.state;

      return <WrappedComponent shopOrigin={shopOrigin} {...this.props} />
    }
  }

  WithShopCookie.propTypes = {
    cookies: PropTypes.instanceOf(Cookies).isRequired,
    location: PropTypes.instanceOf(Object).isRequired,
  };

  return withCookies(WithShopCookie);
};

export default withShopCookie;
