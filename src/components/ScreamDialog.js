import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";

import { useDispatch, useSelector } from "react-redux";
import { getScream } from "../redux/actions/dataActions";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import CircularProgress from "@material-ui/core/CircularProgress";

import dayjs from "dayjs";

const styles = {
  content: {},
  separator: {
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
};

const ScreamDialog = ({ screamId, userHandle, classes }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    dispatch(getScream(screamId));
  };
  const handleClose = () => {
    setOpen(false);
  };
  const {
    UI: { loading },
    data: {
      scream: { createdAt, commentCount, comments, likeCount, body, userImage },
    },
  } = useSelector((state) => state);
  const dialogMarkup = loading ? (
    <CircularProgress size={200} />
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
        <hr className={classes.separator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
        </Typography>
        <hr className={classes.separator} />
        <Typography variant="body1">{body}</Typography>
      </Grid>
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
