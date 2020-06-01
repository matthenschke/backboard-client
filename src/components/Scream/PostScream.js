import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import CustomButton from "../Utils/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  TextField: {
    margin: "10px 0",
  },
  CloseBtn: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
  SubmitBtn: {
    position: "relative",
    float: "right",
    margin: "10px 0",
  },
  Spinner: {
    position: "absolute",
  },
};
const PostScream = ({ classes }) => {
  const dispatch = useDispatch();
  const { UI } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    }
    if (!UI.errors && !UI.loading) {
      setBody("");
      setErrors({});
      setOpen(false);
    }
  }, [UI.errors, UI.loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postScream(body));
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    dispatch(clearErrors());
    setErrors({});
    setOpen(false);
  };
  return (
    <Fragment>
      <CustomButton tipTitle="Post a Scream!" onClick={handleOpen}>
        <AddIcon color="primary" />
      </CustomButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <CustomButton
          tipTitle="Close"
          onClick={handleClose}
          tipClassName={classes.CloseBtn}
        >
          <CloseIcon color="primary" />
        </CustomButton>
        <DialogTitle>Post A New Scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              name="body"
              label="SCREAM!"
              multiline
              rows={3}
              placeholder="Scream"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.TextField}
              onChange={(e) => setBody(e.target.value)}
              fullWidth
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.SubmitBtn}
              disabled={UI.loading}
            >
              Add Scream
              {UI.loading && (
                <CircularProgress size={30} className={classes.Spinner} />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
PostScream.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(PostScream);
