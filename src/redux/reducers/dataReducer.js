import {
  SET_BUCKET,
  SET_BUCKETS,
  LOADING_DATA,
  LIKE_BUCKET,
  UNLIKE_BUCKET,
  DELETE_BUCKET,
  POST_BUCKET,
  ADD_COMMENT,
  GET_USER_PROFILE,
  UPLOAD_IMAGE,
} from "../types";

const initialState = {
  buckets: [],
  bucket: {},
  loading: false,
  profile: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BUCKETS:
      return {
        ...state,
        buckets: action.payload,
        loading: false,
      };
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case LIKE_BUCKET:
    case UNLIKE_BUCKET:
      let index = state.buckets.findIndex(
        (bucket) => bucket.bucketId === action.payload.bucketId
      );
      if (state.bucket.bucketId === action.payload.bucketId) {
        state.bucket = action.payload;
      }
      state.buckets[index] = action.payload;
      return {
        ...state,
      };
    case DELETE_BUCKET: {
      let index = state.buckets.findIndex(
        (bucket) => bucket.bucketId === action.payload
      );
      state.buckets.splice(index, 1);
      return {
        ...state,
      };
    }
    case POST_BUCKET: {
      return {
        ...state,
        buckets: [action.payload, ...state.buckets],
      };
    }
    case SET_BUCKET: {
      return {
        ...state,
        bucket: action.payload,
      };
    }
    case ADD_COMMENT: {
      return {
        ...state,
        bucket: {
          ...state.bucket,
          comments: [action.payload, ...state.bucket.comments],
        },
      };
    }
    case UPLOAD_IMAGE: {
      state.buckets.forEach((bucket) => {
        if (bucket.userHandle === action.payload.userHandle) {
          bucket.userImage = action.payload.imageUrl;
        }
      });
      return {
        ...state,
      };
    }
    case GET_USER_PROFILE: {
      return {
        ...state,
        buckets: action.payload.buckets,
        loading: false,
        profile: action.payload.credentials,
      };
    }

    default:
      return state;
  }
};
