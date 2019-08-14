import React, {Component} from 'react';
import axios from 'axios';
import './Reservation.css'

const RESERVATION_API = 'http://localhost:3000/flights/';

class Reservation extends Component {

  constructor() {
    super();
    this.state = {
      flight: {},
      isLoaded: false
    }
  }

  componentDidMount() {
    const flightId = this.props.match.params.id;
    axios.get(RESERVATION_API + `${flightId}.json`)
      .then(flight => {
        console.log(flight.data);
        this.setState({flight: flight.data, isLoaded: true});
      });

  }


  render () {

    const {isLoaded, flight} = this.state;

    if(!isLoaded) {
      return ('Loading..');
    } else {

      const reservedSeats = flight.reservations.map(r => (r.rows-1) + '-' + (r.columns-1));

      const reservedUsers = flight.reservations.reduce((o, v) => {
        o[(v.rows-1) + '-' + (v.columns-1)] = v.user; return o;
      }, {});


      console.log(reservedSeats);
      console.log(reservedUsers);

      return (

        <div className="Reservation">
          <h2> Reservation </h2>

          <p>
            {flight.date} - {flight.name} - {flight.origin} > {flight.destination}
          </p>
          <p>
            Airplane {flight.airplane.name} - Available seats {flight.available_seats}
          </p>

          <table className="airplane-seats">
            <tbody>
            <tr>
              <td className="noborder"></td>
              {[...Array(flight.airplane.rows).keys()].map(c => (
                <td className="noborder" key={'k1'+c}> { String.fromCharCode(65+c)} </td>
              ))}
            </tr>

            {[...Array(flight.airplane.columns).keys()].map(row => (
              <tr key={'k2'+row}>
                <td className="noborder">{ row + 1 }</td>
                {[...Array(flight.airplane.rows).keys()].map(col => (
                  <td className={(reservedSeats.indexOf(`${col}-${row}`) > -1 ? 'reserved' : '')} key={'k3'+col}>

                    { reservedUsers[`${col}-${row}`] }

                  </td>
                ))}
              </tr>
            ))}
            </tbody>
          </table>


        </div>
      )
    }
  }
}




export default Reservation;
