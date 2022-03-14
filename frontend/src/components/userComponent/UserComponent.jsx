import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './UserComponent.scss';

const UserComponent = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return userInfo ? (
    <div className="user-component-wrapper">
      <p>Current USER: {userInfo.name} </p>
      <NavLink to="/user-dashboard">LOGOUT</NavLink>
    </div>
  ) : null;
};

export default UserComponent;
