import {
  SET_AUTHENTICATED,
  SET_USER,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        authenticated: false,
      };
    case SET_USER:
      return {
        ...state,
        ...action.payload,
        authenticated: true,
        loading: false,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId,
          },
        ],
      };
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter((like) => {
          return like.screamId !== action.payload.screamId;
        }),
      };
    default:
      return state;
  }
};
