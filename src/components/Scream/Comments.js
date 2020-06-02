import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import dayjs from "dayjs";

const styles = (theme) => ({
  ...theme.root,
});

const Comments = ({ comments, classes }) => {
  return (
    <Grid container>
      {comments.map((comment, index) => {
        const { createdAt, userHandle, userImage, body } = comment;
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
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && (
              <hr className={classes.visibleSeparator} />
            )}
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
export default withStyles(styles, { withTheme: true })(Comments);
