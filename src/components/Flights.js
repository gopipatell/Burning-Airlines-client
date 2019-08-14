import React, {Component} from 'react';
import axios from 'axios';
import './Flights.css'
import {Link} from 'react-router-dom';

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
    return(
      <div>

          <h1> Flights coming soon </h1>

          
          {this.state.flights.map(flight => (
            <div>
            <p key={flight.id}>
            <table className="flights">
             <th>Date</th>
             <th>Flight</th>
             <th>From</th>
             <th>To</th>
             <th>Plane</th>
             <th>Available Seats</th>

             <tbody key={flight.id + 1}>
               <tr key={flight.id + 2}>
               <td key={flight.id + 3}>{flight.date}</td>
               <td key={flight.id + 4}>{flight.name}</td>
               <td key={flight.id + 5}>{flight.origin}</td>
               <td key={flight.id + 6}>{flight.destination}</td>
               <td key={flight.id + 7}>{flight.airplane.name}</td>
               <td key={flight.id + 8}>{flight.available_seats}</td>

              </tr>
              </tbody>

            </table>
            </p>

            </div>
          ))}
      </div>
    )
  }
}
 export default Flights;
