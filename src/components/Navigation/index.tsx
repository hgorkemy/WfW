import { Link, useLocation } from 'react-router-dom';
import './styles.css';

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="navigation__container">
        <Link to="/" className="navigation__logo">
          🎬 WfW
        </Link>
        <div className="navigation__links">
          <Link
            to="/"
            className={`navigation__link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Ana Sayfa
          </Link>
          <Link
            to="/search"
            className={`navigation__link ${location.pathname === '/search' ? 'active' : ''}`}
          >
            Ara
          </Link>
        </div>
      </div>
    </nav>
  );
}
