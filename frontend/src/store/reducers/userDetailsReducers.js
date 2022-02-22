import {
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
