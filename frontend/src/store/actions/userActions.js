import axios from 'axios';
import {
  USER_CREATE_MEMORY_FAILURE,
  USER_CREATE_MEMORY_REQUEST,
  USER_CREATE_MEMORY_SUCCESS,
  USER_DELETE_MEMORY_FAILURE,
  USER_DELETE_MEMORY_REQUEST,
  USER_DELETE_MEMORY_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_MEMORIES_FAILURE,
  USER_MEMORIES_REQUEST,
  USER_MEMORIES_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_MEMORY_FAILURE,
  USER_UPDATE_MEMORY_REQUEST,
  USER_UPDATE_MEMORY_SUCCESS,
} from '../constants/userConstants';

// User Registration
export const registerAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/users', formData, config);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    // Replace this to redirect to login
    // dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    // localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//User Login
export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email: email, password: password },
      config,
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//User logout
export const logoutAction = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};
// USER get all Memories
export const memoriesAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_MEMORIES_REQUEST,
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

    const { data } = await axios.get(`/api/memories`, config);
    dispatch({ type: USER_MEMORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_MEMORIES_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// USER Create/add a MEMORY
export const createMemoryAction = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_CREATE_MEMORY_REQUEST,
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

    const { data } = await axios.post(`/api/memory`, formData, config);
    dispatch({ type: USER_CREATE_MEMORY_SUCCESS, payload: data });
    dispatch(memoriesAction());
  } catch (error) {
    dispatch({
      type: USER_CREATE_MEMORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// USER Delete a single Memory
export const deleteMemoryAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_MEMORY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/memory/${id}`, config);
    dispatch({ type: USER_DELETE_MEMORY_SUCCESS });
    dispatch(memoriesAction());
  } catch (error) {
    dispatch({
      type: USER_DELETE_MEMORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// USER Update a memory
export const userUpdateAction = (memory) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_MEMORY_REQUEST,
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
      `api/memory/${memory.id}`,
      {
        title: memory.title,
        memory: memory.memory,
        dueDate: memory.dueDate,
        rating: memory.rating,
      },
      config,
    );

    dispatch({ type: USER_UPDATE_MEMORY_SUCCESS, payload: data });
    dispatch(memoriesAction());
  } catch (error) {
    dispatch({
      type: USER_UPDATE_MEMORY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
