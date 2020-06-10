import React, { useEffect } from "react";
import Bucket from "../components/Bucket/Bucket";
import StaticProfile from "../components/Profile/StaticProfile";
import BucketSkeleton from "../components/Bucket/BucketSkeleton";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
import { useParams } from "react-router-dom";
import ProfileSkeleton from "../components/Profile/ProfileSkeleton";

const User = () => {
  const dispatch = useDispatch();
  const {
    data: { buckets, profile, loading },
  } = useSelector((state) => state);
  const { handle, bucketId } = useParams();
  useEffect(() => {
    dispatch(getUserData(handle));
  }, [dispatch, handle]);

  let recentBucketsMockup = !loading ? (
    buckets === null ? (
      <p>No buckets for this user</p>
    ) : !bucketId ? (
      buckets.map((bucket) => {
        return <Bucket key={bucket.bucketId} bucket={bucket} />;
      })
    ) : (
      buckets.map((bucket) => {
        if (bucket.bucketId !== bucketId)
          return <Bucket key={bucket.bucketId} bucket={bucket} />;
        return <Bucket key={bucket.bucketId} bucket={bucket} openDialog />;
      })
    )
  ) : (
    <BucketSkeleton />
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {recentBucketsMockup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile ? <StaticProfile profile={profile} /> : <ProfileSkeleton />}
      </Grid>
    </Grid>
  );
};

export default User;
