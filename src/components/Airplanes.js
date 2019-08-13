import React, {Component} from 'react';
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
        <p key={plane.id}>
          {plane.name}
        </p>
      ))}
      </div>
    )
  }
}





export default Airplanes;
