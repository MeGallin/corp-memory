import {
  ADMIN_SUSPEND_USER_FAILURE,
  ADMIN_SUSPEND_USER_REQUEST,
  ADMIN_SUSPEND_USER_SUCCESS,
  ADMIN_USER_MEMORIES_FAILURE,
  ADMIN_USER_MEMORIES_REQUEST,
  ADMIN_USER_MEMORIES_RESET,
  ADMIN_USER_MEMORIES_SUCCESS,
} from '../constants/adminConstants';

// User get their memories
export const adminUserMemoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_USER_MEMORIES_REQUEST:
      return { loading: true };
    case ADMIN_USER_MEMORIES_SUCCESS:
      return {
        loading: false,
        success: true,
        error: false,
        usersMemories: action.payload,
      };
    case ADMIN_USER_MEMORIES_FAILURE:
      return { loading: false, error: action.payload };
    case ADMIN_USER_MEMORIES_RESET:
      return { usersMemories: {} };
    default:
      return { ...state };
  }
};

// Add OR REmove Suspension
export const adminSuspendUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_SUSPEND_USER_REQUEST:
      return { ...state, loading: true };
    case ADMIN_SUSPEND_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ADMIN_SUSPEND_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
