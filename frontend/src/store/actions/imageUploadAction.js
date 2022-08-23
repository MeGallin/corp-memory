import axios from 'axios';
import {
  MEMORY_IMAGE_UPLOAD_FAILURE,
  MEMORY_IMAGE_UPLOAD_REQUEST,
  MEMORY_IMAGE_UPLOAD_SUCCESS,
  PROFILE_IMAGE_UPLOAD_FAILURE,
  PROFILE_IMAGE_UPLOAD_REQUEST,
  PROFILE_IMAGE_UPLOAD_SUCCESS,
} from '../constants/imageUploadConstants';

import { memoriesAction } from './userActions';

export const profileImageUploadAction =
  (formData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PROFILE_IMAGE_UPLOAD_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

<<<<<<< HEAD
      const { data } = await axios.post('/api/profileUpload', formData, config);
=======
      const { data } = await axios.post(`/api/profileUpload`, formData, config);
>>>>>>> 2b42e6399505a740515546244d4e500a7bc2e204
      dispatch({
        type: PROFILE_IMAGE_UPLOAD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PROFILE_IMAGE_UPLOAD_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//Memories images
export const memoryImageUploadAction =
  (memoryId, formData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMORY_IMAGE_UPLOAD_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
          memoryId: memoryId,
        },
      };

      const { data } = await axios.post(
        `/api/memory-image-upload`,
        formData,
        config,
      );
      dispatch({
        type: MEMORY_IMAGE_UPLOAD_SUCCESS,
        payload: data,
      });
      // Update the state of the state
      dispatch(memoriesAction());
    } catch (error) {
      dispatch({
        type: MEMORY_IMAGE_UPLOAD_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
