/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { setInStorage } from '../../utils/storage';
import $ from 'jquery';


const crypto = require('crypto');


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: '',
      password: '',
      email: '',
      emailValid: 'is-invalid',
      passwordValid: 'is-invalid',
    };
  }

  saltHashPass() {
    const { password } = this.state;
    const salt = crypto.randomBytes(Math.ceil(password.length / 2))
      .toString('hex')
      .slice(0, password.length);
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    const saltHashPass = {
      salt,
      passwordHash: value,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.saltHashPass();
    const { email, password } = this.state;
    $.ajax({
      method: 'POST',
      url: '/login',
      data: {
        Email: email,
        Pass: password,
      },
      success: (data) => {
        console.log(data);
        this.setState({
          redirect: 'home',
          token: data.token,
        })
        setInStorage('token', data.token)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  emailValidation(e) {
    this.setState({
      email: e.target.value,
    });
    const { email } = this.state;
    if (email.includes('@')) {
      this.setState({
        emailValid: 'is-valid',
      });
    } else if (!email.includes('@')) {
      this.setState({
        emailValid: 'is-invalid',
      });
    }
  }

  passwordValidation(e) {
    this.setState({
      password: e.target.value,
    });
    const { password } = this.state;
    if (password.length > 4) {
      this.setState({
        passwordValid: 'is-valid',
      });
    } else if (password.length < 4) {
      this.setState({
        passwordValid: 'is-invalid',
      });
    }
  }

  login() {
    const { emailValid, passwordValid } = this.state;
    return (
      <div id="loginForm" className="bg-light col-sm-4 border border-bottom-0 border-top-0">
        <p className="h1 text-center">Log In</p>
        <br />
        <hr
          style={{
            color: '#F2F2F2',
            backgroundColor: '#F2F2F2',
            height: 1,
          }}
        />
        <br />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group col-sm">
            <label className="font-weight-bold">Email Address</label>
            <input onChange={this.emailValidation.bind(this)} type="email" className={`form-control ${emailValid}`} placeholder="Enter email" />
            <div className="invalid-feedback">
            Please insert a valid Email Address!
            </div>
            <div className="valid-feedback">
            Looks Good!
            </div>
          </div>
          <div className="form-group col-sm">
            <label className="font-weight-bold">Password</label>
            <input onChange={this.passwordValidation.bind(this)} type="password" className={`form-control ${passwordValid}`} placeholder="Enter password" />
            <div className="invalid-feedback">
          Please enter a valid Password!
            </div>
            <div className="valid-feedback">
          Looks Good!
            </div>
            <br />
            <button type="submit" className="btn btn-success btn-lg btn-block">Submit</button>
            <br />
            <a href="http://google.com/"><p className="text-right font-italic">Forgot Password</p></a>
          </div>
        </form>
        <hr
          style={{
            color: '#F2F2F2',
            backgroundColor: '#F2F2F2',
            height: 1,
          }}
        />
        <br />
        <p className="text-center">Don't have an account, yet? </p>
        <a href="http://localhost:3000/#/signup"><p className="text-center">Sign Up</p></a>
      </div>
    );
  }

  render() {
    const {redirect, token} = this.state
    if (redirect === 'home') {
      location.reload()
      return <Redirect to={{
        pathname: "/home",
        state: {token: token}
      }} />
    }
    return (
      this.login()
    );
  }
}

export default Login;
