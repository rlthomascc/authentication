/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

class Routes extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/home" exact component={Home} />
        </div>
      </HashRouter>
    );
  }
}

export default Routes;
