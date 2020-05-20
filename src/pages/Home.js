import React, { useEffect, useState } from "react";
import axios from "axios";

// MUI
import Grid from "@material-ui/core/Grid";

import Scream from "../components/Scream";
import Profile from "../components/Profile";

const Home = () => {
  const [screams, setScreams] = useState(null);
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const loadData = async () => {
      try {
        const { data } = await axios.get("/screams", {
          cancelToken: source.token,
        });
        setScreams(data);
      } catch (err) {
        console.log(err);
      }
    };
    loadData();

    // clean up when component unmounts
    return () => {
      source.cancel();
    };
  }, []);
  let recentScreamsMockup = screams ? (
    screams.map((scream) => {
      return <Scream key={scream.screamId} scream={scream} />;
    })
  ) : (
    <p>Loading ...</p>
  );
  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMockup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;
