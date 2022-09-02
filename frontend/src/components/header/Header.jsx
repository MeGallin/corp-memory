import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UserComponent from '../userComponent/UserComponent';

import './Header.scss';

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <header>
        <nav className="nav-wrapper">
          <span>
            {userInfo ? (
              <NavLink
                className={(navData) => (navData.isActive ? 'active' : '')}
                to="/"
              >
                Memories
              </NavLink>
            ) : (
              <NavLink
                className={(navData) => (navData.isActive ? 'active' : '')}
                to="/"
              >
                Home
              </NavLink>
            )}
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
      {userInfo ? <UserComponent /> : null}
    </>
  );
};

export default Header;
