import OktaAuth from '@okta/okta-auth-js';
import { useOktaAuth } from '@okta/okta-react';
import React, { useState } from 'react';

export default function LoginForm() {
  const { authService } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    const oktaAuth = new OktaAuth({ issuer: 'https://dev-827463.okta.com' });
    oktaAuth
      .signIn({ username, password })
      .then(res => {
        const sessionToken = res.sessionToken;
        setSessionToken(sessionToken);
        // sessionToken is a one-use token, so make sure this is only called once
        authService.redirect({ sessionToken });
      })
      .catch();
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  if (sessionToken) {
    // Hide form while sessionToken is converted into id/access tokens
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">
        Username:
        <input id="username" name="username" onChange={handleUsernameChange} type="text" value={username} />
      </label>
      <label htmlFor="password">
        Password:
        <input id="password" name="password" onChange={handlePasswordChange} type="password" value={password} />
      </label>
      <input id="submit" type="submit" value="Submit" />
    </form>
  );
}
