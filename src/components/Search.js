import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Container, Row, Col, Form, Table,Nav, NavDropdown, Navbar } from 'react-bootstrap';
import './Search.css'

const FLIGHTS_API = 'http://localhost:3000/flights.json';

class Search extends Component {
  constructor(){
    super();
    this.state = {
      flights: [],
      listFlights: []
    }
    this.searchFlight = this.searchFlight.bind(this);
  };

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

  searchFlight(f, t) {
    // console.log(this.props);
    //
    // let templistFlights = [];
    //
    // for (let i=0; i < this.state.flights.length; i++) {
    //   let flight = this.state.flights[i];
    //
    //   if (flight.origin === f && flight.destination === t) {
    //     templistFlights.push(flight);
    //   }
    // }
    axios.get(FLIGHTS_API).then(results => {
        console.log(results.data);
        const data = results.data.filter((flight)=>{
          return flight.origin === f && flight.destination === t
        })
        this.setState({flights: data});
      });


  }



  render(){
    return(
      
      <div>
        <Container fluid="true">
        <Navbar bg="light" expand="lg">
      <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand> 
        <Nav className="mr-auto">
              <Nav.Link><Link to="/search">Flights</Link> </Nav.Link> 
              <Nav.Link><Link to="/airplanes/new">Create Airplanes</Link> </Nav.Link> 
              <Nav.Link><Link to="/flights/new">Create Flights</Link> </Nav.Link>         
            <NavDropdown title="Account" id="collasible-nav-dropdown">
                <NavDropdown.Item><Link to="login">Sign in</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="">Sign up</Link></NavDropdown.Item>
                
            </NavDropdown>
        </Nav>
        </Navbar>
        </Container>
        <Container>
        <Row>
        <span id="heading"><h2><strong>Find your flight!</strong>  </h2></span>
        <SearchForm onSubmit={this.searchFlight}/>
        <DisplayFlights info={this.state.flights}/>
        </Row>
    </Container>
    </div>
    
    )
  }
}


class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      origin: '',
      destination: '',
      flights: []
    };

    this._handleChangeOrigin = this._handleChangeOrigin.bind(this);
    this._handleChangeDestination = this._handleChangeDestination.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
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

  _handleChangeOrigin(e) {
    this.setState({origin: e.target.value})
  }
  _handleChangeDestination(e) {
    this.setState({destination: e.target.value})
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.origin, this.state.destination);
  }


  render() {

    return (
      <Form onSubmit={this._handleSubmit}>
        <Form.Row>
        <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>From</Form.Label>
            <Form.Control as="select" onChange={this._handleChangeOrigin}>
              {this.state.flights.map( (f) => <option>{f.origin}</option>)}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>To</Form.Label>
            <Form.Control as="select" onChange={this._handleChangeDestination}>
              {this.state.flights.map( (f) => <option>{f.destination}</option>)}
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Group as={Col} controlId="formGridZip">
            <Form.Control type="submit" value= "Search Flight" />
        </Form.Group>
      </Form>
      
         
         
      
    );
  }
}

class DisplayFlights extends Component{

  render(){
    return (
    <Table striped bordered hover className="displayFlight">
      <thead>
        <tr>
          <th>Date</th>
          <th>Flight</th>
          <th>From</th>
          <th>To</th>
          <th>Plane</th>
         </tr>
      </thead>
     {this.props.info.map(flight => (
          <tbody key={flight.id +1}>
            <tr key={flight.id}>
              <td key={flight.id + 2}>{flight.date}</td>
              <td key={flight.id + 3}>{flight.name}</td>
              <td key={flight.id + 4}>{flight.origin}</td>
              <td key={flight.id + 5}>{flight.destination}</td>
              <td key={flight.id + 6}>{flight.airplane.name}</td>
            </tr>
          </tbody>

     ))}
    </Table>)
  }

}

export default Search;
