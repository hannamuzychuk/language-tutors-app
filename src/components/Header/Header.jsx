import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/teachers">Teachers</Link>
        <Link to="/favorites">Favorites</Link>
    </nav>
  );
}

export default Header;