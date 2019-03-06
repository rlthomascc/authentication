import React, { Component } from 'react';
import { getFromStorage } from '../../utils/storage';
import $ from 'jquery';
import {  Redirect } from 'react-router-dom';

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
    const token = getFromStorage('token');
    // const token = this.props.location.state.token
    if (token.length > 1) {
      //verify the token
      $.ajax({
        method: 'GET',
        url: '/verify',
        data: {
          token: token
        },
        success: (data) => {
          this.setState({
            token: token,
            isLoading: false,
          })
        }, 
        error: (err) => {
          this.setState({
            isLoading: false,
          })
          console.log(err, 'error')
          return <Redirect to="/login" />
        }
      })
    }
  }

  logout() {
    const token = getFromStorage('token');
    this.setState({
      redirect: 'login',
      token: '',
    })
    $.ajax({
      method: "PATCH",
      url: '/logout',
      data: {
        token: token
      },
      success: (data) => {
        console.log(data, 'data in patch')
      },
      error: (err) => {
        console.log('err')
      }
    })
  }

  homePage() {
    const {isLoading, token} = this.state
    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
    if (!token) {
      return <Redirect to='/signup' />
    }
    if (token) {
      return (
        <div id="logout">
          <button type="submit" className="btn btn-danger btn-lg" onClick={(this.logout.bind(this))}>Log Out</button>
        </div>
      )
    }
    console.log('ERROR')
  }

  render() {
    const { redirect } = this.state
    if (redirect === 'login') {
      location.reload()
      return <Redirect to="/login" />
    }
    if (redirect === '') {
      location.reload()
      return <Redirect to='/login' />
    }
    return (
      this.homePage()
    );
  }
}

export default Home;
