import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import noImg from "../../img/no-img.png";
import { Paper } from "@material-ui/core";

import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday,
} from "@material-ui/icons";

const styles = (theme) => ({
  ...theme.root,
  handle: {
    width: 60,
    height: 20,
    backgroundColor: theme.palette.primary.main,
    margin: "0  auto 7px auto",
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: "rgba(0,0,0, 0.3)",
    marginBottom: 10,
  },
  fullLine: {
    height: 15,
    width: "90%",
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0, 0.6)",
  },
  halfLine: {
    height: 15,
    width: "50%",
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0, 0.6)",
  },
});
const ProfileSkeleton = ({ classes }) => {
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="img-wrapper">
          <img src={noImg} alt="profile" className="profile-img" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr />
          <LocationOn color="primary" />
          <span> Location</span>
          <hr />
          <LinkIcon color="primary" />
          <span> website.com</span>
          <hr />
          <CalendarToday color="primary" />
          <span>Joined Date</span>
          <hr />
        </div>
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
