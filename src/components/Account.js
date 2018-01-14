import React, {Component} from 'react';
import * as firebase from 'firebase';
import {PasswordForgetForm} from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';
import {db} from '../firebase';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';
import '../styles/Account.css'

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      user: null,
      eventsUser: null,
      doctors: null,
    };
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
  db.onceDeleteEvent(this.state.currentUser, key, this.state.eventsUser[key].doctor);
  db.onceGetUserEvents(this.state.currentUser).then(snapshot =>
    this.setState({ eventsUser: snapshot.val() }))
}
  render() {
    const { user, eventsUser, doctors } = this.state;
    return (
      <div className="account__container">
      <div className="account__top">
        <Paper className="account__info">
          <h1>Konto użytkownika: {user && user.username}</h1>
          <p>Adres e-mail: {user && user.email}</p>
          <p>Numer telefonu: {user && user.phone}</p>
        </Paper>
        <Paper className="account__password">
          <p>Zapomniałeś hasła?</p>
          <PasswordForgetForm/>
          <p>Chcesz zmienić hasło?</p>
          <PasswordChangeForm/>
        </Paper>
        </div>
        <Paper className="account__fevents">
          <p>Twoje przyszłe wizyty:</p>
          <table>
          <tbody>
          <tr>
    <th>Wizyta z</th>
    <th>Rozpoczęcie</th>
    <th>Zakończenie</th>
    <th></th>
  </tr>
 
            {(eventsUser && doctors) && Object.keys(eventsUser).map((key) =>
           (new Date(moment(eventsUser[key].start, 'YYYY-M-DD-H-m-s')) > new Date()) && (<tr key={key}>
         <td><Avatar
           src={doctors[eventsUser[key].doctor].avatar}
           className="account__avatar"
         /><span className="account__name">{doctors[eventsUser[key].doctor].name}</span></td>
        <td>{moment(eventsUser[key].start, 'YYYY-M-DD-H-m-s').format('DD MMMM YYYY, [godzina] H:mm')}</td>
             <td>{moment(eventsUser[key].end, 'YYYY-M-DD-H-m-s').format('DD MMMM YYYY, [godzina] H:mm')}</td>
             <td><Button onClick={this.deleteEvent.bind(this, key)}>odwołaj wizytę</Button></td></tr>))
               }
               </tbody>
          </table>
          </Paper>
          <Paper className="account__pevents">
          <p>Twoje wizyty, które już się odbyły:</p>
          <table>
          <tbody>
          <tr>
    <th>Wizyta z</th>
    <th>Rozpoczecie</th>
    <th>Zakończenie</th>
  </tr>
          {(eventsUser && doctors) && Object.keys(eventsUser).map((key) =>
           (new Date(moment(eventsUser[key].start, 'YYYY-M-DD-H-m-s')) < new Date()) && (<tr key={key}>
           <td><Avatar
           src={doctors[eventsUser[key].doctor].avatar}
           className="account__avatar"
         /><span className="account__name">{doctors[eventsUser[key].doctor].name}</span></td>
        <td>{moment(eventsUser[key].start, 'YYYY-M-DD-H-m-s').format('DD MMMM YYYY, [godzina] H:mm')}</td>
             <td>{moment(eventsUser[key].end, 'YYYY-M-DD-H-m-s').format('DD MMMM YYYY, [godzina] H:mm')}</td>
             </tr>))
               }
               </tbody>
               </table>
          </Paper>
          
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);