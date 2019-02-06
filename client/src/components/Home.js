import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  homePage() {
    return (
      <div>
        <h1>YOU MADE IT!</h1>
      </div>
    );
  }

  render() {
    return (
      this.homePage()
    );
  }
}

export default Home;
