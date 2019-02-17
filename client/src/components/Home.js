import React, { Component } from 'react';
import { getFromStorage, setInStorage } from '../../utils/storage';
import $ from 'jquery';
import { Route, HashRouter } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
    }
  }

  componentDidMount() {
    const token = getFromStorage('the_main_app');
    if (token) {
      // Verify the token
      fetch(`/verify?token=${token}`)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            token: token,
            isLoading: false,
          })
        } else {
          this.setState({
            isLoading: false,
          })
        }
      });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  homePage() {
    const {isLoading} = this.state
    if (isLoading) {
      return (
        <div>
          {/* //LOADING */}
          <p>Loading...</p>
        </div>
      );
    }
        return (
        <div id="logout">
          <button type="submit" className="btn btn-danger btn-lg">Log Out</button>
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
