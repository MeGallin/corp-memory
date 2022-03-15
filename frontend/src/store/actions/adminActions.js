import axios from 'axios';
import {
  ADMIN_USER_MEMORIES_FAILURE,
  ADMIN_USER_MEMORIES_REQUEST,
  ADMIN_USER_MEMORIES_SUCCESS,
} from '../constants/adminConstants';

// USER get logged in Details
export const adminUserMemoriesAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_USER_MEMORIES_REQUEST,
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

    const { data } = await axios.get(`/api/admin/user-memories`, config);
    dispatch({ type: ADMIN_USER_MEMORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_MEMORIES_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
