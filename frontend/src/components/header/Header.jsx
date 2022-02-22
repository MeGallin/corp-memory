import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './Header.scss';
import { FaUser } from 'react-icons/fa';

import { logoutAction } from '../../store/actions/userActions';
import { USER_MEMORIES_RESET } from '../../store/constants/userConstants.js';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logoutAction());
    dispatch({ type: USER_MEMORIES_RESET });
  };
  return (
    <header>
      <nav className="nav-wrapper">
        <div>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div>
          {userInfo ? (
            <>
              <Link to="/user-dashboard">User Dashboard</Link>
              <button onClick={handleLogout}>
                <FaUser />
                {userInfo.name}
              </button>
            </>
          ) : (
            <>
              <Link to="/forms">
                <FaUser />
                login
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
