import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Reservation from './components/Reservation';
import Airplanes from './components/Airplanes';
import Flights from './components/Flights';
import Search from './components/Search';
import App from './components/App';

const Routes = (
    <Router>
      <div>

        <Route path="/flights/:id" component={ Reservation } />
        <Route exact path="/airplanes" component={ Airplanes } />
        <Route exact path="/flights" component={ Flights } />
        <Route exact path="/search" component={ Search } />
        <Route exact path="/" component={ App } />
      </div>
    </Router>
);

export default Routes;
