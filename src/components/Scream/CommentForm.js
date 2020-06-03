import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../redux/actions/dataActions";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.root,
});
const CommentForm = ({ classes, screamId }) => {
  const [body, setBody] = useState("");

  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.user);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(screamId, { body }));
  };
  return <Fragment></Fragment>;
};

CommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.object.isRequired,
};
export default withStyles(styles)(CommentForm);
