import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="navbar">
      <Link
        className="navLink"
        to="/"
      >
        Home
      </Link>
      <Link
        className="navLink"
        to="/Users"
      >
        History
      </Link>
    </div>
  );
};

export default Header;
