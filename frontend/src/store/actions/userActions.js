import axios from 'axios';
import {
  USER_CREATE_MEMORY_FAILURE,
  USER_CREATE_MEMORY_REQUEST,
  USER_CREATE_MEMORY_SUCCESS,
  USER_DELETE_MEMORY_FAILURE,
  USER_DELETE_MEMORY_REQUEST,
  USER_DELETE_MEMORY_SUCCESS,
  USER_DELETE_MEMORY_TAG_FAILURE,
  USER_DELETE_MEMORY_TAG_REQUEST,
  USER_DELETE_MEMORY_TAG_SUCCESS,
  USER_FORGOT_PASSWORD_FAILURE,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
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
  USER_UPDATE_FORGOT_PASSWORD_FAILURE,
  USER_UPDATE_FORGOT_PASSWORD_REQUEST,
  USER_UPDATE_FORGOT_PASSWORD_SUCCESS,
  USER_UPDATE_MEMORY_FAILURE,
  USER_UPDATE_MEMORY_IS_COMPLETE_FAILURE,
  USER_UPDATE_MEMORY_IS_COMPLETE_REQUEST,
  USER_UPDATE_MEMORY_IS_COMPLETE_SUCCESS,
  USER_UPDATE_MEMORY_REQUEST,
  USER_UPDATE_MEMORY_SET_DUE_DATE_FAILURE,
  USER_UPDATE_MEMORY_SET_DUE_DATE_REQUEST,
  USER_UPDATE_MEMORY_SET_DUE_DATE_SUCCESS,
  USER_UPDATE_MEMORY_SUCCESS,
  USER_UPDATE_PASSWORD_FAILURE,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
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
// USER Delete a Memory TAG
export const deleteMemoryTagAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_MEMORY_TAG_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/memory/tag/${id}`, config);
    dispatch({ type: USER_DELETE_MEMORY_TAG_SUCCESS });
    dispatch(memoriesAction());
  } catch (error) {
    dispatch({
      type: USER_DELETE_MEMORY_TAG_FAILURE,
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
        priority: memory.priority,
        tags: { tagName: memory.tags },
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
// USER Update a memory SET DUE DATE
export const userUpdateSetDueDateAction =
  (memory) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_MEMORY_SET_DUE_DATE_REQUEST,
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
          setDueDate: memory.setDueDate,
        },
        config,
      );

      dispatch({
        type: USER_UPDATE_MEMORY_SET_DUE_DATE_SUCCESS,
        payload: data,
      });
      dispatch(memoriesAction());
    } catch (error) {
      dispatch({
        type: USER_UPDATE_MEMORY_SET_DUE_DATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
// USER Update a memory SET IS COMPLETE
export const userUpdateIsCompleteAction =
  (memory) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_MEMORY_IS_COMPLETE_REQUEST,
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
          isComplete: memory.isComplete,
        },
        config,
      );

      dispatch({
        type: USER_UPDATE_MEMORY_IS_COMPLETE_SUCCESS,
        payload: data,
      });
      dispatch(memoriesAction());
    } catch (error) {
      dispatch({
        type: USER_UPDATE_MEMORY_IS_COMPLETE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

/// Request new password if forgotten
export const userForgotPasswordAction = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_FORGOT_PASSWORD_REQUEST,
    });
    const { data } = await axios.post('/api/user-forgot-password', { email });
    dispatch({ type: USER_FORGOT_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_FORGOT_PASSWORD_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// UPDATE new password if forgotten
export const updateUserPasswordAction =
  (userUpdatedInfo) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_PASSWORD_REQUEST,
      });

      const { data } = await axios.put(
        `/api/user-update-password`,
        userUpdatedInfo,
      );
      console.log('DDD', data);
      dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PASSWORD_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
