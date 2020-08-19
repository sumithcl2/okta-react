import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import log from 'loglevel';
import OktaSignIn from '@okta/okta-signin-widget';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class OktaSignInWidget extends Component {
  componentDidMount() {
    log.error('test signin widgets', this.props);
    this.widget = new OktaSignIn({
      baseUrl: this.props.baseUrl,
      clientId: '0oajicxcunnu41FNy4x6'
    });
    this.widget.renderEl({ el: '#sign-in-widget' }, this.props.onSuccess, this.props.onError);
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return <div />;
  }
}
OktaSignInWidget.propTypes = {
  baseUrl: PropTypes.string,
  onError: PropTypes.object,
  onSuccess: PropTypes.object
};
