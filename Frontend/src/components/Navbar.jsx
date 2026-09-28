import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  Search, 
  Upload, 
  Bell, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Tv2, 
  PlusCircle, 
  LogIn 
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearch(event) {
    event.preventDefault();
    const searchInput = event.target.elements.search.value;

    if (searchInput.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  }

  function handleLogout() {
    logout();
    setShowDropdown(false);
    navigate("/");
  }

  return (
    <header className="navbar">
      {/* Brand Logo */}
      <Link to="/" className="navbar-brand" aria-label="UTube Home">
        <div className="logo-badge">
          <div className="logo-icon"></div>
        </div>
        <span className="navbar-logo-text">
          <span>U</span>Tube
        </span>
      </Link>

      {/* Search Input Bar */}
      <form className="navbar-search" onSubmit={handleSearch}>
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon-left" />
          <input
            name="search"
            type="text"
            aria-label="Search videos"
            placeholder="Search videos, channels, creators..."
            autoComplete="off"
          />
          <button type="submit" className="search-submit-btn" title="Search">
            <Search size={16} />
          </button>
        </div>
      </form>

      {/* Right Navbar Actions */}
      <div className="navbar-actions">
        {isAuthenticated ? (
          <>
            <Link to="/upload" className="upload-btn-link">
              <PlusCircle size={18} color="#ff1e38" />
              <span>Create</span>
            </Link>

            <button className="nav-icon-btn" title="Notifications">
              <Bell size={19} />
              <span className="notification-badge"></span>
            </button>

            {/* User Profile Avatar & Dropdown Menu */}
            <div className="user-menu-container" ref={dropdownRef}>
              <button
                className="user-avatar-btn"
                onClick={() => setShowDropdown((prev) => !prev)}
                title="User Profile Menu"
              >
                <img src={user.avatar} alt={user.name} className="user-avatar-img" />
              </button>

              {showDropdown && (
                <div className="user-dropdown">
                  <div className="dropdown-user-info">
                    <img src={user.avatar} alt={user.name} />
                    <div>
                      <div className="user-details-name">{user.name}</div>
                      <div className="user-details-handle">{user.handle}</div>
                    </div>
                  </div>

                  <Link
                    to="/channel/me"
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    <Tv2 size={16} />
                    <span>Your Channel</span>
                  </Link>

                  <Link
                    to="/dashboard"
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    <LayoutDashboard size={16} />
                    <span>Creator Studio</span>
                  </Link>

                  <Link
                    to="/upload"
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    <Upload size={16} />
                    <span>Upload Video</span>
                  </Link>

                  <button className="dropdown-item logout" onClick={handleLogout}>
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/login" className="btn-signin">
            <LogIn size={18} />
            <span>Sign in</span>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;