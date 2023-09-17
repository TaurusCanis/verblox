import { Link } from "react-router-dom";
import "./navbar.css";
import { useAuth } from "../contexts/AuthContext";
import { useLogout } from "../hooks/useLogout";

export default function Navbar() {
    const { user } = useAuth();
    const logout = useLogout();

    return (
        <nav className="navbar">
            <span className="navbar-toggle" id="js-navbar-toggle">
                <i className="fas fa-bars"></i>
            </span>
            <Link to="/" className="logo">Verblox</Link>
            <ul className="main-nav" id="js-menu">
                <li>
                    <Link to="/play"className="nav-links" id="play-link">Play</Link>
                </li>
                <li>
                    <Link to="/leaderboard"className="nav-links" id="leaderboard-link">Leaderboard</Link>
                </li>
                {
                    !user || user.isAnonymous ? 
                    <>
                        <li>
                            <Link to="/login"className="nav-links" id="login-link">Login</Link>
                        </li>
                        <li>
                            <Link to="/register"className="nav-links" id="signup-link">Sign up</Link>
                        </li>
                    </>
                    :
                    <>
                        <li>
                            <Link to="/dashboard"className="nav-links" id="dashboard-link">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/" onClick={logout} className="nav-links" id="logout-link">Logout</Link>
                        </li>
                    </>
                }
            </ul>
        </nav>
    );
}