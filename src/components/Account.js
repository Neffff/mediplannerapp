import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';


class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      users: null,
      user: null,
    };
  }
componentDidMount() {
 this.setState({ currentUser: firebase.auth().currentUser.uid})
 db.onceGetUsers().then(snapshot =>
  this.setState(() => ({ users: snapshot.val()} ))
);
this.state.users & this.state.user && this.setState({user: this.state.users[this.state.currentUser]})
}
// db.ref('users').once('value');
// componentDidMount() {
//   db.onceGetEvents().then(snapshot =>
//       this.setState(() => ({ dbevents: snapshot.val()} ))
//     )
// }
// export const onceGetUsers = () =>
//   db.ref('users').once('value');

  render() {

return (
<div>
      {/* <h1>Konto: {authUser.email}</h1> */}
     <PasswordForgetForm />
     <PasswordChangeForm />
     {/* {this.state.currentUser}
     {this.state.users  & this.state.currentUser != null && console.log('xd')} */}
     {/* {this.state.users ? console.log(Object.values(this.state.users[this.state.currenUser].email)) : <p></p>} */}
     {/* dbevents ? Object.values(dbevents[currentID]) : [] */}
  </div>
);
}
}    
// const AccountPage = (props, { authUser }) =>
//   <div>
//     <h1>Konto: {authUser.email}</h1>
//     <PasswordForgetForm />
//     <PasswordChangeForm />
//   </div>


const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);