import React, {Component} from 'react';
import axios from 'axios';
import './Reservation.css'

const RESERVATION_API = 'http://localhost:3000/flights/';

class Reservation extends Component {

  constructor() {
    super();
    this.state = {
      flight: {},
      isLoaded: false,
      seats: []
    }

    this.handleSeatClicked = this.handleSeatClicked.bind(this);
  }

  componentDidMount() {
    const flightId = this.props.match.params.id;
    axios.get(RESERVATION_API + `${flightId}.json`)
      .then(result => {
        console.log(result.data);

        const seats = Array(result.data.airplane.columns);
        for(var row=0; row < seats.length; row++) {
            seats[row] = Array(result.data.airplane.rows);
        }

        result.data.reservations.forEach(seat => {
          seats[seat.columns-1][seat.rows-1] = seat.user;
        });

        this.setState({flight: result.data, isLoaded: true, seats: seats});
      });

  }

  handleSeatClicked = function(col, row) {
    console.log('clicked...', col, row);

    const {flight, isLoaded, seats} = this.state;
    const newSeats = seats.map(row => [...row]);

    if(!seats[row][col]) {
      newSeats[row][col] = 'X';
      this.setState({
        flight: flight,
        isLoaded: isLoaded,
        seats: newSeats
      });
    }
  }

  render () {

    const {isLoaded, flight, seats} = this.state;

    if(!isLoaded) {
      return ('Loading..');
    } else {

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
                  <td className={(seats[row][col] ? 'reserved' : 'available')} key={'k3'+col} onClick={() => this.handleSeatClicked(col, row)}>

                    {seats[row][col]}

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
