import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import { Typography, Button } from "@material-ui/core";

const styles = {
  main: {
    textAlign: "center",
  },
  title: {
    margin: "50px 0",
  },

  textField: {
    margin: "10px 0",
  },
  button: {
    margin: "20px auto",
    justifyContent: "center",
    display: "flex",
    position: "relative",
  },
  progress: {
    position: "absolute",
  },
  error: {
    color: "red",
    fontSize: "0.8rem",
    maginTop: 10,
  },
};

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
      await axios.post("/login", {
        email: email,
        password: password,
      });

      props.history.push("/"); // push url (redirect)
    } catch (err) {
      console.log(err.response.data);
      setLoading(false);
      setErrors(err.response.data);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      className={classes.main}
    >
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
    </Box>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
