import {
  USER_DETAILS_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_FAILURE,
  USER_UPDATE_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_SUCCESS,
} from '../constants/userDetailsConstants';

//USER Update a USER Details
export const userUpdateDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_DETAILS_REQUEST:
      return { loading: true };
    case USER_UPDATE_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
      };
    case USER_UPDATE_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
// User get their logged in Details
export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        error: false,
        details: action.payload,
      };
    case USER_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { details: {} };
    default:
      return { ...state };
  }
};
