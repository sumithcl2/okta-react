import OktaSignInWidget from './OktaSignInWidget';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withOktaAuth } from '@okta/okta-react';
import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this._handleSuccess = this._handleSuccess.bind(this);
    this._handleError = this._handleError.bind(this);
    this.state = {
      authenticated: null
    };
    this.checkAuthentication();
  }

  checkAuthentication() {
    const authenticated = this.props.authState.isAuthenticated;
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  //  async checkAuthentication() {
  //    if (this.props.authState.isAuthenticated && !this.state.userInfo) {
  //      const userInfo = await this.props.authService.getUser();
  //      this.setState({ userInfo, authenticated: true });
  //    }
  //  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  _handleSuccess(res) {
    if (res.status === 'SUCCESS') {
      return this.props.authService.redirect({
        sessionToken: res.session.token
      });
    } else {
      // The user can be in another authentication state that requires further action.
      // For more information about these states, see:
      //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
    }
  }

  _handleError(err) {
    return err;
  }

  render() {
    if (this.state.authenticated === null) {
      return null;
    }
    return this.state.authenticated ? (
      <Redirect to={{ pathname: '/' }} />
    ) : (
      <OktaSignInWidget baseUrl={this.props.baseUrl} onError={this._handleError} onSuccess={this._handleSuccess} />
    );
  }
}
Login.propTypes = {
  authService: PropTypes.object,
  authState: PropTypes.object,
  baseUrl: PropTypes.string
};
export default withOktaAuth(Login);
