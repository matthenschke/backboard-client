import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../redux/actions/dataActions";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.root,
});
const CommentForm = ({ classes, bucketId }) => {
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const {
    user: { authenticated },
    UI,
  } = useSelector((state) => state);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(bucketId, { body }));
  };

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    }
    if (!UI.errors && !UI.loading) {
      setErrors("");
    }
  }, [UI.errors, UI.loading]);
  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          name="body"
          type="text"
          label="Comment on Bucket"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          fullWidth
        ></TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;
  return commentFormMarkup;
};

CommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  bucketId: PropTypes.string.isRequired,
};
export default withStyles(styles)(CommentForm);
