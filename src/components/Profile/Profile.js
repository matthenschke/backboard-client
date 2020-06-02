import React, { Fragment } from "react";
import EditProfileDetails from "./EditProfileDetails";
import CustomButton from "../Utils/CustomButton";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Button, Paper, Link as MuiLink, Typography } from "@material-ui/core";
import {
  LocationOn,
  Link as LinkIcon,
  CalendarToday,
  Edit,
  KeyboardReturn,
} from "@material-ui/icons";

import { useSelector, useDispatch } from "react-redux";
import { uploadImage, logout } from "../../redux/actions/userActions";

import { Link } from "react-router-dom";

import dayjs from "dayjs";

const styles = (theme) => ({
  ...theme.root,
  paper: {
    padding: 20,
  },
  profile: {
    "& .img-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-img": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#17408B",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
});
const Profile = ({ classes }) => {
  const dispatch = useDispatch();
  const {
    credentials: { handle, createdAt, imageUrl, bio, location, website },
    loading,
    authenticated,
  } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const image = e.target.files[0];
    var formData = new FormData();
    formData.append("image", image, image.name);
    dispatch(uploadImage(formData));
  };
  const handleEditImg = () => {
    const imgInput = document.getElementById("img-input");
    imgInput.click();
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="img-wrapper">
            <img src={imageUrl} alt="profile" className="profile-img" />
            <input
              type="file"
              id="img-input"
              hidden="hidden"
              onChange={handleChange}
            ></input>
            <CustomButton
              tipTitle="Edit Profile Pic"
              btnClassName="button"
              onClick={handleEditImg}
            >
              <Edit color="primary" />
            </CustomButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink component={Link} to={`/users/${handle}`} variant="h5">
              @{handle}
            </MuiLink>
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {"  "}
                  {website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
          <CustomButton tipTitle="Logout" onClick={handleLogout}>
            <KeyboardReturn color="primary" />
          </CustomButton>
          <EditProfileDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No Profile found, please login again.
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Sign Up
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p>Loading Profile</p>
  );
  return profileMarkup;
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
