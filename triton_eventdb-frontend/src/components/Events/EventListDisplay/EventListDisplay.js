import React from "react";
import EventItemDisplay from "./EventItemDisplay/EventItemDisplay";
import "./EventListDisplay.css";

const eventListDisplay = props => {
  const eventList = props.eventList.map(event => {
    console.log(event.poster);
    return (
      <EventItemDisplay
        key={event._id}
        eventId={event._id}
        title={event.title}
        image={event.image}
        location={event.location}
        date={event.date}
        description={event.description}
        userId={props.eventAuthUserId}
        posterId={event.poster._id}
        posterUsername={event.poster.username}
        token={props.test}
      />
    );
  });
  return <div className="event-display__list-container">{eventList}</div>;
};

export default eventListDisplay;
