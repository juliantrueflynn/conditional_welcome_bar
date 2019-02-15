import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { withCookies, Cookies } from 'react-cookie';

const withShopCookie = (WrappedComponent) => {
  class WithShopCookie extends React.Component {
    constructor(props) {
      super(props);
      this.state = { shopOrigin: props.cookies.get('shopOrigin') };
    }

    componentDidMount() {
      const { cookies } = this.props;
      const { shopOrigin } = this.state;
      const shop = this.getShopOriginByQuery();

      if (!shopOrigin && shop) {
        cookies.set('shopOrigin', shop, { httpOnly: false });
        this.setState({ shopOrigin: shop });
      }
    }

    getShopOriginByQuery() {
      const { location } = this.props;
      const { shop } = queryString.parse(location.search);

      return shop;
    }

    render() {
      const { cookies, ...props } = this.props;
      const { shopOrigin } = this.state;
      const shop = shopOrigin || this.getShopOriginByQuery();

      return <WrappedComponent shopOrigin={shop} {...props} />;
    }
  }

  WithShopCookie.propTypes = {
    cookies: PropTypes.instanceOf(Cookies).isRequired,
    location: PropTypes.instanceOf(Object).isRequired,
  };

  return withCookies(WithShopCookie);
};

export default withShopCookie;
