import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  Home as HomeIcon, 
  Compass, 
  Flame, 
  FolderHeart, 
  Upload, 
  LayoutDashboard, 
  Tv2, 
  LogIn, 
  LogOut 
} from "lucide-react";

function Sidebar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `sidebar-link ${isActive ? "active" : ""}`
        }
      >
        <HomeIcon size={20} />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/search?q=explore"
        className={({ isActive }) =>
          `sidebar-link ${isActive ? "active" : ""}`
        }
      >
        <Compass size={20} />
        <span>Explore</span>
      </NavLink>

      <NavLink
        to="/search?q=trending"
        className={({ isActive }) =>
          `sidebar-link ${isActive ? "active" : ""}`
        }
      >
        <Flame size={20} />
        <span>Trending</span>
      </NavLink>

      <div className="sidebar-divider" />

      {isAuthenticated ? (
        <>
          <div className="sidebar-section-title">Studio & Creator</div>

          <NavLink
            to="/upload"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <Upload size={20} />
            <span>Upload video</span>
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <LayoutDashboard size={20} />
            <span>Creator studio</span>
          </NavLink>

          <NavLink
            to="/channel/me"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <Tv2 size={20} />
            <span>My Channel</span>
          </NavLink>

          <div className="sidebar-divider" />

          <button className="sidebar-link" onClick={logout} style={{ width: "100%" }}>
            <LogOut size={20} color="#ff4d4d" />
            <span style={{ color: "#ff4d4d" }}>Sign out</span>
          </button>
        </>
      ) : (
        <div className="sidebar-guest-card">
          <p>Sign in to like videos, comment, and upload your own creations.</p>
          <Link to="/login" className="btn-signin" style={{ justifyContent: "center" }}>
            <LogIn size={16} />
            <span>Sign in</span>
          </Link>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;