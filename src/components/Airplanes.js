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

      <h1> Airplane coming soon </h1>
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
        <form onSubmit={this._handleSubmit} >
         <label>Name</label>
         <input type="text" onInput={this._handleInputName} />
         <br />
         <label>Rows</label>
         <input type="number" onInput={this._handleInputRows} />
         <br />
         <label>Columns</label>
         <input type="number" onInput={this._handleInputColumns} />
         <br />
         <input type="submit" value= "Save Airplane" />
         <br />
       </form>
    );
  }
}



export default Airplanes;
