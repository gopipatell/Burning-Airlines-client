import React, {Component} from 'react';
import './Airplanes.css'
import axios from 'axios';

const AIRPLANES_API = 'http://localhost:3000/airplanes.json';


class Airplanes extends Component {
  constructor() {
    super();
    this.state = {
      airplanes:[]
    };
  }

  componentDidMount() {
    const fetchAirplanes = () => {
        axios.get(AIRPLANES_API)
          .then(results => {
            this.setState({ airplanes: results.data });
          });
    }
    fetchAirplanes();
  }

  render() {
    return(
      <div>

      <h1> Airplane coming soon </h1>
      {this.state.airplanes.map(plane => (
        <div>
        <p key={plane.id}>
          {plane.name} - {plane.rows} x {plane.columns}
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
    )
  }
}





export default Airplanes;
