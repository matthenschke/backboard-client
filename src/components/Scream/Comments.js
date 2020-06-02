import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import dayjs from "dayjs";

const styles = {};

const Comments = ({ comments, classes }) => {
  return (
    <Grid container>
      {comments.map((comment) => {
        const { createdAt, userHandle, userImage, body } = comments;
        return (
          <Fragment key={createdAt}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={2}>
                  <img
                    className={classes.commentImg}
                    src={userImage}
                    alt={`${userHandle} profile pic`}
                  />
                </Grid>
                <Grid item sm={9}>
                  <div className={classes.commentData}>
                    <Typography
                      variant="h5"
                      color="primary"
                      component={Link}
                      to={`/users/${userHandle}`}
                    >
                      {userHandle}
                    </Typography>
                    <Typography variant="body2" color="text"></Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
};

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Comments);
