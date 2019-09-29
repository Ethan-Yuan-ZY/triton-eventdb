import React, { Component } from "react";
import AuthContext from "./../context/auth-context";
import RenderingSpinner from "./../components/RenderingSpinner/RenderingSpinner";
import SubscriptionListDisplay from "./../components/Subscriptions/SubscriptionListDisplay/SubscriptionListDisplay";

export default class SubscriptionsPage extends Component {
  state = {
    isRendering: false,
    subscriptions: []
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = () => {
    this.setState({ isRendering: true });
    const requestBody = {
      query: `
          query {
            subscriptions {
              _id
              createdAt
              event {
                _id
                title
                image
                date
                location
                description
              }
            }
          }
        `
    };

    fetch("http://localhost:4000/graphqlAPI", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token
      }
    })
      .then(res => {
        console.log("Lebron Jame");
        console.log(this.context.token);
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        } else {
          return res.json();
        }
      })
      .then(resData => {
        const subscriptions = resData.data.subscriptions;
        this.setState({ subscriptions: subscriptions, isRendering: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isRendering: false });
      });
  };

  unSubscribeEventHandler = subscriptionId => {
    this.setState({ isRendering: true });
    const requestBody = {
      query: `
          mutation {
            unsubscribeEvent(subscriptionId:"${subscriptionId}") {
              _id
              title
            

            }
          }
        `
    };

    fetch("http://localhost:4000/graphqlAPI", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token
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
        this.setState(prevState => {
          const updatedSubscriptions = prevState.subscriptions.filter(
            subscription => {
              return subscription._id !== subscriptionId;
            }
          );
          return { subscriptions: updatedSubscriptions, isRendering: false };
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isRendering: false });
      });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isRendering ? (
          <RenderingSpinner />
        ) : (
          <SubscriptionListDisplay
            subscriptions={this.state.subscriptions}
            onDelete={this.unSubscribeEventHandler}
            token={this.context.token}
          />
        )}
      </React.Fragment>
    );
  }
}
