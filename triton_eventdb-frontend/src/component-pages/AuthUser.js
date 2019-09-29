import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AuthContext from "../context/auth-context";
import Divider from "@material-ui/core/Divider";
import { SocialIcon } from "react-social-icons";
import "./AuthUser.css";

export default class AuthUserPage extends Component {
  state = {
    isLogin: true,
    email: "",
    password: "",
    verifyPassword: "",
    username: ""
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    console.log("AuthUser Constructor");
  }

  switchModeHandler = () => {
    this.setState(prev => {
      return { isLogin: !prev.isLogin };
    });
  };

  submitButtonHandler = event => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    const username = this.state.username;
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    } else {
      let requestBody = {
        query: `
              query {
                loginUser(email: "${email}", password: "${password}"){
                  userId
                  token
                  tokenExpiration
                }
              }
            `
      };

      if (!this.state.isLogin) {
        requestBody = {
          query: `
                mutation {
                    registerUser(userInput: {email: "${email}", password: "${password}", username: "${username}"}){
                    _id
                    email
                  }
                }
              `
        };
      }

      fetch("http://localhost:4000/graphqlAPI", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed");
          } else {
            return res.json();
          }
        })
        .then(resData => {
          console.log(resData.data);

          if (this.state.isLogin) {
            console.log(resData.data);
            this.context.login(
              resData.data.loginUser.token,
              resData.data.loginUser.userId,
              resData.data.loginUser.tokenExpiration
            );
          }

          console.log(resData);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <div className="login-page__main-div">
        <div className="login-page__title-div">
          <div>
            <h1>Let's get started now!</h1>
            <p>Login right now to manage your events</p>
            <p>and see the events you are currently following</p>
          </div>
        </div>

        <div className="login-page__form-container-div">
          <form className="auth-form" onSubmit={this.submitButtonHandler}>
            <h2 className="login-page-form-header-h2">
              {this.state.isLogin ? "Login Account" : "Create Account"}
            </h2>
            {!this.state.isLogin && (
              <div className="form-control">
                <div className="login-page__label-div">
                  <label htmlFor="username">Username:</label>
                </div>

                <TextField
                  required
                  type="username"
                  value={this.state.username}
                  onChange={e => this.setState({ username: e.target.value })}
                  id="username"
                  variant="outlined"
                  fullWidth
                />
              </div>
            )}
            <div className="form-control">
              <div className="login-page__label-div">
                <label htmlFor="email">Email:</label>
              </div>

              <TextField
                required
                type="email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                id="email"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="form-control">
              <div className="login-page__label-div">
                <label htmlFor="passwrod">Password:</label>
              </div>

              <TextField
                required
                type="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                id="password"
                variant="outlined"
                fullWidth
              />
            </div>
            {this.state.isLogin && (
              <div className="form-control">
                <div className="login-page__label-div">
                  <label htmlFor="verifyPassword">Verify Password:</label>
                </div>

                <TextField
                  required
                  type="password"
                  value={this.state.verifyPassword}
                  onChange={e =>
                    this.setState({ verifyPassword: e.target.value })
                  }
                  id="verifyPassword"
                  variant="outlined"
                  fullWidth
                />
              </div>
            )}

            <div className="form-actions">
              <Button
                className="login-page-sign-in-main-button"
                type="submit"
                variant="contained"
                style={{ background: "#DFBD76", color: "#FFFFFF" }}
                fullWidth
              >
                Sign in
              </Button>
            </div>
          </form>
          <div className="login-page-form-bottom-button-main-div">
            <button onClick={this.switchModeHandler}>
              Switch to {this.state.isLogin ? "Sign up" : "Login"}
            </button>
            <button>Forget Password?</button>
          </div>
        </div>

        <div>
          <p className="connect-content-header-para">Connect with us!</p>
          <div>
            <SocialIcon url="http://twitter.com" />
            <SocialIcon url="http://facebook.com" />
            <SocialIcon url="http://linkedin.com" />
          </div>
          <div className="copy-right-content-div">
            <p> Copyright Ethan Yuan © 2019</p>
            <p>
              For education purpose, quesionts please contact
              ethanyuan1772@gmail.com
            </p>
          </div>
          <Divider />
        </div>
      </div>
    );
  }
}
