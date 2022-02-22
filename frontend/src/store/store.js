import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userRegistrationReducer,
  userLoginReducer,
  userMemoriesReducer,
  userCreateMemoryReducer,
  userDeleteMemoryReducer,
  userUpdateMemoryReducer,
} from './reducers/userReducers';

import { userUpdateDetailsReducer } from './reducers/userDetailsReducers';

//Initialise state to hold user info if logged in.
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const reducer = combineReducers({
  userRegistration: userRegistrationReducer,
  userLogin: userLoginReducer,
  userMemories: userMemoriesReducer,
  userCreateMemory: userCreateMemoryReducer,
  userDeleteMemory: userDeleteMemoryReducer,
  userUpdateMemory: userUpdateMemoryReducer,
  userUpdateDetails: userUpdateDetailsReducer,
});

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
