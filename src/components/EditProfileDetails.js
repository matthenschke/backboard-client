import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const styles = (theme) => ({
  textField: {
    margin: "10px 0",
  },
  button: {
    float: "right",
  },
});

const EditProfileDetails = ({ classes }) => {
  const dispatch = useDispatch();
  const { credentials } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    mapUserDetailsToState(credentials);
  };

  const mapUserDetailsToState = (credentials) => {
    setBio(credentials.bio ? credentials.bio : "");
    setWebsite(credentials.website ? credentials.website : "");
    setLocation(credentials.location ? credentials.location : "");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(editUserDetails({ bio, website, location }));
    setOpen(false);
  };

  useEffect(() => {
    mapUserDetailsToState(credentials);
  }, [credentials]);
  return (
    <Fragment>
      <Tooltip title="Edit Details" placement="top">
        <IconButton
          variant="outlined"
          onClick={handleClickOpen}
          className={classes.button}
        >
          <EditIcon color="primary"></EditIcon>
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Your Details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              className={classes.textField}
              name="bio"
              type="text"
              id="bio"
              placeholder="A short bio about yourself :)"
              multiline={true}
              fullWidth
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <TextField
              autoFocus
              className={classes.textField}
              name="website"
              type="text"
              id="website"
              placeholder="Your cool website!"
              fullWidth
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <TextField
              autoFocus
              className={classes.textField}
              name="location"
              type="text"
              id="location"
              placeholder="Your location"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
EditProfileDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditProfileDetails);
