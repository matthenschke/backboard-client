import React from "react";
import PropTypes from "prop-types";
import CustomButton from "../Utils/CustomButton";
import DeleteBucketButton from "./DeleteBucketButton";
import BucketDialog from "./BucketDialog";
import LikeButton from "./LikeButton";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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
const Bucket = ({
  classes,
  bucket: {
    userImage,
    body,
    createdAt,
    userHandle,
    bucketId,
    likeCount,
    commentCount,
  },

  openDialog,
}) => {
  dayjs.extend(relativeTime);

  const {
    user: {
      authenticated,
      credentials: { handle: curHandle },
    },
  } = useSelector((state) => state);

  const deleteButton =
    authenticated && userHandle === curHandle ? (
      <DeleteBucketButton bucketId={bucketId} />
    ) : null;
  return (
    <Card key={bucketId} className={classes.card}>
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
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton bucketId={bucketId} />
        <span>{likeCount} Like(s)</span>
        <CustomButton tipTitle="comments">
          <ChatIcon color="primary" />
        </CustomButton>
        <span>{commentCount} Comment(s)</span>
        <BucketDialog
          bucketId={bucketId}
          userHandle={userHandle}
          openDialog={openDialog}
        />
      </CardContent>
    </Card>
  );
};
Bucket.propTypes = {
  classes: PropTypes.object.isRequired,
  bucket: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};
export default withStyles(styles)(Bucket);
