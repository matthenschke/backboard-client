import React from "react";
import PropTypes from "prop-types";
import CustomButton from "./CustomButton";
import DeleteScream from "./DeleteScream";

import { useDispatch, useSelector } from "react-redux";
import { unlikeScream, likeScream } from "../redux/actions/dataActions";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { Link } from "react-router-dom";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    position: "relative",
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
  const dispatch = useDispatch();
  const {
    user: {
      likes,
      authenticated,
      credentials: { handle: curHandle },
    },
  } = useSelector((state) => state);
  const likedScream = () => {
    if (likes && likes.find((like) => like.screamId === screamId)) return true;
    return false;
  };

  const like = () => {
    console.log(screamId);
    dispatch(likeScream(screamId));
  };
  const unlike = () => {
    dispatch(unlikeScream(screamId));
  };

  const likeButton = authenticated ? (
    likedScream() ? (
      <CustomButton tipTitle="Undo like" onClick={unlike}>
        <FavoriteIcon color="primary" />
      </CustomButton>
    ) : (
      <CustomButton tipTitle="like" onClick={like}>
        <FavoriteBorder color="primary" />
      </CustomButton>
    )
  ) : (
    <CustomButton tipTitle="like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </CustomButton>
  );
  const deleteButton =
    authenticated && userHandle === curHandle ? (
      <DeleteScream screamId={screamId} />
    ) : null;
  return (
    <Card key={screamId} className={classes.card}>
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
        {likeButton}
        <span>{likeCount} Like(s)</span>
        <CustomButton tipTitle="comments">
          <ChatIcon color="primary" />
        </CustomButton>
        <span>{commentCount} Comment(s)</span>
        {deleteButton}
      </CardContent>
    </Card>
  );
};
Scream.propTypes = {
  classes: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
};
export default withStyles(styles)(Scream);
