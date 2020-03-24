import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import MainNavigation from "./components/Navigation/MainNavigation";
import AuthUserPage from "./component-pages/AuthUser";
import ContactUsPage from "./component-pages/ContactUs";
import EventsPage from "./component-pages/Events";
import SubscriptionsPage from "./component-pages/Subscriptions";
import EventItemDetail from "./components/Events/EventItemDetail/EventItemDetail";
import AboutPage from "./component-pages/About";
import Test from "./component-pages/Test";
import "./App.css";
import { map } from "async";

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  render() {
    return (
      <BrowserRouter>
        <MainNavigation />
        <main className="main-content">
          <Switch>
            <Route path="/event-detail" component={EventItemDetail} exact />
            <Route path="/about" component={AboutPage} exact />
            <Route path="/contact-us" component={ContactUsPage} exact />
            {console.log(this.props.user.token)}
            {this.props.user.token && <Redirect from="/" to="/events" exact />}
            {this.props.user.token && (
              <Redirect from="/auth-user" to="/events" exact />
            )}
            {!this.props.user.token && (
              <Route path="/auth-user" component={AuthUserPage} />
            )}
            <Route
              path="/events"
              render={props => <EventsPage isAuthed={true} />}
            />
            {this.props.user.token && (
              <Route path="/my-subscriptions" component={SubscriptionsPage} />
            )}
            {!this.props.user.token && <Redirect to="/auth-user" exact />}
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setName: name => {
      dispatch({
        type: "SET_NAME",
        payload: name
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
