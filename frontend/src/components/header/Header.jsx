import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
                {details?.name || userInfo.name}
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
