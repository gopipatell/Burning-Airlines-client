import React, {Component} from 'react';
import axios from 'axios';
import User from './User';
import {Link} from 'react-router-dom';

class Logout extends Component {
  constructor() {
    super();

    console.log(User.getName())
    User.setName('');
    User.setEmail('');
    User.setUserId(0);
    User.setAdmin(false);

  }

  render() {
   return (
     <div>
       <h2>You have successfully logged out</h2>
       <Link to="/login">Log In</Link>
     </div>
   )
  }
}


export default Logout;
