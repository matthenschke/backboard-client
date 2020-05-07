import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  card: {
    display: "flex",
  },
};
const Scream = ({ classes }) => {
  console.log(classes);
  return <div></div>;
};

export default withStyles(styles)(Scream);
