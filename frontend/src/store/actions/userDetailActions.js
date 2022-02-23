import axios from 'axios';
import {
  USER_DETAILS_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_FAILURE,
  USER_UPDATE_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_SUCCESS,
} from '../constants/userDetailsConstants';

// USER Update a USERS DETAILS
export const userDetailsUpdateAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `api/user/${user.id}`,
      {
        name: user.name,
        email: user.email,
        password: user.password,
      },
      config,
    );

    dispatch({ type: USER_UPDATE_DETAILS_SUCCESS, payload: data });
    dispatch(detailsAction());
  } catch (error) {
    dispatch({
      type: USER_UPDATE_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// USER get logged in Details
export const detailsAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/user`, config);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
