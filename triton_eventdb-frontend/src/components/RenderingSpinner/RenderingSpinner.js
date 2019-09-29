import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./RenderingSpinner.css";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

export default function RenderingSpinner() {
  const classes = useStyles();

  return (
    <div className="circular-progress-spinner">
      <CircularProgress className={classes.progress} />
    </div>
  );
}
