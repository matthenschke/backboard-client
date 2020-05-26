import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import CustomButton from "./CustomButton";

import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DeleteOutline from "@material-ui/icons/DeleteOutline";

import { useDispatch } from "react-redux";
import { deleteScream } from "../redux/actions/dataActions";
//

const styles = {
  deleteBtn: {
    position: "absolute",
    left: "80%",
  },
};

const DeleteScream = ({ screamId, classes }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleDelete = () => {
    dispatch(deleteScream(screamId));
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <CustomButton
        tipTitle="Delete Scream"
        onClick={handleOpen}
        btnClassName={classes.deleteBtn}
      >
        <DeleteOutline color="secondary" />
      </CustomButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Are you sure do you want to delete this scream?
        </DialogTitle>
        <DialogContent>
          Note that this action cannot be reversed!!!
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
DeleteScream.propTypes = {
  screamId: PropTypes.string.isRequired,
};
export default withStyles(styles)(DeleteScream);
