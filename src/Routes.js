import React, { Component } from 'react';
import { Router, Switch, Route } from "react-router-dom";

import LoginUser from './auth/LoginUser';
import RegisterUser from './auth/RegisterUser';
import MyTable from './components/MyTable';
import history from './history';

class Routes extends Component {
    state = {  }
    render() { 
        return ( 
            <Router history={history}>
                <Switch>
                    <Route exact path="/"  component={LoginUser} />
                    <Route exact path="/login-user"  component={LoginUser} />
                    <Route exact path="/register-user" component={RegisterUser} />
                    <Route exact path="/kpi-table" component={MyTable} />
                </Switch>
            </Router>
        );
    }
}
 
export default Routes;