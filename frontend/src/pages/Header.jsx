import { Link, useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");

    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-orange">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold" to="/">
          FitStudio
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link " to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user">
                Profile
              </Link>
            </li>

            <li className="nav-item">
              <button className="nav-link btn btn-link " onClick={logout}>
                {" "}
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
