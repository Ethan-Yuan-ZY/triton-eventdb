import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import CommentOutlined from "@material-ui/icons/CommentOutlined";

import "./EventItemDetail.css";

class EventItemDetail extends Component {
  state = {
    title: null,
    location: null,
    date: null,
    description: null
  };

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this); // i think you are missing this
  }

  subscribeToEventHandler() {
    console.log(this.state.id);
    console.log(this.state.token);
    const requestBody = {
      query: `
          mutation {
            subscribeEvent(eventId: "${this.state.id}") {
              _id
            }
          }
        `
    };

    fetch("http://localhost:4000/graphqlAPI", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.token
      }
    })
      .then(res => {
        console.log("In event item detail res");
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        } else {
          return res.json();
        }
      })
      .then(resData => {
        console.log(resData);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    const {
      title,
      location,
      date,
      description,
      posterUsername,
      token,
      id
    } = this.props.location.state;
    this.setState({
      title: title,
      location: location,
      date: date,
      description: description,
      posterUsername: posterUsername,
      token: token,
      id: id
    });
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="event-item-detail__main-div">
        <div className="event-item-detail__event-content-main-div">
          <div className="partition-top">
            <img
              className="event-detail__image"
              src={require("./../../../assets/images/eventtemptemp.png")}
              alt="empty"
            />
            <h1>{this.state.title}</h1>
          </div>

          <div className="partition-bottom">
            <div className="event-item-detail__event-content-card-div">
              <div className="event-item-detail__event-content-container-div">
                <div>
                  <p>Description:</p>

                  <p>{this.state.description}</p>
                </div>
                <div>
                  <p>Location:</p>
                  <p>Geisel Library</p>
                </div>
                <div>
                  <p>Date:</p>
                  <h3>{this.state.date}</h3>
                </div>
                <div>
                  <button onClick={this.goBack}>Go Back</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="event-item-detail__user-public-content-main-div">
          <div className="event-item-detail__user-content-user-info-div">
            <div className="event-item-detail__user-info-content-div">
              <div className="event-item-detail__user-info-content-card-div">
                <div className="event-item-detail-user-info-content-user-display-main-div">
                  <Avatar aria-label="recipe">U</Avatar>
                  <div className="event-item-detail-user-info-content-user-display-username-div">
                    <h1>{this.state.posterUsername}</h1>
                    <p>San Francico</p>
                  </div>
                </div>

                <div className="user-display-info-div">
                  <div className="event-item-deatil-user-info-content-user-num-events-div">
                    <p>70 Events</p>
                    <p className="event-item-detail-user-info-user-num-events-outline"></p>
                  </div>

                  <div className="event-item-deatil-user-info-content-user-event-subscribers-num-div">
                    <p>70 Event Followers</p>
                    <p className="event-item-detail-user-info-user-event-subscribers-num-outline"></p>
                  </div>
                </div>
                {this.state.token && (
                  <button onClick={this.subscribeToEventHandler.bind(this)}>
                    suscribe event
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="event-item-detail__user-content-public-info-div">
            <div className="event-item-detail__public-info-content-div">
              <div className="event-item-detail__user-info-content-card-div">
                <div className="user-seen-leave-comments-prompt">
                  <div>
                    <img
                      src={require("./../../../assets/images/usertemp.png")}
                      alt="user"
                      style={{ height: 64 }}
                    />
                  </div>
                  <div className="discussion-board-div">
                    <p>join the discussion...</p>
                  </div>
                </div>

                <div className="user-seen-other-use-comments">
                  <div>
                    <img
                      src={require("./../../../assets/images/usertemp.png")}
                      alt="user"
                      style={{ height: 64 }}
                    />
                    <p>user</p>
                  </div>
                  <div className="other-user-respond-comments">
                    <div className="other-user-respond-parts">
                      <div className="event-item-detail-other-user-comment-content-div">
                        <p className="event-item-detail-other-user-comment-content-user-mention-p">
                          @User
                        </p>
                        <p className="event-item-detail-other-user-comment-content-timestamp-p">
                          Last Monday 11:57 pm
                        </p>
                        <p className="event-item-detail-other-user-comment-content-comment-p">
                          I love this event! I will recommend to attend
                        </p>
                      </div>
                    </div>
                    <div className="event-comments-icon-main-div">
                      <div>
                        <KeyboardArrowUp />
                      </div>
                      <div>
                        <KeyboardArrowDown />
                      </div>
                      <div>
                        <CommentOutlined />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="user-seen-other-use-comments">
                  <div>
                    <img
                      src={require("./../../../assets/images/usertemp.png")}
                      alt="user"
                      style={{ height: 64 }}
                    />
                    <p>user</p>
                  </div>
                  <div className="other-user-respond-comments">
                    <div className="other-user-respond-parts">
                      <div className="event-item-detail-other-user-comment-content-div">
                        <p className="event-item-detail-other-user-comment-content-user-mention-p">
                          @User
                        </p>
                        <p className="event-item-detail-other-user-comment-content-timestamp-p">
                          Last Monday 11:57 pm
                        </p>
                        <p className="event-item-detail-other-user-comment-content-comment-p">
                          I love this event! I will recommend to attend
                        </p>
                      </div>
                    </div>
                    <div className="event-comments-icon-main-div">
                      <div>
                        <KeyboardArrowUp />
                      </div>
                      <div>
                        <KeyboardArrowDown />
                      </div>
                      <div>
                        <CommentOutlined />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventItemDetail;
