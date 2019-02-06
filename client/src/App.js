/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  Router, Route, Link, IndexRoute, hashHistory, browserHistory, Switch,
} from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-awesome-modal';
import $ from 'jquery';
import Routes from './Routes';
import Login from './components/login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <Routes />
    );
  }
}

export default App;
