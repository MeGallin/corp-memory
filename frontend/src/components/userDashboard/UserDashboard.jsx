import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './UserDashboards.scss';
import { FaPencilAlt, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';

import { userDetailsUpdateAction } from '../../store/actions/userDetailActions';
import { userUpdateIsCompleteAction } from '../../store/actions/userActions';
import InputFieldComponent from '../inputField/inputFieldComponent';
import LoadingComponent from '../loadingComponent/LoadingComponent';
import LogoutComponent from '../logout/LogoutComponent';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const nameRegEx = /^([\w])+\s+([\w\s])+$/i;
  const emailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;

  const [showCompleted, setShowCompleted] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { details } = userDetails;
  const userMemories = useSelector((state) => state.userMemories);
  const { memories } = userMemories;

  const completedMemories = memories?.filter((mem) => {
    if (mem.isComplete) return true;
    return false;
  });

  const [checked, setChecked] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    id: details?.id,
    name: details?.name,
    email: details?.email,
    password: '',
    profileImage: details?.profileImage,
  });
  const { id, name, email, password } = formData;

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

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profileImage', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.post('/api/profileUpload', formData, config);
      // console.log('DDD', data);
      setProfileImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <>
      {success ? 'Details have be successfully changed' : null}
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
            <legend>
              <FaPencilAlt style={{ fontSize: '10px', marginRight: '4px' }} />
              Update User Details
            </legend>
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
              {details?.isAdmin ? (
                <NavLink to="/admin">Admin View</NavLink>
              ) : null}

              <p>
                Email Confirmed:{' '}
                {details?.isConfirmed ? (
                  <FaRegThumbsUp style={{ color: 'green' }} />
                ) : (
                  <FaRegThumbsDown style={{ color: 'crimson' }} />
                )}
              </p>

              {!profileImage?.avatar && !details?.profileImage ? (
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

                {uploading ? 'loading...' : null}
                <InputFieldComponent
                  label="Profile Image"
                  type="file"
                  name="profileImage"
                  onChange={uploadFileHandler}
                />

                <InputFieldComponent
                  label="Password"
                  type="password"
                  name="password"
                  value={password}
                  required
                  className={
                    !passwordRegEx.test(password) ? 'invalid' : 'entered'
                  }
                  error={
                    !passwordRegEx.test(password) && password?.length !== 0
                      ? `Password must contain at least 1 uppercase letter and a number`
                      : null
                  }
                  onChange={handleOnchange}
                />

                <button type="submit">UPDATE</button>
              </form>
            </div>
          </fieldset>
        </div>
      )}
    </>
  );
};

export default UserDashboard;
