import React from "react";
import PropTypes from "prop-types";
import CustomButton from "../Utils/CustomButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unlikeBucket, likeBucket } from "../../redux/actions/dataActions";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const LikeButton = ({ bucketId }) => {
  const dispatch = useDispatch();
  const {
    user: { likes, authenticated },
  } = useSelector((state) => state);
  const likedBucket = () => {
    if (likes && likes.find((like) => like.bucketId === bucketId)) return true;
    return false;
  };

  const like = () => {
    dispatch(likeBucket(bucketId));
  };
  const unlike = () => {
    dispatch(unlikeBucket(bucketId));
  };
  const likeButton = authenticated ? (
    likedBucket() ? (
      <CustomButton tipTitle="Undo like" onClick={unlike}>
        <FavoriteIcon color="primary" />
      </CustomButton>
    ) : (
      <CustomButton tipTitle="like" onClick={like}>
        <FavoriteBorder color="primary" />
      </CustomButton>
    )
  ) : (
    <Link to="/login">
      <CustomButton tipTitle="like">
        <FavoriteBorder color="primary" />
      </CustomButton>
    </Link>
  );

  return likeButton;
};
LikeButton.propTypes = {
  bucketId: PropTypes.string.isRequired,
};

export default LikeButton;
