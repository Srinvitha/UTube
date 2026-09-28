import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <NavLink to="/" end>
        Home
      </NavLink>

      <NavLink to="/search">
        Explore
      </NavLink>

      <NavLink to="/upload">
        Upload video
      </NavLink>

      <NavLink to="/dashboard">
        Creator studio
      </NavLink>

      <hr />

      <NavLink to="/login">
        Sign in
      </NavLink>
    </aside>
  );
}

export default Sidebar;