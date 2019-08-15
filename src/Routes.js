import React from 'react';
import { HashRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Airplanes from './components/Airplanes';
import Flights from './components/Flights';
import Search from './components/Search';
import App from './components/App';
const Routes = (
<Router>
    <div>
        <NavLink/>
        <div>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/airplanes/new" component={ Airplanes } />                       
            <Route exact path="/flights/new" component={ Flights } />
            <Route exact path="/search" component={ Search } />
        </Switch>
        </div>
    </div>
</Router>
);



export default Routes;
