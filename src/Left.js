import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  left: {
    width: "30%",
    height: "100vw",
  },
}));

export default function LeftPage() {
  const classes = useStyles();
  return (
    <div className={classes.left}>
      <p> ini adalah konten Left</p>
    </div>
  );
}
