import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { shop: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { isLoading, session } = this.props;

    if (prevProps.isLoading && !isLoading && session) {
      window.location = this.getPermissionUrl();
    }
  }

  getPermissionUrl() {
    const { session } = this.props;
    const {
      REACT_APP_SHOPIFY_API_KEY,
      REACT_APP_SHOPIFY_CALLBACK_URL,
      REACT_APP_SHOPIFY_SCOPE,
    } = process.env;
    const authorizeUrl = `https://${session.shopifyDomain}/admin/oauth/authorize`;
    const apiQuery = `?client_id=${REACT_APP_SHOPIFY_API_KEY}`;
    const scopeQuery = `&scope=${REACT_APP_SHOPIFY_SCOPE}`;
    const redirectUri = encodeURIComponent(`${REACT_APP_SHOPIFY_CALLBACK_URL}`);
    const redirectUriQuery = `&redirect_uri=${redirectUri}`;

    return authorizeUrl + apiQuery + scopeQuery + redirectUriQuery;
  }

  handleSubmit(e) {
    e.preventDefault();

    const { signUp } = this.props;
    const { shop } = this.state;
    signUp({ shop });
  }

  handleInputChange(e) {
    this.setState({ shop: e.target.value });
  }

  render() {
    const { shop } = this.state;

    return (
      <div className="Login">
        <form className="Login__form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={shop}
            placeholder="example.myshopify.com"
            onChange={this.handleInputChange}
          />
          <button type="submit">Install</button>
        </form>
      </div>
    );
  }
}

export default Login;