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


  saveFlight(name, origin, destination, date, available_seats) {
    axios.post(FLIGHTS_API, {name: name, origin: origin, destination: destination,}).then((result) => {
      this.setState({airplanes: [...this.state.airplanes, result.data]})
    });
  }

  render() {
    return (
      <div>
        <h1>Create Flight</h1>
        <FlightForm data={this.state.flights}/>
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
                  <td key={flight.id + 7}>{flight.available_seats}</td>

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
      available_seats:0,



    };

    this._handleInputName = this._handleInputName.bind(this);
    this._handleInputOrigin = this._handleInputOrigin.bind(this);
    this._handleInputDestination = this._handleInputDestination.bind(this);
    this._handleInputDate = this._handleInputDate.bind( this );
    this._handleSubmit = this._handleSubmit.bind(this);
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
  _handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.name, this.state.rows, this.state.columns)
    this.setState({name:'', rows: 0, columns: 0});
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
         <input type="text" onInput={this._handleInputDate} />
         <br />
         <label>Available seats</label>
         <input type="text" onInput={this._handleInputAvailableSeats} />
         <br />
         <label>Airplane</label>
         <select>
         {this.props.data.map( (f) => <option>{f.airplane.name}</option>)}
         </select>
         <br/>

         <input type="submit" value= "Save Flight" />
         <br />
       </form>
    );
  }
}
 export default Flights;
