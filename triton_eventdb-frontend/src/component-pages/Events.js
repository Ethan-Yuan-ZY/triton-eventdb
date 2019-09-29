import React, { Component } from "react";
import axios from "axios";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

import EventListDisplay from "./../components/Events/EventListDisplay/EventListDisplay";
import RenderingSpinner from "./../components/RenderingSpinner/RenderingSpinner";
import AuthContext from "../context/auth-context";
import "./Events.css";

class EventsPage extends Component {
  state = {
    create: false,
    events: [],
    isRendering: false,
    eventTitle: "",
    eventLocation: "",
    eventDate: "",
    eventDescription: "",
    filesToBeSent: [],
    file: null
  };

  isActive = true;

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("http://localhost:4000/upload", formData, config)
      .then(response => {
        console.log("..........................");
      })
      .catch(error => {});
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  onDrop(acceptedFiles, rejectedFiles) {
    var filesToBeSent = this.state.filesToBeSent;
    filesToBeSent.push(acceptedFiles);
    this.setState({ filesToBeSent });
  }

  componentDidMount() {
    this.fetchEvents();
  }

  static contextType = AuthContext;

  invokeCreateEventHandler = () => {
    this.setState({
      create: true
    });
  };

  test = {
    dialogPaper: {
      minHeight: "80vh",
      maxHeight: "80vh"
    }
  };

  modalConfirmHandler = () => {
    this.setState({ create: false });
    const title = this.state.eventTitle;
    const image = "IMAGE-UPLOAD-" + this.state.file.name;
    console.log(image);

    const location = this.state.eventLocation;
    const description = this.state.eventDescription;
    const date = this.state.eventDate;
    console.log(this.state.file);

    if (
      title.trim().length === 0 ||
      location.trim().length === 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }

    const event = { title, image, location, description, date };
    console.log(event);
    console.log(image);

    const requestBody = {
      query: `
          mutation {
            postEvent(eventInput: {title: "${title}", image:"${image}", location: "${location}", description: "${description}", date: "${date}"}){
              _id
              title
              image
              location
              description
              date
            }
          }
        `
    };

    const token = this.context.token;

    fetch("http://localhost:4000/graphqlAPI", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
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
          const updatedEventList = [...prevState.events];
          updatedEventList.push({
            _id: resData.data.postEvent._id,
            title: resData.data.postEvent.title,
            image: resData.data.postEvent.image,
            description: resData.data.postEvent.description,
            date: resData.data.postEvent.date,
            location: resData.data.postEvent.location,
            poster: {
              _id: this.context.userId
            }
          });
          return { events: updatedEventList };
        });
        this.fetchEvents();
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange(file) {
    this.setState({
      file: file
    });
  }

  modalCancelHandler = () => {
    this.setState({ create: false });
  };

  fetchEvents() {
    this.setState({ isRendering: true });
    const requestBody = {
      query: `
          query {
            events {
              _id
              title
              image
              description
              location
              date
              poster {
                _id
                email
                username
              }
            }
          }
        `
    };

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
        const events = resData.data.events;
        if (this.isActive) {
          this.setState({ events: events, isRendering: false });
        }
      })
      .catch(err => {
        console.log(err);
        if (this.isActive) {
          this.setState({ isRendering: false });
        }
      });
  }

  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>
        {this.state.create && (
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.create}
            onClose={this.modalCancelHandler}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div className="testing">
              <div className="post-event-divider-div">
                <div className="important-pic"></div>

                <p className="test-p"></p>
                <div className="post-event-form-content-main-div">
                  <div className="post-event-form-content-div">
                    <div className="test-div">
                      <h1>Share Your Event!</h1>
                      <p>
                        With more than 500 student organizations on campus,
                        there is no shortage of opportunities to express
                        yourself, grow into a leader and make meaningful
                        connections.
                      </p>
                    </div>
                    <form>
                      <div className="form-control">
                        <div className="login-page__label-div">
                          <label htmlFor="title">Title</label>
                        </div>

                        <TextField
                          required
                          type="text"
                          value={this.state.eventTitle}
                          onChange={e =>
                            this.setState({ eventTitle: e.target.value })
                          }
                          id="eventTitle"
                          variant="outlined"
                          fullWidth
                        />
                      </div>

                      <div className="form-control">
                        <div className="login-page__label-div">
                          <label htmlFor="location">Location</label>
                        </div>

                        <TextField
                          required
                          type="text"
                          value={this.state.eventLocation}
                          onChange={e =>
                            this.setState({ eventLocation: e.target.value })
                          }
                          id="eventLocation"
                          variant="outlined"
                          fullWidth
                        />
                      </div>

                      <div className="form-control">
                        <div className="login-page__label-div">
                          <label htmlFor="date">Date</label>
                        </div>

                        <TextField
                          required
                          type="date"
                          value={this.state.eventDate}
                          onChange={e =>
                            this.setState({ eventDate: e.target.value })
                          }
                          id="eventDate"
                          variant="outlined"
                          fullWidth
                        />
                      </div>

                      <div className="form-control">
                        <div className="login-page__label-div">
                          <label htmlFor="description">Description</label>
                        </div>

                        <TextField
                          required
                          type="text"
                          value={this.state.eventDescription}
                          onChange={e =>
                            this.setState({ eventDescription: e.target.value })
                          }
                          id="eventDescription"
                          variant="outlined"
                          fullWidth
                        />
                      </div>
                    </form>

                    <form onSubmit={this.onFormSubmit}>
                      <h1>File Upload</h1>
                      <input
                        type="file"
                        name="myImage"
                        onChange={this.onChange}
                      />
                      <button type="submit">Upload</button>
                    </form>

                    <div>
                      <button onClick={this.modalConfirmHandler.bind(this)}>
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}

        <div className="events-main-jumbotron-div">
          <div className="events-main-jumbotron-title-section-div">
            <div>
              <h1>The Home of UCSD student events</h1>
            </div>
            <p>
              We invite the broader community to take part in regular events,
              including our flagship Design@Large lecture series held every
              Wednesday from 4-5pm in CSE 1202 on the UCSD campus, studio
              sessions, conferences, and workshops.
            </p>
            <div>
              <button className="events-main-jumbotron-content-button">
                Learn More
              </button>
            </div>
          </div>
        </div>
        {this.context.token && (
          <div className="events-post-event-main-div">
            <div className="events-post-event-add-event-button-div">
              <Fab
                size="medium"
                aria-label="add"
                onClick={this.invokeCreateEventHandler}
                style={{ background: "#ededed", color: "#182b49" }}
              >
                <AddIcon />
              </Fab>
            </div>
            <div className="events-post-event-add-event-header-div">
              <p className="events-post-event-add-event-main-para">
                Add to Event Database
              </p>
              <p>Share the event on your mind </p>
            </div>
          </div>
        )}
        {this.state.isRendering ? (
          <RenderingSpinner />
        ) : (
          <EventListDisplay
            eventList={this.state.events}
            eventAuthUserId={this.context.userId}
            test={this.context.token}
          />
        )}
      </React.Fragment>
    );
  }
}

export default EventsPage;
