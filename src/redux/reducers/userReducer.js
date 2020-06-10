import {
  SET_AUTHENTICATED,
  SET_USER,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_BUCKET,
  UNLIKE_BUCKET,
  MARK_NOTIFICATIONS_READ,
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
    case LIKE_BUCKET:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            bucketId: action.payload.bucketId,
          },
        ],
      };
    case UNLIKE_BUCKET:
      return {
        ...state,
        likes: state.likes.filter((like) => {
          return like.bucketId !== action.payload.bucketId;
        }),
      };
    case MARK_NOTIFICATIONS_READ: {
      state.notifications.forEach((not) => (not.read = true));
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
