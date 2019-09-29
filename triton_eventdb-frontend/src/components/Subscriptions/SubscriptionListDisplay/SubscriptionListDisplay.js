import React from "react";
import "./SubscriptionListDisplay.css";

const SubscriptionListDisplay = props => (
  <div className="following-display__list-container">
    {props.subscriptions.map(subscription => {
      return (
        <div key={subscription._id} className="following-display__event-div">
          <div>
            <img
              className="event-image"
              src={require(`./../../../assets/images/${subscription.event.image}`)}
              alt="event"
            />
          </div>
          <div className="subscribe-event-title-main-div">
            <h1>{subscription.event.title}</h1>
          </div>
          <div className="booking-display__list-item-content">
            <div>
              <div className="booking-display__list-item-content-date-month">
                {new Date(subscription.createdAt).toLocaleString("default", {
                  month: "short"
                })}
              </div>
              <div>
                {new Date(subscription.createdAt).toLocaleString("default", {
                  day: "numeric"
                })}
              </div>
            </div>
            <div className="booking-display__list-item-data">
              <div>
                <p> {new Date(subscription.createdAt).toLocaleDateString()}</p>
              </div>

              <div>
                <p>{subscription.event.location}</p>
              </div>
              <button onClick={props.onDelete.bind(this, subscription._id)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

export default SubscriptionListDisplay;
