/* eslint-disable object-shorthand */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { setInStorage } from '../../utils/storage';
import $ from 'jquery';

const crypto = require('crypto');

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      usernameValid: 'is-invalid',
      emailValid: 'is-invalid',
      passwordValid: 'is-invalid',
      confirmPasswordValid: 'is-invalid',
    };
  }


  usernameValidation(e) {
    const { username } = this.state;
    this.setState({
      username: e.target.value,
    });
    if (username.length > 4) {
      this.setState({
        usernameValid: 'is-valid',
      });
    } else {
      this.setState({
        usernameValid: 'is-invalid',
      });
    }
  }

  emailValidation(e) {
    const { email } = this.state;
    this.setState({
      email: e.target.value,
    });
    if (email.includes('@') && email.length > 3) {
      this.setState({
        emailValid: 'is-valid',
      });
    } else {
      this.setState({
        emailValid: 'is-invalid',
      });
    }
  }

  passwordValidation(e) {
    const { password } = this.state;
    this.setState({
      password: e.target.value,
    });
    if (password.length > 4) {
      this.setState({
        passwordValid: 'is-valid',
      });
    } else {
      this.setState({
        passwordValid: 'is-invalid',
      });
    }
  }

  confirmPasswordValidation(e) {
    const { password, confirmPassword } = this.state;
    const pass = password;
    pass.slice(0, -1);
    this.setState({
      confirmPassword: e.target.value,
    });
    if (confirmPassword === pass.slice(0, -1)) {
      this.setState({
        confirmPasswordValid: 'is-valid',
      });
    } else {
      this.setState({
        confirmPasswordValid: 'is-invalid',
      });
    }
  }

  handleSubmit(e) {
    const { password, username, email, redirect } = this.state;
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/signup',
      datatype: 'json',
      data: {
        user: username,
        email: email,
        pass: password,
      },
      success: (data) => {
        console.log(data);
        setInStorage('token', data.token)
          this.setState({
            redirect: 'home',
          })
      },
      error: (err) => {
        if (err.responseText === 'Error: Username can not be blank.') {
          alert(err.responseText);
        } else if (err.responseText === 'Error: Email can not be blank!') {
          alert(err.responseText);
        } else if (err.responseText === 'Error: Password can not be blank') {
          alert(err.responseText);
        } else if (err.responseText === 'Error: Server error') {
          alert(err.responseText);
        } else if (err.responseText === 'Error: Account already exists.') {
          alert(err.responseText);
          this.setState({
            redirect: 'login',
          })
        } else {
          console.log(err, 'err');
        }
      },
    });
  }

  signUp() {
    const {
      usernameValid, emailValid, passwordValid, confirmPasswordValid,
    } = this.state;
    return (
      <div id="signUpForm" className="bg-light border border-top-0 border-bottom-0 rounded col-md-4">
        <br />
        <p className="h1 text-center">Sign Up</p>
        <p className="text-center">It's free and only takes a minute.</p>
        <br />
        <hr
          style={{
            color: '#F2F2F2',
            backgroundColor: '#F2F2F2',
            height: 1,
          }}
        />
        <br />
        <form onSubmit={this.handleSubmit.bind(this)} className="needs-validation">
          <div className="form-group col-sm">
            <label className="font-weight-bold">Username</label>
            <input onChange={this.usernameValidation.bind(this)} type="text" className={`form-control ${usernameValid}`} placeholder="Enter Username" />
            <div className="valid-feedback">
        Looks Good!
            </div>
            <div className="invalid-feedback">
        Please enter a valid Username!
            </div>
          </div>
          <div className="form-group col-sm">
            <label className="font-weight-bold">Email</label>
            <input onChange={this.emailValidation.bind(this)} type="email" className={`form-control ${emailValid}`} placeholder="Enter Email" />
            <div className="valid-feedback">
        Looks Good!
            </div>
            <div className="invalid-feedback">
        Please enter a valid Email!
            </div>
          </div>
          <div className="form-group col-sm">
            <label className="font-weight-bold">Password</label>
            <input onChange={this.passwordValidation.bind(this)} type="password" className={`form-control ${passwordValid}`} placeholder="Enter Password" />
            <div className="valid-feedback">
        Looks Good!
            </div>
            <div className="invalid-feedback">
        Please enter a valid Password!
            </div>
          </div>
          <div className="form-group col-sm">
            <label className="font-weight-bold">Confirm Password</label>
            <input onChange={this.confirmPasswordValidation.bind(this)} type="password" className={`form-control ${confirmPasswordValid}`} placeholder="Confirm Password" />
            <div className="valid-feedback">
        Looks Good!
            </div>
            <div className="invalid-feedback">
        Please confirm Password!
            </div>
            <br />
            <button type="submit" className="btn btn-success btn-lg btn-block">Sign Up</button>
          </div>
          <br />
          <hr
            style={{
              color: '#F2F2F2',
              backgroundColor: '#F2F2F2',
              height: 1,
            }}
          />
          <br />
          <p className="text-center">Already have an account?</p>
          <a href="http://localhost:3000/#/login"><p className="text-center">Login</p></a>
        </form>
      </div>

    );
  }

  renderView() {
    const { redirect } = this.state;
    if (redirect === 'home') {
      // location.reload()
      return <Redirect to="/home" />;
    }
    if (redirect === 'login') {
      return <Redirect to="/login" />
    }
    return (
      this.signUp()

    );
  }

  render() {
    return (
      this.renderView()
    )
  }
}

export default Signup;
