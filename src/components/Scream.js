import React from "react";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
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
          {createdAt}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Scream);
