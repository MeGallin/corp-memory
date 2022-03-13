import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import './Header.scss';

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
          <NavLink
            className={(navData) => (navData.isActive ? 'active' : '')}
            to="/about"
          >
            About
          </NavLink>
        </span>
        <span>
          <NavLink
            className={(navData) => (navData.isActive ? 'active' : '')}
            to="/contact"
          >
            Contact
          </NavLink>
        </span>

        {userInfo ? (
          <>
            <span>
              <NavLink
                className={(navData) => (navData.isActive ? 'active' : '')}
                to="/user-dashboard"
              >
                Dashboard
              </NavLink>
            </span>

            <button className="header-logout-button" onClick={handleLogout}>
              <div>
                <div>logout</div>
                <p className="small-text">{details?.name || userInfo.name}</p>
              </div>
            </button>
          </>
        ) : (
          <>
            <span>
              <NavLink to="/forms">login</NavLink>
            </span>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
