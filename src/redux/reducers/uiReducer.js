import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";

const initialState = {
  errors: null,
  loading: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null,
        loading: false,
      };
    case LOADING_UI: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};
