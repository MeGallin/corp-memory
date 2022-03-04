import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import './Header.scss';
import { FaUser } from 'react-icons/fa';

import { logoutAction } from '../../store/actions/userActions';

const Header = () => {
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
    <header>
      <nav className="nav-wrapper">
        <span>
          <NavLink
            className={(navData) => (navData.isActive ? 'active' : '')}
            to="/"
          >
            Home
          </NavLink>
        </span>
        <span>
          <NavLink to="/about">About</NavLink>
        </span>
        <span>
          <NavLink to="/contact">Contact Us</NavLink>
        </span>

        {userInfo ? (
          <>
            <span>
              <NavLink to="/user-dashboard">
                {' '}
                <FaUser /> Dashboard
              </NavLink>
            </span>
            <span>
              <button onClick={handleLogout}>
                {details?.name || userInfo.name}
              </button>
            </span>
          </>
        ) : (
          <>
            <span>
              <NavLink to="/forms">
                <FaUser />
                login
              </NavLink>
            </span>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
