import React from 'react';

import { auth } from '../firebase';
import Button from 'material-ui/Button';
const SignOutButton = () =>
  <Button
  raised color="primary"
    type="button"
    onClick={auth.doSignOut}
  >
    Wyloguj
  </Button>

export default SignOutButton;