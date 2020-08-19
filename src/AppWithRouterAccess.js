import Login from './Login';
import PropTypes from 'prop-types';
import Protected from './Protected';
import React from 'react';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { Route, withRouter } from 'react-router-dom';

class AppWithRouterAccess extends React.Component {
  constructor(props) {
    super(props);
    this._handleAuth = this._handleAuth.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  _handleAuth() {
    this.props.history.push('/login');
  }

  onLogin() {
    return <Login baseUrl="https://dev-827463.okta.com" />;
  }

  render() {
    return (
      <Security
        clientId="0oajicxcunnu41FNy4x6"
        issuer="https://dev-827463.okta.com"
        onAuthRequired={this._handleAuth}
        pkce
        redirectUri={`${window.location.origin}/implicit/callback`}
      >
        <SecureRoute component={Protected} path="/protected" />
        <Route path="/" render={this.onLogin} />
        <Route component={LoginCallback} path="/implicit/callback" />
      </Security>
    );
  }
}

AppWithRouterAccess.propTypes = {
  history: PropTypes.object
};
export default withRouter(AppWithRouterAccess);
