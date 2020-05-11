import React from "react";
import PropTypes from "prop-types";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },

  image: {
    minWidth: 200,
    objectFit: "cover",
  },

  content: {
    padding: 30,
  },
};
const Scream = ({
  classes,
  scream: {
    userImage,
    body,
    createdAt,
    userHandle,
    screamId,
    likeCount,
    commentCount,
  },
}) => {
  dayjs.extend(relativeTime);
  return (
    <Card className={classes.card}>
      <CardMedia image={userImage} className={classes.image} />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          color="primary"
          component={Link}
          to={`/users/${userHandle}`}
        >
          {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
};
Scream.propTypes = {
  classes: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
};
export default withStyles(styles)(Scream);
