import React, {Component} from 'react';
import './Airplanes.css'
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Form, Container, Row, Col, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import NavMenu from './NavMenu';

const AIRPLANES_API = 'http://localhost:3000/airplanes.json';


class Airplanes extends Component {
  constructor() {
    super();
    this.state = {
      airplanes:[]
    };
    this.savePlane = this.savePlane.bind( this );
  }


  componentDidMount() {
    const fetchAirplanes = () => {
        axios.get(AIRPLANES_API)
          .then(results => {
            console.log(results.data);
            this.setState({airplanes: results.data });
          });
    }
    fetchAirplanes();
  }

  savePlane(name, rows, columns) {
    axios.post(AIRPLANES_API, {name: name, rows: rows, columns: columns}).then((result) => {
      this.setState({airplanes: [...this.state.airplanes, result.data]})
    });
  }

  render() {

    return(
      <div>
      <Container fluid="true">
      <Navbar bg="light" expand="lg">
    <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
      <Nav className="mr-auto">
            <Nav.Link><Link to="/search">Booking</Link> </Nav.Link>
            <Nav.Link><Link to="/airplanes">Create Airplanes</Link> </Nav.Link>
            <Nav.Link><Link to="/flights">Create Flights</Link> </Nav.Link>

          <NavDropdown title="Account" id="collasible-nav-dropdown">
              <NavDropdown.Item><Link to="login">Sign in</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to="">Sign up</Link></NavDropdown.Item>

          </NavDropdown>
      </Nav>
      </Navbar>
      </Container>

      <Container>


        <div>


            <h1> New Airplane </h1>
              <AirplaneForm onSubmit={this.savePlane}/>

      {this.state.airplanes.map(plane => (
        <div>

        <p key={plane.id}>
          <h4>Plane No:{plane.name} </h4>
        </p>
        <table className="airplane-seats">

          {[...Array(plane.rows).keys()].map(r => (
            <tr>
              <td class="noborder">{ String.fromCharCode(65 + r) }</td>
              {Array(plane.columns).fill().map(c => (
                <td> </td>
              ))}
            </tr>
          ))}

          <tr>
            <td class="noborder"></td>
            {[...Array(plane.columns).keys()].map(c => (
              <td class="noborder"> {c+1} </td>
            ))}
          </tr>


        </table>


              </div>


      ))}


      </div>


      </Container>
      </div>
    )
  }
}

class AirplaneForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      rows: 0,
      columns: 0
    };

    this._handleInputName = this._handleInputName.bind(this);
    this._handleInputRows = this._handleInputRows.bind(this);
    this._handleInputColumns = this._handleInputColumns.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  _handleInputName(e) {
    this.setState({name: e.target.value})
  }
  _handleInputRows(e) {
    this.setState({rows: e.target.value})
  }
  _handleInputColumns(e) {
    this.setState({columns: e.target.value})
  }
  _handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.name, this.state.rows, this.state.columns)
    this.setState({name:'', rows: 0, columns: 0});
  }



  render() {
    return (
      <Form onSubmit={this._handleSubmit} >
          <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
                <Form.Control type="text" onInput={this._handleInputName}/>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Rows</Form.Label>
                <Form.Control type="number" onInput={this._handleInputRows}/>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Columns</Form.Label>
                <Form.Control type="number" onInput={this._handleInputColumns}/>
          </Form.Group>


          <Form.Control type="submit" value="Save Airplane"></Form.Control>


       </Form>


    );
  }
}



export default Airplanes;
