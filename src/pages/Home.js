import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

// MUI
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import Scream from "../components/Scream/Scream";
import Profile from "../components/Profile/Profile";
import ScreamSkeleton from "../components/Scream/ScreamSkeleton";

const styles = (theme) => ({
  ...theme.root,
});

const Home = ({ classes }) => {
  const dispatch = useDispatch();
  const { screams, loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getScreams());
  }, [dispatch]);
  let recentScreamsMockup = !loading ? (
    screams.map((scream) => {
      return <Scream key={scream.screamId} scream={scream} />;
    })
  ) : (
    <ScreamSkeleton />
  );
  return (
    <div className="home">
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMockup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Home);
