import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './LogoutComponent.scss';

import { logoutAction } from '../../store/actions/userActions';

const LogoutComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { details } = userDetails;

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate('/');
  };
  return (
    <button className="logout-button" onClick={handleLogout}>
      <div className="button-content-wrapper">
        <div>logout</div>
        <p className="small-text">{details?.name || userInfo.name}</p>
      </div>
    </button>
  );
};

export default LogoutComponent;
