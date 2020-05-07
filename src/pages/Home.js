import React, { useEffect, useState } from "react";
import axios from "axios";

// MUI
import Grid from "@material-ui/core/Grid";

import Scream from "../components/Scream";

const Home = () => {
  const [screams, setScreams] = useState(null);
  useEffect(() => {
    axios
      .get("/screams")
      .then((res) => {
        const { data } = res;
        console.log(data);
        setScreams(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  let recentScreamsMockup = screams ? (
    screams.map((scream) => {
      return <Scream scream={scream} />;
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
        <p>Profile ...</p>
      </Grid>
    </Grid>
  );
};

export default Home;
