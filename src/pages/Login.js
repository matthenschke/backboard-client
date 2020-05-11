import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import { Typography, Button, Grid } from "@material-ui/core";

const styles = (theme) => ({
  ...theme.LoginSignup,
});

const Login = (props) => {
  const { classes } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        data: { token },
      } = await axios.post("/login", {
        email,
        password,
      });
      localStorage.setItem("FBIdToken", `Bearer ${token}`);

      props.history.push("/"); // push url (redirect)
    } catch (err) {
      console.log(err.response.data);
      setLoading(false);
      setErrors(err.response.data);
    }
  };

  return (
    <Grid
      container
      className={classes.main}
      justify="center"
      alignItems="center"
    >
      <Grid item />
      <Grid item>
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
      </Grid>
      <Grid item />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
