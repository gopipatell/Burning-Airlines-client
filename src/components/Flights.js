import React, {Component} from 'react';
import axios from 'axios';
import './Flights.css'
import {Link} from 'react-router-dom';
import {Form, Container, Row, Col, Table, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import NavMenu from './NavMenu';

const AIRPLANES_API = 'http://localhost:3000/airplanes.json';
const FLIGHTS_API = 'http://localhost:3000/flights.json';

class Flights extends Component {
  constructor(){
    super();
    this.state = {
      flights: []

    };

    this.saveFlight = this.saveFlight.bind(this);
  }

  componentDidMount() {
    const fetchFlights = () => {
        axios.get(FLIGHTS_API)
          .then(results => {
            console.log(results.data);
            this.setState({flights: results.data });
          });
    }

    fetchFlights();
  }


  saveFlight(name, origin, destination, date, airplane_id) {
    axios.post(FLIGHTS_API, {name: name, origin: origin, destination: destination, date: date, airplane_id: airplane_id}).then((result) => {
      this.setState({flights: [...this.state.flights, result.data]})
    });
  }

  render() {
    return (
      
      <div>
        <Container fluid="true">
        <Navbar bg="light" expand="lg">
      <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
        <Nav className="mr-auto">
              <Nav.Link><Link to="/search">Booking</Link> </Nav.Link>
              <Nav.Link><Link to="/airplanes">Create Airplanes</Link> </Nav.Link>
              <Nav.Link><Link to="/flights">Create Flights</Link> </Nav.Link>

            <NavDropdown title="Account" id="collasible-nav-dropdown">
                <NavDropdown.Item><Link to="#">Sign in</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="#">Sign up</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="#">Sign out</Link></NavDropdown.Item>
            </NavDropdown>
        </Nav>
    </Navbar>
      </Container>

      <Container>

        <Row>

        <Col className="form">
        <h1>Create Flight</h1>
        <FlightForm onSubmit={this.saveFlight}/>
        </Col>

        <Col className="display">

        <h1>All flights</h1>
        <Table striped bordered hover className="flights">
          <thead>
            <tr>
              <th>Date</th>
              <th>Flight</th>
              <th>From</th>
              <th>To</th>
              <th>Plane</th>
              <th>Available Seats</th>
             </tr>
          </thead>
         {this.state.flights.map(flight => (
              <tbody key={flight.id +1}>
                <tr key={flight.id}>
                  <td key={flight.id + 2}>{flight.date}</td>
                  <td key={flight.id + 3}>
                    {flight.name}
                  </td>
                  <td key={flight.id + 4}>{flight.origin}</td>
                  <td key={flight.id + 5}>{flight.destination}</td>
                  <td key={flight.id + 6}>{flight.airplane.name}</td>
                  <td key={flight.id + 7}>{flight.airplane.rows*flight.airplane.columns}</td>

                </tr>
              </tbody>

         ))}
        </Table>
        </Col>
      </Row>
      </Container>
      </div>
    )

  }

}

class FlightForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      origin: '',
      destination: '',
      date: '',
      available_seats: 0,
      airplane_id: 0,
      airplanes: []
    };

    this._handleInputName = this._handleInputName.bind(this);
    this._handleInputOrigin = this._handleInputOrigin.bind(this);
    this._handleInputDestination = this._handleInputDestination.bind(this);
    this._handleInputDate = this._handleInputDate.bind( this );
    this._handleChangeAirplane = this._handleChangeAirplane.bind( this );
    this._handleSubmit = this._handleSubmit.bind(this);

    const fetchplanes = () => {
      axios.get(AIRPLANES_API).then((results) => {
        this.setState({airplanes: results.data});
      });
    };
    fetchplanes();
  }


  _handleInputName(e) {
    this.setState({name: e.target.value})
  }
  _handleInputOrigin(e) {
    this.setState({origin: e.target.value})
  }
  _handleInputDestination(e) {
    this.setState({destination: e.target.value})
  }
  _handleInputDate(e) {
    this.setState({date: e.target.value})
  }
  _handleInputAvailableSeats(e) {
    this.setState({available_seats: e.target.value})
  }
  _handleChangeAirplane(e) {
    this.setState({airplane_id: e.target.value})
  }
  _handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.name, this.state.origin, this.state.destination, this.state.date, this.state.airplane_id);
  }


  render() {

    return (


        <Form onSubmit={this._handleSubmit} >
          <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="GA33" onInput={this._handleInputName}/>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Origin</Form.Label>
                <Form.Control type="text" placeholder="SYD" onInput={this._handleInputOrigin}/>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Destination</Form.Label>
                <Form.Control type="text" placeholder="SYD" onInput={this._handleInputDestination}/>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Date</Form.Label>
                <Form.Control type="date" placeholder="SYD" onInput={this._handleInputDate}/>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Airplane</Form.Label>
              <Form.Control as="select" onChange={this._handleChangeAirplane}>
                  {this.state.airplanes.map( (ap) => <option>{ap.id}</option>)}
              </Form.Control>
          </Form.Group>

          <Form.Control type="submit" value="Save flight"></Form.Control>


       </Form>

    );
  }
}

 export default Flights;
