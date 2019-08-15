import React from 'react';

import { HashRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Reservation from './components/Reservation';
import Airplanes from './components/Airplanes';
import Flights from './components/Flights';
import Search from './components/Search';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';
import App from './components/App';
const Routes = (
    <Router>
      <div>
      <NavLink/>
        <div>
        <Switch>

        <Route path="/flights/:id" component={ Reservation } />
        <Route exact path="/airplanes" component={ Airplanes } />
        <Route exact path="/flights" component={ Flights } />
        <Route exact path="/search" component={ Search } />
        <Route exact path="/login" component={ LogIn } />
        <Route exact path="/logout" component={ LogOut } />
        <Route exact path="/" component={ App } />
        </Switch>
        </div>
      </div>
    </Router>

);



export default Routes;
