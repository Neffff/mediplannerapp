import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, phone) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    phone
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other Entity APIs ...

export const onceGetDoctors = () =>
  db.ref('doctors').once('value');

export const onceGetEvents = () =>
  db.ref('events').once('value');

export const onceGetUserEvents = (currentUser) =>
db.ref(`eventUser/${currentUser}`).once('value');

export const onceDeleteEvent = (currentUser, key, doctorID) =>
db.ref(`eventUser/${currentUser}/${key}`).remove() && 
db.ref(`events/${doctorID}/${key}`).remove();


export const doCreateEvent = (id, key, start, end) => 
  db.ref(`events/${id}/${key}`).set({
    start,
    end
  });

export const onceGetUser = (id) =>
db.ref(`users/${id}`).once('value');