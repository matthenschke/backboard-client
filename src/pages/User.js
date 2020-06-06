import React, { useEffect } from "react";
// import PropTypes from "prop-types";
// import axios from "axios";
import Scream from "../components/Scream/Scream";
import StaticProfile from "../components/Profile/StaticProfile";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
import { useParams } from "react-router-dom";

const User = () => {
  const dispatch = useDispatch();
  const {
    data: { screams, profile, loading },
  } = useSelector((state) => state);
  const { handle } = useParams();
  useEffect(() => {
    dispatch(getUserData(handle));
  }, [dispatch, handle]);

  let recentScreamsMockup = !loading ? (
    screams === null ? (
      <p>No screams for this user</p>
    ) : (
      screams.map((scream) => {
        return <Scream key={scream.screamId} scream={scream} />;
      })
    )
  ) : (
    <p>Loading Screams</p>
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMockup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile ? <StaticProfile profile={profile} /> : <p>Loading Profile</p>}
      </Grid>
    </Grid>
  );
};

export default User;
