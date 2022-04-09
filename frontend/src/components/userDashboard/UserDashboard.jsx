import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './UserDashboards.scss';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';

import { userDetailsUpdateAction } from '../../store/actions/userDetailActions';
import { userUpdateIsCompleteAction } from '../../store/actions/userActions';
import { profileImageUploadAction } from '../../store/actions/imageUploadAction';
import InputFieldComponent from '../inputField/inputFieldComponent';
import LoadingComponent from '../loadingComponent/LoadingComponent';
import LogoutComponent from '../logout/LogoutComponent';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const nameRegEx = /^([\w])+\s+([\w\s])+$/i;
  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  const passwordRegEx =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const [showCompleted, setShowCompleted] = useState(false);

  const profileImageUpload = useSelector((state) => state.profileImageUpload);
  const {
    loading: profileImageLoading,
    error: profileImageError,
    profileImageUploaded,
  } = profileImageUpload;

  const userDetails = useSelector((state) => state.userDetails);
  const { details } = userDetails;
  const userMemories = useSelector((state) => state.userMemories);
  const { memories } = userMemories;

  const completedMemories = memories?.filter((mem) => {
    if (mem.isComplete) return true;
    return false;
  });

  const [checked, setChecked] = useState(false);

  const [formData, setFormData] = useState({
    id: details?.id,
    name: details?.name,
    email: details?.email,
    password: '',
    profileImage: profileImageUploaded?.avatar || details?.profileImage,
  });
  const { id, name, email, password, profileImage } = formData;

  const userUpdateDetails = useSelector((state) => state.userUpdateDetails);
  const { loading, success, error } = userUpdateDetails;

  const handleOnchange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateMemory = (e) => {
    e.preventDefault();
    //Dispatch Action here
    dispatch(userDetailsUpdateAction(formData));
    setFormData({
      id: formData.id,
      name: formData.name,
      email: formData.email,
      password: '',
      profileImage: formData.profileImage,
    });
  };

  const handleOnchangeIsComplete = (id, value) => {
    const toggledValue = (value = !value);
    setChecked((value = !value));
    //Dispatch setDueDate Action
    dispatch(userUpdateIsCompleteAction({ id: id, isComplete: toggledValue }));
  };

  const [previewImage, setPreviewImage] = useState('');
  const [previewImageFile, setPreviewImageFile] = useState('');

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const uploadFileHandler = (e) => {
    const imageFile = e.target.files[0];
    setPreviewImageFile(imageFile);
    previewFile(imageFile);
  };

  const handleImageUpdate = (e) => {
    e.preventDefault();
    const formImageData = new FormData();
    formImageData.append('profileImage', previewImageFile);

    // Dispatch Profile image upload Action
    dispatch(profileImageUploadAction(formImageData));
    setPreviewImage('');
  };

  const handelCancelUpload = () => {
    document.getElementById('profileImage').value = '';
    setPreviewImage('');
  };

  return (
    <>
      {success ? (
        <div className="user-dashboard-updated">
          Your details have be successfully changed
        </div>
      ) : null}
      {error ? `Failed to update. ${error}` : null}
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="userDashboard-wrapper">
          <fieldset className="fieldSet">
            <legend>Completed</legend>

            <LogoutComponent />
            <div
              className="show-completed"
              onClick={() => setShowCompleted(!showCompleted)}
            >
              {!showCompleted
                ? `SHOW completed [${completedMemories?.length}]`
                : 'HIDE completed Memories'}
            </div>
            {showCompleted ? (
              <div>
                {completedMemories?.length > 0
                  ? completedMemories?.map((memory) => (
                      <div key={memory._id}>
                        <h4>{memory.title}</h4>
                        <p>{memory.memory}</p>
                        <div>
                          <label>
                            Un-mark as Completed:
                            <input
                              type="checkbox"
                              id="isComplete"
                              name="isComplete"
                              checked={checked ? checked : memory.isComplete}
                              onChange={() =>
                                handleOnchangeIsComplete(
                                  memory._id,
                                  memory.isComplete,
                                )
                              }
                            />
                          </label>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            ) : null}
          </fieldset>
          <fieldset className="fieldSet">
            <legend>Update User Details</legend>
            <div>
              <p>Id: {id}</p>
              <p>Name: {name}</p>
              <p>Email: {email}</p>
              <p>
                Admin:{' '}
                {details?.isAdmin ? (
                  <FaRegThumbsUp style={{ color: 'green' }} />
                ) : (
                  <FaRegThumbsDown style={{ color: 'crimson' }} />
                )}
              </p>
              <p>
                SUSPENDED:{' '}
                {details?.isSuspended ? (
                  <FaRegThumbsUp style={{ color: 'green' }} />
                ) : (
                  <FaRegThumbsDown style={{ color: 'crimson' }} />
                )}
              </p>
              {details?.isAdmin ? (
                <NavLink to="/admin" className="user-dashboard-link">
                  View User Summary
                </NavLink>
              ) : null}
              <p>
                Email Confirmed:{' '}
                {details?.isConfirmed ? (
                  <FaRegThumbsUp style={{ color: 'green' }} />
                ) : (
                  <FaRegThumbsDown style={{ color: 'crimson' }} />
                )}
              </p>

              {profileImageUploaded?.avatar ? (
                // profileImageUploaded?.avatar is the selected image to upload
                <img src={`${profileImageUploaded?.avatar}`} alt="sample" />
              ) : !profileImage?.avatar && !details?.profileImage ? (
                <img src={`${details?.profileImage}`} alt="sample" />
              ) : (
                <img
                  src={`${
                    profileImage?.avatar
                      ? profileImage?.avatar
                      : details?.profileImage
                  }`}
                  alt={details?.name}
                />
              )}

              <div>
                <form onSubmit={handleImageUpdate}>
                  {profileImageLoading ? <LoadingComponent /> : null}
                  <InputFieldComponent
                    id="profileImage"
                    label="Change Profile Image"
                    type="file"
                    name="profileImage"
                    onChange={uploadFileHandler}
                  />
                  {previewImage ? (
                    <>
                      Image Preview
                      <img src={previewImage} alt="profile preview" />
                      <button type="submit">I Like It</button>
                      <button type="button" onClick={handelCancelUpload}>
                        Cancel
                      </button>
                    </>
                  ) : null}

                  {profileImageError ? 'Error uploading' : null}
                </form>
              </div>
            </div>

            <div>
              <form onSubmit={handleUpdateMemory}>
                <InputFieldComponent
                  label="Name"
                  value={name}
                  type="text"
                  name="name"
                  required
                  className={!nameRegEx.test(name) ? 'invalid' : 'entered'}
                  error={
                    !nameRegEx.test(name) && name?.length !== 0
                      ? `Name field must start with an uppercase letter and contain at least 3 letters and have no white space.`
                      : null
                  }
                  onChange={handleOnchange}
                />
                <InputFieldComponent
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  className={!emailRegEx.test(email) ? 'invalid' : 'entered'}
                  error={
                    !emailRegEx.test(email) && email?.length !== 0
                      ? `Invalid email address.`
                      : null
                  }
                  onChange={handleOnchange}
                />

                <InputFieldComponent
                  label="Change Your Password"
                  type="password"
                  name="password"
                  value={password}
                  required
                  className={
                    !passwordRegEx.test(password) ? 'invalid' : 'entered'
                  }
                  error={
                    !passwordRegEx.test(password) && password?.length !== 0
                      ? `Password must contain at least l Capital letter, 1 number and 1 special character.`
                      : null
                  }
                  onChange={handleOnchange}
                />
                {!profileImageUploaded?.avatar ? (
                  <button type="submit">UPDATE</button>
                ) : (
                  <button type="submit" className="submit-button">
                    CONFIRM UPDATE
                  </button>
                )}
              </form>
            </div>
          </fieldset>
        </div>
      )}
    </>
  );
};

export default UserDashboard;
