import React, { useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/Scream/Scream";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
import { useParams } from "react-router-dom";

const User = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);
  const { handle } = useParams();
  useEffect(() => {
    dispatch(getUserData(handle));
  }, [dispatch, handle]);
  console.log(data);

  return <div></div>;
};

export default User;
