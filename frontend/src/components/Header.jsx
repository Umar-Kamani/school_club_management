import { NavLink } from "react-router-dom";
import "./Header.css";


function Header({ children }) {
  return (
    <div className="hero">
      <div className="circle c1"></div>
      <div className="circle c2"></div>
      <div className="circle c3"></div>

      <div className="navrow">
        <div className="wordmark">Clubhouse</div>
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Dashboard
          </NavLink>
          <NavLink to="/clubs" className={({ isActive }) => (isActive ? "active" : "")}>
            Clubs
          </NavLink>
          <NavLink to="/students" className={({ isActive }) => (isActive ? "active" : "")}>
            Students
          </NavLink>
          <NavLink to="/memberships" className={({ isActive }) => (isActive ? "active" : "")}>
            Memberships
          </NavLink>
        </nav>
      </div>

      {children && <div className="hero-content">{children}</div>}
    </div>
  );
}

export default Header;