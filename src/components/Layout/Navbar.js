import React, { Fragment } from "react";
import PostScream from "../Scream/PostScream";
import { Link } from "react-router-dom/";
// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";

import CustomButton from "../Utils/CustomButton";

import { useSelector } from "react-redux";

const Navbar = () => {
  const { authenticated } = useSelector((state) => state.user);
  return (
    <AppBar>
      <Toolbar className="nav-container">
        {authenticated ? (
          <Fragment>
            <PostScream />
            <Link to="/">
              <CustomButton tipTitle="Home">
                <HomeIcon color="primary" />
              </CustomButton>
            </Link>
            <CustomButton tipTitle="Notifications">
              <NotificationsIcon color="primary" />
            </CustomButton>
          </Fragment>
        ) : (
          <Fragment>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
