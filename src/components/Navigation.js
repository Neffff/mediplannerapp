import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import '../styles/Navigation.css';

const Navigation = (props, { authUser }) =>
  <div className="menu__container">
    <AppBar position="static" color="default">
        <Toolbar>
          <Typography type="title" color="inherit">
            <p className="logo">Mediplanner</p>
          
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
    </Typography>
        </Toolbar>
      </AppBar>
  </div>

Navigation.contextTypes = {
    authUser: PropTypes.object,
  };

const NavigationAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}><Button raised type="button">Landing</Button></Link></li>
    <li><Link to={routes.HOME}><Button raised type="button">Home</Button></Link></li>
    <li><Link to={routes.ACCOUNT}><Button raised type="button">Konto</Button></Link></li>
    <li><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}><Button raised type="button">Landing</Button></Link></li>
    <li><Link to={routes.SIGN_IN}><Button raised type="button">Logowanie</Button></Link></li>
  </ul>


export default Navigation;