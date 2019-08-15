import React, {Component} from 'react';
import axios from 'axios';
import User from './User';

const USERS_API = 'http://localhost:3000/users.json';


class LogIn extends Component {

  constructor() {
    super();

    this.state = {
      name: "",
      email: ""
    };
    this._handleInputName = this._handleInputName.bind(this);
    this._handleInputEmail = this._handleInputEmail.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  } // end constructor

  _handleInputName(e) {
    this.setState({name: e.target.value})
  }
  _handleInputEmail(e) {
    this.setState({email: e.target.value})
  }

  _handleSubmit(e) {
    e.preventDefault();

    let userInfo = null;

    axios.get(USERS_API).then((results) => {

        const users = results.data;

        for (let i=0; i<users.length; i++) {
          if (users[i].email === this.state.email) {
            userInfo = users[i];
            break;
          }
        }

        if (userInfo !== null) {
          console.log("Logged in");
          User.setName(userInfo.name);
          User.setUserId(userInfo.id);
          User.setAdmin(userInfo.admin);
          User.setEmail(userInfo.email);
          this.props.history.push("/");
        } else {
          console.log("invalid email");
        }

    })

  }


  render() {
    return (
      <div>
      <h1>Log in Page</h1>
        <form onSubmit={this._handleSubmit} >
         <label>Name: </label>
         <input type="text" onInput={this._handleInputName} />
         <label> email: </label>
         <input type="text" onInput={this._handleInputEmail} />
         <input type="submit" value= "Log In" />
         <br />
       </form>
     </div>
    );
  }

}

export default LogIn;
