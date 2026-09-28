import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <Link to="/">
        🏠 Home
      </Link>

      <Link to="/search">
        🔍 Explore
      </Link>

      <Link to="/upload">
        ⬆️ Upload
      </Link>

      <Link to="/dashboard">
        📊 Dashboard
      </Link>

      <hr />

      <Link to="/login">
        👤 Login
      </Link>

    </aside>
  );
}

export default Sidebar;