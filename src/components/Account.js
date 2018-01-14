import React, {Component} from 'react';
import * as firebase from 'firebase';
import {PasswordForgetForm} from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';
import {db} from '../firebase';
import Paper from 'material-ui/Paper';
import moment from 'moment';

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      user: null,
      eventsUser: null,
      doctors: null,
    };
// this.deleteEvent = this.deleteEvent.bind(this);
  }
  componentWillMount() {
    this.setState({
      currentUser: firebase
        .auth()
        .currentUser
        .uid
    })
  }
  componentDidMount() {
    db
      .onceGetUser(this.state.currentUser)
      .then(snapshot => this.setState(() => ({
        user: snapshot.val()
      })))

      db.onceGetUserEvents(this.state.currentUser).then(snapshot =>
      this.setState({ eventsUser: snapshot.val() }))
      db.onceGetDoctors().then(snapshot =>
        this.setState(() => ({ doctors: snapshot.val()} ))
      );
  }
deleteEvent(key) {
  let showItem = this.state.eventsUser[key].doctor;
  console.log(showItem);
  console.log(key)
  db.onceDeleteEvent(this.state.currentUser, key, this.state.eventsUser[key].doctor);
  db.onceGetUserEvents(this.state.currentUser).then(snapshot =>
    this.setState({ eventsUser: snapshot.val() }))
}
  render() {
    const { user, eventsUser, doctors } = this.state;
    return (
      <div>
        <Paper>
          <h1>Konto użytkownika: {user && user.username}</h1>
          <p>Adres e-mail: {user && user.email}</p>
          <p>Numer telefonu: {user && user.phone}</p>
        </Paper>
        <Paper>
          <p>Twoje przyszłe wizyty:</p>
          <ul>
            {(eventsUser && doctors) && Object.keys(eventsUser).map((key) =>
           (new Date(moment(eventsUser[key].start, 'YYYY-M-DD-H-m-s')) > new Date()) && (<li key={key} id="start">Od: {eventsUser[key].start} 
             Do: {eventsUser[key].end} 
             z: {doctors[eventsUser[key].doctor].name}<button onClick={this.deleteEvent.bind(this, key)}>odwołaj wizytę</button></li>))
               }
          </ul>
          </Paper>
          
          <Paper>
          <p>Twoje wizyty, które już się odbyły:</p>
          <ul>
          {(eventsUser && doctors) && Object.keys(eventsUser).map((key) =>
           (new Date(moment(eventsUser[key].start, 'YYYY-M-DD-H-m-s')) < new Date()) && (<li key={key}>Od: {eventsUser[key].start} 
             Do: {eventsUser[key].end} 
             z: {doctors[eventsUser[key].doctor].name}</li>))
               }
               </ul>
          </Paper>
          <Paper>
          <p>Zapomniałeś hasła?</p>
          <PasswordForgetForm/>
          <p>Chcesz zmienić hasło?</p>
          <PasswordChangeForm/>
        </Paper>
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);