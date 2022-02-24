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
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_MEMORIES_FAILURE,
  USER_MEMORIES_REQUEST,
  USER_MEMORIES_RESET,
  USER_MEMORIES_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_MEMORY_FAILURE,
  USER_UPDATE_MEMORY_REQUEST,
  USER_UPDATE_MEMORY_SUCCESS,
} from '../constants/userConstants';

//Register a User
export const userRegistrationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        success: true,
        error: null,
      };
    case USER_REGISTER_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
// Login a registered User
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_LOGIN_FAILURE:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};

    default:
      return { ...state };
  }
};
// User get their memories
export const userMemoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_MEMORIES_REQUEST:
      return { loading: true };
    case USER_MEMORIES_SUCCESS:
      return {
        loading: false,
        success: true,
        error: false,
        memories: action.payload,
      };
    case USER_MEMORIES_FAILURE:
      return { loading: false, error: action.payload };
    case USER_MEMORIES_RESET:
      return { memories: {} };
    default:
      return { ...state };
  }
};
// USER Create/add a memory
export const userCreateMemoryReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE_MEMORY_REQUEST:
      return { loading: true };
    case USER_CREATE_MEMORY_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        memory: action.payload,
      };
    case USER_CREATE_MEMORY_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
//USER Delete a single memory
export const userDeleteMemoryReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_MEMORY_REQUEST:
      return { loading: true };
    case USER_DELETE_MEMORY_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
      };
    case USER_DELETE_MEMORY_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

//USER Delete a memory TAG
export const userDeleteMemoryTagReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_MEMORY_TAG_REQUEST:
      return { loading: true };
    case USER_DELETE_MEMORY_TAG_SUCCESS:
      return {
        loadingTag: false,
        successTag: true,
        errorTag: null,
      };
    case USER_DELETE_MEMORY_TAG_FAILURE:
      return { loadingTag: false, errorTag: action.payload };
    default:
      return { ...state };
  }
};

//USER Update a memory
export const userUpdateMemoryReducer = (state = {}, action) => {
  // console.log('UPDATE RECUCER', action.payload);
  switch (action.type) {
    case USER_UPDATE_MEMORY_REQUEST:
      return { loading: true };
    case USER_UPDATE_MEMORY_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        memory: action.payload,
      };
    case USER_UPDATE_MEMORY_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
