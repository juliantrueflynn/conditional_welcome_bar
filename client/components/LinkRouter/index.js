import React from 'react';
import Router from 'next/router';

class LinkRouter extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    e.preventDefault();

    const { url } = this.props;
    const linkProps = { to: { pathname: url } };

    if (url.to) {
      linkProps.to = url.to;
      linkProps.as = url.as;
    }

    Router.push(linkProps.to, linkProps.as);
  }

  render() {
    const { children, url, ...props } = this.props;

    return (
      <a href="#" onClick={this.handleOnClick} {...props}>
        {children}
      </a>
    );
  }
}

export default LinkRouter;
