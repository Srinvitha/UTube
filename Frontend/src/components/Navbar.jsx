import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();

    const searchInput = event.target.elements.search.value;

    if (searchInput.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  }

  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo">
        UTube
      </Link>

      <form
        className="navbar-search"
        onSubmit={handleSearch}
      >
        <input
          name="search"
          type="text"
          placeholder="Search videos..."
        />

        <button type="submit">
          Search
        </button>
      </form>

      <div className="navbar-actions">

        <Link to="/login">
          <button type="button">
            Login
          </button>
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;