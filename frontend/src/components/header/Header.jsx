import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './Header.scss';

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
