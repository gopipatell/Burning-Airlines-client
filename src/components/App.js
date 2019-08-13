import React, {Component} from 'react';
import Airplanes from './Airplanes';
import {Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      Home - 
      <Link to="/airplanes">Airplanes</Link>
    </div>
  );
}

export default App;
