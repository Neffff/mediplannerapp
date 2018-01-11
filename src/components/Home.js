import React, { Component } from 'react';
import withAuthorization from './withAuthorization';
import DoctorCard from './DoctorCard';
import { db } from '../firebase';
import '../styles/home.css';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      doctors: null,
      events: null
    };
  }
  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
    
    db.onceGetDoctors().then(snapshot =>
    this.setState(() => ({ doctors: snapshot.val()} ))
  );
  db.onceGetEvents().then(snapshot =>
    this.setState(() => ({ events: snapshot.val()} ))
  );
  }
  render() {
    const { users, doctors, events } = this.state;
    return (
      <div className="home__container">
        <h1 className="home__h1">Wybierz lekarza i umów się na wizytę</h1>
        <div className="home__cards">
    {!!doctors && <DoctorCard doctors={doctors} events={events}/>}
</div>

         {/* <p>The Home Page is accessible by every signed in user.</p>

        { !!users && <UserList users={users} /> } */}

      </div>
    );
  }
}

// const UserList = ({ users }) =>
//   <div>
//     <h2>Lista nazw użytkowników:</h2>
//     <p>(Saved on Sign Up in Firebase Database)</p>

//     {Object.keys(users).map(key =>
//       <div key={key}>{users[key].username}</div>
//     )}
    
//   </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);