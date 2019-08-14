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


  render() {
    return (
      <div>
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
 export default Flights;
