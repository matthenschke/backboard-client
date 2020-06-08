import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { Typography, Button, Grid } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.root,
  paper: {
    padding: 20,
    paddingBottom: 100,
  },
});

const Login = (props) => {
  const { classes } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const UI = useSelector((state) => state.UI);
  const { loading } = UI;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }, props.history));
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
      <Grid item />

      <Grid item>
        <Paper className={classes.paper}>
          <Typography variant="h2" className={classes.title}>
            Login
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
              Login
              {loading && (
                <CircularProgress className={classes.progress} size={30} />
              )}
            </Button>
            <small>
              Don't have an account? Sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Paper>
      </Grid>
      <Grid item />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
