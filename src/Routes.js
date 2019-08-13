import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Airplanes from './components/Airplanes';
import App from './components/App';

const Routes = (
    <Router>
      <div>
        <Route exact path="/airplanes" component={ Airplanes } />
        <Route exact path="/" component={ App } />
      </div>
    </Router>
);

export default Routes;
