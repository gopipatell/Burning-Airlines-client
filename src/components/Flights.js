import React, {Component} from 'react';
import axios from 'axios';
import './Flights.css'


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
        <h1>Create Flight</h1>
        <FlightForm onSubmit={this.saveFlight}/>
        <table className="flights">
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
                  <td key={flight.id + 3}>{flight.name}</td>
                  <td key={flight.id + 4}>{flight.origin}</td>
                  <td key={flight.id + 5}>{flight.destination}</td>
                  <td key={flight.id + 6}>{flight.airplane.name}</td>
                  <td key={flight.id + 7}>{flight.airplane.rows*flight.airplane.columns}</td>

                </tr>
              </tbody>

         ))}
        </table>
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
        <form onSubmit={this._handleSubmit} >
         <label>Name</label>
         <input type="text" onInput={this._handleInputName} />
         <br />
         <label>Origin</label>
         <input type="text" onInput={this._handleInputOrigin} />
         <br />
         <label>Destination</label>
         <input type="text" onInput={this._handleInputDestination} />
         <br />
         <label>Date</label>
         <input type="date" onInput={this._handleInputDate} />
         <br />
         <label>Airplane</label>
         <select onChange={this._handleChangeAirplane}>
         {this.state.airplanes.map( (ap) => <option>{ap.id}</option>)}
         </select>
         <br/>

         <input type="submit" value= "Save Flight" />
         <br />
       </form>
    );
  }
}

 export default Flights;
