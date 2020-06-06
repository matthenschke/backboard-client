import React from "react";
import "./App.css";
import theme from "./utils/theme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthRoute from "./components/Utils/AuthRoute";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import User from "./pages/User";

import Navbar from "./components/Layout/Navbar";

const App = () => {
  return (
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <AuthRoute exact path="/login" component={Login}></AuthRoute>
            <AuthRoute exact path="/signup" component={SignUp}></AuthRoute>
            <Route exact path="/user/:handle" component={User} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
