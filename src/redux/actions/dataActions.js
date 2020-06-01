import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LOADING_UI,
  POST_SCREAM,
  CLEAR_ERRORS,
  SET_ERRORS,
  SET_SCREAM,
  STOP_LOADING_UI,
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
    console.log(screamId);
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
    console.log(scream);
    dispatch({ type: UNLIKE_SCREAM, payload: scream });
  } catch (err) {
    console.error(err);
  }
};

export const deleteScream = (screamId) => async (dispatch) => {
  try {
    await axios.delete(`/scream/${screamId}`);
    dispatch({ type: DELETE_SCREAM, payload: screamId });
  } catch (err) {
    console.error(err);
  }
};

export const postScream = (screamBody) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const { data } = await axios.post("/scream", { body: screamBody });
    dispatch({ type: POST_SCREAM, payload: data });
    dispatch(clearErrors());
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const getScream = (screamId) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const { data } = await axios.get(`/scream/${screamId}`);
    dispatch({ type: SET_SCREAM, payload: data });
    dispatch({ type: STOP_LOADING_UI });
  } catch (err) {
    console.log(err);
  }
};
