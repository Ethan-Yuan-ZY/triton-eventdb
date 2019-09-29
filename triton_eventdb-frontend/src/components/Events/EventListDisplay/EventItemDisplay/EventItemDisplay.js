import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./EventItemDisplay.css";

export default class EventItemDisplay extends Component {
  state = {};

  constructor(props) {
    super(props);
    console.log("EventItemDisplay.js");
  }

  render() {
    return (
      <div key={this.props.eventId} className="event-display__item-main-div">
        <div>
          <div>
            <div className="event-image-div">
              <img
                className="event-image"
                src={require(`./../../../../../src/assets/images/${this.props.image}`)}
                alt="hihi"
              />
            </div>
          </div>
          <div className="event-title-main-div">
            <h1>{this.props.title}</h1>
          </div>
          <div className="event-display__item-content-main-div">
            <div>
              <div className="event-display__list-item-content-date-month">
                {new Date(this.props.date).toLocaleString("default", {
                  month: "short"
                })}
              </div>
              <div>
                {new Date(this.props.date).toLocaleString("default", {
                  day: "numeric"
                })}
              </div>
            </div>
            <div>
              <div>{new Date(this.props.date).toLocaleDateString()}</div>
              <div>Geisel Library</div>

              <div>
                {this.props.userId === this.props.posterId ? (
                  <button className="event__edit-event-button">
                    Edit Event
                  </button>
                ) : (
                  <Link
                    to={{
                      pathname: "/event-detail",
                      state: {
                        id: this.props.eventId,
                        title: this.props.title,
                        location: this.props.location,
                        description: this.props.description,
                        posterUsername: this.props.posterUsername,
                        token: this.props.token
                      }
                    }}
                  >
                    <button className="event__view-detail-button">
                      View More
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
