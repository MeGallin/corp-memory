import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './UserDashboards.scss';
import { FaPencilAlt } from 'react-icons/fa';

import { userDetailsUpdateAction } from '../../store/actions/userDetailActions';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdateDetails = useSelector((state) => state.userUpdateDetails);
  const { loading, success, error } = userUpdateDetails;

  const [formData, setFormData] = useState({
    id: userInfo?._id,
    name: userInfo?.name,
    email: userInfo?.email,
    password: '',
  });
  const { name, email, password } = formData;

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

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
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      {success ? 'Details have be successfully changed' : null}
      {error ? error.message : null}
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
