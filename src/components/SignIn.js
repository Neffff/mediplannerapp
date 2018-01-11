import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import '../styles/SignIn.css'

const SignInPage = ({ history }) =>
<div className="signIn__center">
<Paper className="signIn__container" elevation={2}>
  <div>
    <h1>Zaloguj się!</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
</Paper>
</div>
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (

      <form onSubmit={this.onSubmit}>
        <Input
          value={email}
          className="signIn__input"
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Adres E-mail"
        />
        <Input
          value={password}
          className="signIn__input"
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Hasło"
        />
        <Button 
        raised color="primary" 
        disabled={isInvalid} 
        type="submit">
          Zaloguj
        </Button>

        { error && <p>{error.message}</p> }
      </form>
      
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};