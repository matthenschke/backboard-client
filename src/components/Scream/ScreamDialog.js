import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CustomButton from "../Utils/CustomButton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

import { useDispatch, useSelector } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";

import withStyles from "@material-ui/core/styles/withStyles";

import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import CircularProgress from "@material-ui/core/CircularProgress";
import ChatIcon from "@material-ui/icons/Chat";

import dayjs from "dayjs";

const styles = (theme) => ({
  ...theme.root,
  content: {},
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
  profileImg: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeBtn: {
    position: "absolute",
    left: "90%",
  },
  expandBtn: {
    position: "absolute",
    left: "90%",
  },
  spinnerWrapper: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0, 0.1)",
    marginBottom: 20,
  },
});

const ScreamDialog = ({ screamId, userHandle, classes }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    dispatch(getScream(screamId));
  };
  const handleClose = () => {
    dispatch(clearErrors());
    setOpen(false);
  };
  const {
    UI: { loading },
    data: {
      scream: { createdAt, commentCount, comments, likeCount, body, userImage },
    },
  } = useSelector((state) => state);
  const dialogMarkup = loading ? (
    <div className={classes.spinnerWrapper}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={16}>
      <Grid item sm={5}>
        <img
          src={userImage}
          alt={`${userHandle} profile pic`}
          className={classes.profileImg}
        />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} likes</span>
        <CustomButton tipTitle="comments">
          <ChatIcon color="primary" />
        </CustomButton>
        <span>{commentCount} Comment(s)</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm screamId={screamId} />
      <Comments comments={comments} />
    </Grid>
  );
  return (
    <Fragment>
      <CustomButton
        onClick={handleOpen}
        tipTitle="Expand scream"
        tipClassName={classes.expandBtn}
      >
        <UnfoldMore color="primary" />
      </CustomButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <CustomButton
          tipTitle="Close"
          onClick={handleClose}
          tipClassName={classes.closeBtn}
        >
          <CloseIcon color="primary" />
        </CustomButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

ScreamDialog.propTypes = {
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ScreamDialog);
