import React, {Component} from 'react';
import Airplanes from './Airplanes';
import {Link} from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Jumbotron, Button, Container } from 'react-bootstrap';
import '../App.css';
import User from './User';


class NavMenu extends Component {
  constructor() {
    super();
  }

  render() {

    if(User.isAdmin()) {
      return (

        <Container fluid="true">
        <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
            <Nav className="mr-auto">
                  <Nav.Link><Link to="/search">Booking</Link> </Nav.Link>
                  <Nav.Link><Link to="/airplanes">Create Airplanes</Link> </Nav.Link>
                  <Nav.Link><Link to="/flights">Create Flights</Link> </Nav.Link>

                <NavDropdown title="Account" id="collasible-nav-dropdown">
                    <NavDropdown.Item><Link to="/logout">Sign out</Link></NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar>

        <Jumbotron className="banner">
          <h1><strong>Welcome to the Burning Airlines</strong></h1>
          <p>
          If you've ever imagined an exciting flight, this adventure is for you. Our flights give you an experience like no other.

          </p>

          <p>
            <Button variant="outline-danger" color=" rgb(102, 0, 0)"><Link to="/search" className="booknow"><strong>Book now!</strong></Link></Button>
          </p>
      </Jumbotron>
        </div>
        </Container>
      )
    } else if (User.getEmail !== null) {
      return (
      <Container fluid="true">
      <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
          <Nav className="mr-auto">
                <Nav.Link><Link to="/search">Booking</Link> </Nav.Link>

              <NavDropdown title="Account" id="collasible-nav-dropdown">
                  <NavDropdown.Item><Link to="/logout">Sign out</Link></NavDropdown.Item>
              </NavDropdown>
          </Nav>
      </Navbar>

      <Jumbotron className="banner">
        <h1><strong>Welcome to the Burning Airlines</strong></h1>
        <p>
        If you've ever imagined an exciting flight, this adventure is for you. Our flights give you an experience like no other.

        </p>

        <p>
          <Button variant="outline-danger" color=" rgb(102, 0, 0)"><Link to="/search" className="booknow"><strong>Book now!</strong></Link></Button>
        </p>
    </Jumbotron>
      </div>
      </Container>
     )
    } else {
     return (
      <Container fluid="true">
      <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
          <Nav className="mr-auto">

              <NavDropdown title="Account" id="collasible-nav-dropdown">
                  <NavDropdown.Item><Link to="/login">Sign in</Link></NavDropdown.Item>
              </NavDropdown>
          </Nav>
      </Navbar>

      <Jumbotron className="banner">
        <h1><strong>Welcome to the Burning Airlines</strong></h1>
        <p>
        If you've ever imagined an exciting flight, this adventure is for you. Our flights give you an experience like no other.

        </p>

        <p>
          <Button variant="outline-danger" color=" rgb(102, 0, 0)"><Link to="/search" className="booknow"><strong>Book now!</strong></Link></Button>
        </p>
    </Jumbotron>
      </div>
      </Container>

    );
   }
  }
}

export default NavMenu;
