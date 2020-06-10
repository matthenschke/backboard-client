import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBuckets } from "../redux/actions/dataActions";

// MUI
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import Bucket from "../components/Bucket/Bucket";
import Profile from "../components/Profile/Profile";
import BucketSkeleton from "../components/Bucket/BucketSkeleton";

const styles = (theme) => ({
  ...theme.root,
});

const Home = ({ classes }) => {
  const dispatch = useDispatch();
  const { buckets, loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getBuckets());
  }, [dispatch]);
  let recentBucketsMockup = !loading ? (
    buckets.map((bucket) => {
      return <Bucket key={bucket.bucketId} bucket={bucket} />;
    })
  ) : (
    <BucketSkeleton />
  );
  return (
    <div className="home">
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentBucketsMockup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Home);
