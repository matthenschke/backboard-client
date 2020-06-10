import {
  SET_BUCKETS,
  LOADING_DATA,
  LIKE_BUCKET,
  UNLIKE_BUCKET,
  DELETE_BUCKET,
  LOADING_UI,
  POST_BUCKET,
  CLEAR_ERRORS,
  SET_ERRORS,
  SET_BUCKET,
  STOP_LOADING_UI,
  ADD_COMMENT,
  GET_USER_PROFILE,
} from "../types";
import axios from "axios";

export const getBuckets = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    const { data: buckets } = await axios.get("/buckets");
    dispatch({ type: SET_BUCKETS, payload: buckets });
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_BUCKETS, payload: [] });
  }
};

export const likeBucket = (bucketId) => async (dispatch) => {
  try {
    console.log(bucketId);
    const { data } = await axios.post(`/bucket/${bucketId}/like`);
    console.log(data);
    dispatch({ type: LIKE_BUCKET, payload: data });
  } catch (err) {
    console.error(err);
  }
};

export const unlikeBucket = (bucketId) => async (dispatch) => {
  try {
    const { data: bucket } = await axios.delete(`/bucket/${bucketId}/like`);
    dispatch({ type: UNLIKE_BUCKET, payload: bucket });
  } catch (err) {
    console.error(err);
  }
};

export const deleteBucket = (bucketId) => async (dispatch) => {
  try {
    await axios.delete(`/bucket/${bucketId}`);
    dispatch({ type: DELETE_BUCKET, payload: bucketId });
  } catch (err) {
    console.error(err);
  }
};

export const postBucket = (bucketBody) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const { data } = await axios.post("/bucket", { body: bucketBody });
    dispatch({ type: POST_BUCKET, payload: data });
    dispatch(clearErrors());
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const getBucket = (bucketId) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  console.log(bucketId);
  try {
    const { data } = await axios.get(`/bucket/${bucketId}`);
    dispatch({ type: SET_BUCKET, payload: data });
    dispatch({ type: STOP_LOADING_UI });
  } catch (err) {
    console.log(err);
  }
};

export const addComment = (bucketId, commentData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `/bucket/${bucketId}/comment`,
      commentData
    );
    console.log(data);
    dispatch({ type: ADD_COMMENT, payload: data });
    dispatch(clearErrors());
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
};

export const getUserData = (userHandle) => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  console.log(userHandle);
  try {
    const { data } = await axios.get(`/user/${userHandle}`);
    console.log(data);

    dispatch({ type: GET_USER_PROFILE, payload: data });
  } catch (err) {
    console.log(err.response.data);
    dispatch({ type: GET_USER_PROFILE, payload: null });
  }
};
