import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { Typography, Button, Grid } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.root,
  paper: {
    width: 320,
    padding: 50,
  },
});

const SignUp = (props) => {
  const { classes } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const UI = useSelector((state) => state.UI);
  const { loading } = UI;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signupUser({ email, password, confirmPassword, handle }, props.history)
    );
  };

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    }
  }, [UI]);

  return (
    <Grid
      container
      className={classes.main}
      justify="center"
      alignItems="center"
    >
      <Grid item sm />
      <Grid item sm>
        <Paper className={classes.paper}>
          <Typography variant="h2" className={classes.title}>
            Sign Up
          </Typography>
          <form noValidate onSubmit={handleSubmit} className={classes.form}>
            <TextField
              id="email"
              label="Email"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
            />
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
            />
            <TextField
              id="handle"
              label="handle"
              name="handle"
              type="text"
              onChange={(e) => setHandle(e.target.value)}
              required
              fullWidth
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
            />
            {errors.general && (
              <Typography variant="body2" className={classes.error}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.button}
              disabled={loading ? true : false}
            >
              Register
              {loading && (
                <CircularProgress className={classes.progress} size={30} />
              )}
            </Button>
            <small>
              Already have an account? Log in <Link to="/login">here</Link>
            </small>
          </form>
        </Paper>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
