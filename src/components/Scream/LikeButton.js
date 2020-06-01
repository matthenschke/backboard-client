import React from "react";
import PropTypes from "prop-types";
import CustomButton from "../Utils/CustomButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unlikeScream, likeScream } from "../../redux/actions/dataActions";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const LikeButton = ({ screamId }) => {
  const dispatch = useDispatch();
  const {
    user: { likes, authenticated },
  } = useSelector((state) => state);
  const likedScream = () => {
    if (likes && likes.find((like) => like.screamId === screamId)) return true;
    return false;
  };

  const like = () => {
    console.log(screamId);
    dispatch(likeScream(screamId));
  };
  const unlike = () => {
    dispatch(unlikeScream(screamId));
  };
  const likeButton = authenticated ? (
    likedScream() ? (
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
  screamId: PropTypes.string.isRequired,
};

export default LikeButton;
