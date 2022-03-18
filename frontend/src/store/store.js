import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userRegistrationReducer,
  userLoginReducer,
  userMemoriesReducer,
  userCreateMemoryReducer,
  userDeleteMemoryReducer,
  userDeleteMemoryTagReducer,
  userUpdateMemoryReducer,
  userUpdateMemorySetDueDateReducer,
  userUpdateMemoryIsCompleteReducer,
} from './reducers/userReducers';

import {
  userUpdateDetailsReducer,
  userDetailsReducer,
} from './reducers/userDetailsReducers';
import { contactFormReducer } from './reducers/contactFormReducers';
import { adminUserMemoriesReducer } from './reducers/adminReducers';
import { profileImageUploadReducer } from './reducers/imageUploadReducers';

//Initialise state to hold user info if logged in.
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const reducer = combineReducers({
  adminUserMemories: adminUserMemoriesReducer,
  contactForm: contactFormReducer,
  userRegistration: userRegistrationReducer,
  userLogin: userLoginReducer,
  userMemories: userMemoriesReducer,
  userCreateMemory: userCreateMemoryReducer,
  userDeleteMemory: userDeleteMemoryReducer,
  userDeleteMemoryTag: userDeleteMemoryTagReducer,
  userUpdateMemory: userUpdateMemoryReducer,
  userUpdateMemorySetDueDate: userUpdateMemorySetDueDateReducer,
  userUpdateMemoryIsComplete: userUpdateMemoryIsCompleteReducer,
  userUpdateDetails: userUpdateDetailsReducer,
  profileImageUpload: profileImageUploadReducer,
  userDetails: userDetailsReducer,
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
