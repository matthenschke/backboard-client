import React, { Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday,
  Edit,
  KeyboardReturn,
} from "@material-ui/icons";

const styles = (theme) => ({
  ...theme.root,
  paper: {
    padding: 20,
  },
  profile: {
    "& .img-wrapper": {
      textAlign: "center",
    },
    "& .profile-img": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#17408B",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
  },
});
const StaticProfile = ({
  classes,
  profile: { handle, createdAt, imageUrl, bio, website, location },
}) => {
  return (
    <Fragment>
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="img-wrapper">
            <img src={imageUrl} alt="profile" className="profile-img" />
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink component={Link} to={`/users/${handle}`} variant="h5">
              @{handle}
            </MuiLink>
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {"  "}
                  {website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
        </div>
      </Paper>
    </Fragment>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(StaticProfile);
