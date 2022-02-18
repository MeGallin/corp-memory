import './Header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact Us</Link>
      <Link to="/forms">login/logout</Link>
    </header>
  );
};

export default Header;
