import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Airplanes from './components/Airplanes';
import Flights from './components/Flights';
import Search from './components/Search';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';
import App from './components/App';

const Routes = (
    <Router>
      <div>
        <Route exact path="/airplanes" component={ Airplanes } />
        <Route exact path="/flights" component={ Flights } />
        <Route exact path="/search" component={ Search } />
        <Route exact path="/login" component={ LogIn } />
        <Route exact path="/logout" component={ LogOut } />
        <Route exact path="/" component={ App } />
      </div>
    </Router>
);

export default Routes;
