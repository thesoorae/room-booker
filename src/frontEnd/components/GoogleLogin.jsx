import React from 'react';
import {setToRightKeys} from '../utils/utils.js';
import {insertUser} from '../actions.js';

class LoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.onSignIn = this.onSignIn.bind(this);
  }
  onSignIn(googleUser) {
    const data = setToRightKeys(googleUser.getBasicProfile(),googleUser.Zi.access_token);
    insertUser(data);
  }

  componentDidMount() {
    gapi.signin2.render('my-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'width': 359,
      'height': 50,
      'longtitle': true,
      'theme': 'light',
      'onsuccess': this.onSignIn
    });
  }
  render() {
    return (
      <div id = "my-signin2" ></div>
    );
  }
}

export default LoginButton;
