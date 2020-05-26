import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
} from "../types";
import axios from "axios";

export const getScreams = () => async (dispatch) => {
  // const CancelToken = axios.CancelToken;
  // const source = CancelToken.source();
  dispatch({ type: LOADING_DATA });
  try {
    const { data: screams } = await axios.get("/screams");
    dispatch({ type: SET_SCREAMS, payload: screams });
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_SCREAMS, payload: [] });
  }
};

export const likeScream = (screamId) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/scream/${screamId}/like`);
    console.log(data);
    dispatch({ type: LIKE_SCREAM, payload: data });
  } catch (err) {
    console.error(err);
  }
};

export const unlikeScream = (screamId) => async (dispatch) => {
  try {
    const { data: scream } = await axios.delete(`/scream/${screamId}/like`);
    dispatch({ type: UNLIKE_SCREAM, payload: scream });
  } catch (err) {
    console.error(err);
  }
};
