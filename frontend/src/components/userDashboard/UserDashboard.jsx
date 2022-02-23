import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './UserDashboards.scss';
import { FaPencilAlt } from 'react-icons/fa';

import {
  userDetailsUpdateAction,
  detailsAction,
} from '../../store/actions/userDetailActions';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(detailsAction());
  }, []);

  const userDetails = useSelector((state) => state.userDetails);
  const { details } = userDetails;

  const [formData, setFormData] = useState({
    id: details?.id,
    name: details?.name,
    email: details?.email,
    password: '',
  });
  const { id, name, email, password } = formData;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

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
    dispatch(detailsAction());
    setFormData({
      id: id,
      name: name,
      email: email,
      password: '',
    });
  };

  return (
    <>
      {success ? 'Details have be successfully changed' : null}
      {error ? `Failed to update. ${error}` : null}
      {loading ? (
        'loading...'
      ) : (
        <div className="userDashboard-wrapper">
          <fieldset className="fieldSet">
            <legend>
              <FaPencilAlt />
              Update User Details
            </legend>
            <div>
              <p>Id: {details?.id}</p>
              <p>Name: {details?.name}</p>
              <p>Email: {details?.email}</p>
            </div>

            <div>
              <form onSubmit={handleUpdateMemory}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="name"
                  onChange={handleOnchange}
                />

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="email"
                  onChange={handleOnchange}
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="password"
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
