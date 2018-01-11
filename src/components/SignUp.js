import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { auth, db } from '../firebase';
import * as routes from '../constants/routes';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import '../styles/SignUp.css'
const SignUpPage = ({ history }) =>
<div className="signUp__center">
<Paper className="signUp__container" elevation={2}>
  <div>
    <h1>Zarejestruj się!</h1>
    <SignUpForm history={history} />
  </div>
  </Paper>
</div>
const INITIAL_STATE = {
    username: '',
    email: '',
    phone: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

  const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
}


  onSubmit = (event) => {
      const {
        username,
        email,
        phone,
        passwordOne,
      } = this.state;
  
      const {
        history,
      } = this.props;
      
      auth.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {        
            // Create a user in your own accessible Firebase Database too
            db.doCreateUser(authUser.uid, username, email, phone)
              .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }));
                history.push(routes.HOME);
              })
              .catch(error => {
                this.setState(byPropKey('error', error));
              });
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });
  
      event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      phone,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '' ||
    phone === '';

    return (
      <form onSubmit={this.onSubmit}>
         <Input
          value={username}
          className="signUp_input"
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="Imię i nazwisko"
        />
        <Input
          value={email}
          className="signUp_input"
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Adres E-mail"
        />
        <Input
          value={phone}
          className="signUp_input"
          onChange={event => this.setState(byPropKey('phone', event.target.value))}
          type="text"
          placeholder="Numer telefonu"
        />
        <Input
          value={passwordOne}
          className="signUp_input"
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Hasło"
        />
        <Input
          value={passwordTwo}
          className="signUp_input"
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Potwierdź hasło"
        />
        <Button 
        raised color="primary"
        disabled={isInvalid} 
        type="submit">
          Zarejestruj się
        </Button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Nie masz konta?
    {' '}
    <Link to={routes.SIGN_UP}>Zarejestruj się</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};