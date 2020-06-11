import {
  SET_UNAUTHENTICATED,
  SET_ERRORS,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_USER,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
  UPLOAD_IMAGE,
} from "../types";
import axios from "axios";

const setAuthorizationHeader = (token) => {
  const fbToken = `Bearer ${token}`;
  axios.defaults.headers.common["Authorization"] = fbToken;
  localStorage.setItem("FBIdToken", fbToken);
};
export const loginUser = (userData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const {
      data: { token },
    } = await axios.post("/login", userData);
    setAuthorizationHeader(token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push("/"); // push url (redirect)
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data });
    console.error(err);
  }
};

export const signupUser = (newUserData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const {
      data: { token },
    } = await axios.post("/signup", newUserData);

    setAuthorizationHeader(token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push("/");
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data });
    console.error(err);
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  if (axios.defaults.common) delete axios.defaults.common;
  dispatch({ type: SET_UNAUTHENTICATED });
};
export const getUserData = () => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    const { data } = await axios.get("/user");
    dispatch({ type: SET_USER, payload: data });
  } catch (err) {
    console.error(err);
  }
};

export const uploadImage = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/user/image", formData);
    console.log(data);

    dispatch({ type: UPLOAD_IMAGE, payload: data });
    dispatch(getUserData());
  } catch (err) {
    console.error(err);
  }
};

export const editUserDetails = (userDetails) => async (dispatch) => {
  try {
    axios.post("/user", userDetails);
    dispatch(getUserData());
  } catch (err) {
    console.error(err);
  }
};

export const markNotificationsRead = (notificationIds) => async (dispatch) => {
  try {
    await axios.post("/notifications", {
      notificationIds,
    });
    dispatch({ type: MARK_NOTIFICATIONS_READ });
  } catch (err) {
    console.error(err);
  }
};
