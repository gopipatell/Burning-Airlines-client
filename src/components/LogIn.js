import React, {Component} from 'react';
import axios from 'axios';
import User from './User';
import { Form, Container, Row } from 'react-bootstrap';
import './Login.css';

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
      <Container>
      <Row className="justify-content-md-center">
      < div class="login">
      <div>
      <h1>Log in</h1>
        <Form onSubmit={this._handleSubmit} >
        <Form.Group controlId="formGroupEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Ludo" onInput={this._handleInputName}/>
        </Form.Group>

        <Form.Group controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="ludo@ga.co" onInput={this._handleInputEmail}/>
        </Form.Group>

         <Form.Control type="submit" value= "Log In" />

       </Form>
     </div>
     </div>
     </Row>
     </Container>
    );
  }

}

export default LogIn;
