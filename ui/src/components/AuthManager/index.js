import React, { useState } from 'react';
import { apiFetch } from '../../util/apiUtil';
import { shopOrigin } from '../../util/shopifyUtil';

const AuthManager = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const goToLogin = () => window.location.assign('/login');

  if (shopOrigin) {
    apiFetch(`shops/${shopOrigin}`).then((res) => {
      if (res.status === 'fail') {
        goToLogin();
        return null;
      } else {
        setIsLoading(false);
      }
    });
  } else {
    goToLogin();
    return null;
  }

  if (isLoading) {
    return <div>LOADING AUTH COOKIES</div>;
  }

  return children;
};

export default AuthManager;
