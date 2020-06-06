import {
  SET_SCREAM,
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  ADD_COMMENT,
  GET_USER_PROFILE,
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
  profile: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      state.screams[index] = action.payload;
      return {
        ...state,
      };
    case DELETE_SCREAM: {
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(index, 1);
      return {
        ...state,
      };
    }
    case POST_SCREAM: {
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    }
    case SET_SCREAM: {
      return {
        ...state,
        scream: action.payload,
      };
    }
    case ADD_COMMENT: {
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
        },
      };
    }
    case GET_USER_PROFILE: {
      return {
        ...state,
        screams: action.payload.screams,
        loading: false,
        profile: action.payload.credentials,
      };
    }

    default:
      return state;
  }
};
