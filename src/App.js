import React, { useEffect } from "react";
import "./App.css";
import theme from "./utils/theme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import jwtDecode from "jwt-decode";

import { useDispatch } from "react-redux";
import { SET_AUTHENTICATED } from "./redux/types";
import { logout } from "./redux/actions/userActions";
const App = () => {
  const token = localStorage.FBIdToken;
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        dispatch(logout());
        window.location.href = "/login";
      } else {
        dispatch({ type: SET_AUTHENTICATED });
      }
    }
  }, [dispatch, token]);
  return (
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <AuthRoute
              exact
              path="/login"
              component={Login}
              // authenticated={authenticated}
            ></AuthRoute>
            <AuthRoute
              exact
              path="/signup"
              component={SignUp}
              // authenticated={authenticated}
            ></AuthRoute>
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
