import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AuthContext from "./context/auth-context";
import MainNavigation from "./components/Navigation/MainNavigation";
import AuthUserPage from "./component-pages/AuthUser";
import ContactUsPage from "./component-pages/ContactUs";
import EventsPage from "./component-pages/Events";
import SubscriptionsPage from "./component-pages/Subscriptions";
import EventItemDetail from "./components/Events/EventItemDetail/EventItemDetail";
import AboutPage from "./component-pages/About";
import "./App.css";

export default class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({
      token: null,
      userId: null
    });
  };
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <MainNavigation />
            <main className="main-content">
              <Switch>
                <Route path="/event-detail" component={EventItemDetail} exact />
                <Route path="/about" component={AboutPage} exact />
                <Route path="/contact-us" component={ContactUsPage} exact />

                {this.state.token && <Redirect from="/" to="/events" exact />}
                {this.state.token && (
                  <Redirect from="/auth-user" to="/events" exact />
                )}
                {!this.state.token && (
                  <Route path="/auth-user" component={AuthUserPage} />
                )}
                <Route
                  path="/events"
                  render={props => <EventsPage isAuthed={true} />}
                />

                {this.state.token && (
                  <Route
                    path="/my-subscriptions"
                    component={SubscriptionsPage}
                  />
                )}
                {!this.state.token && <Redirect to="/auth-user" exact />}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
