import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './UserComponent.scss';

const UserComponent = () => {
  const userDetails = useSelector((state) => state.userDetails);
  const { details } = userDetails;

  return details ? (
    <div className="user-component-wrapper">
      <p>Current USER: {details?.name} </p>
      <NavLink to="/user-dashboard">LOGOUT</NavLink>
    </div>
  ) : null;
};

export default UserComponent;
