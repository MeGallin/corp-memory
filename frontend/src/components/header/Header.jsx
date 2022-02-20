import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './Header.scss';
import { FaUser } from 'react-icons/fa';

import { logoutAction } from '../../store/actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logoutAction());
  };
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact Us</Link>
      {userInfo ? (
        <>
          <button onClick={handleLogout}>
            <FaUser />
            logout
          </button>
        </>
      ) : (
        <>
          <Link to="/forms">login/logout</Link>
        </>
      )}
    </header>
  );
};

export default Header;
