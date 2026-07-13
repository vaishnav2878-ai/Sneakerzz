import { Link, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { logout } from "../redux/authSlice";
import { getNavbarCounts } from "../services/navbarService";
import { getSuggestions } from "../services/productService";


function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  console.log("Redux User:", user);
  console.log("Role:", user?.role);

  // Search
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Navbar Counts
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchCounts = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const data = await getNavbarCounts(token);

      setCartCount(data.cartCount);
      setWishlistCount(data.wishlistCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, [isAuthenticated]);

  useEffect(() => {
    const updateNavbar = () => {
      fetchCounts();
    };

    window.addEventListener(
      "navbar-update",
      updateNavbar
    );

    return () => {
      window.removeEventListener(
        "navbar-update",
        updateNavbar
      );
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const data = await getSuggestions(value);

      setSuggestions(data.products);
      setShowSuggestions(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold"
        >
          Sneakerzz
        </Link>

        {/* Search */}
        <div className="hidden md:flex relative items-center bg-white rounded-lg px-3 py-2 w-96">
          <FaSearch className="text-gray-500" />

          <input
            type="text"
            placeholder="Search sneakers..."
            value={search}
            onChange={(e) =>
              handleSearch(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/shop?search=${search}`);
                setShowSuggestions(false);
              }
            }}
            className="w-full outline-none px-2 text-black"
          />

          {showSuggestions &&
            suggestions.length > 0 && (
              <div className="absolute top-12 left-0 w-full bg-white text-black rounded-lg shadow-lg border z-50">
                {suggestions.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      navigate(
                        `/product/${item._id}`
                      );
                      setSearch("");
                      setSuggestions([]);
                      setShowSuggestions(false);
                    }}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
        </div>

        {/* Right Side */}
        {/* Desktop */}
<div className="hidden md:flex items-center gap-6">

  {/* Wishlist */}
  <div className="relative">
    <Link to="/wishlist">
      <FaHeart size={20} />
    </Link>

    {wishlistCount > 0 && (
      <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">
        {wishlistCount}
      </span>
    )}
  </div>

  {/* Cart */}
  <div className="relative">
    <Link to="/cart">
      <FaShoppingCart size={20} />
    </Link>

    {cartCount > 0 && (
      <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">
        {cartCount}
      </span>
    )}
  </div>

  {isAuthenticated ? (
    <>
      <Link
        to="/profile"
        className="flex items-center gap-2"
      >
        <FaUser />
        <span>{user?.name}</span>
      </Link>

      {user?.role === "admin" && (
        <Link
          to="/admin/dashboard"
          className="bg-orange-500 px-3 py-2 rounded-lg"
        >
          Admin
        </Link>
      )}

      <button
        onClick={handleLogout}
        className="bg-red-500 px-3 py-2 rounded-lg"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </>
  )}
</div>

{/* Mobile */}
<div className="flex md:hidden items-center gap-4">

  {/* Wishlist */}
  <div className="relative">
    <Link to="/wishlist">
      <FaHeart size={20} />
    </Link>

    {wishlistCount > 0 && (
      <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">
        {wishlistCount}
      </span>
    )}
  </div>

  {/* Cart */}
  <div className="relative">
    <Link to="/cart">
      <FaShoppingCart size={20} />
    </Link>

    {cartCount > 0 && (
      <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">
        {cartCount}
      </span>
    )}
  </div>

  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="text-2xl"
  >
    {menuOpen ? <FaTimes /> : <FaBars />}
  </button>

</div>

      </div>
      {menuOpen && (
  <div className="md:hidden bg-[#111111] border-t border-gray-800">

    <div className="p-4">

      <div className="flex items-center bg-white rounded-lg px-3 py-2 mb-5">
        <FaSearch className="text-gray-500" />

        <input
  type="text"
  placeholder="Search..."
  value={search}
  onChange={(e) => handleSearch(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      navigate(`/shop?search=${search}`);
      setMenuOpen(false);
      setShowSuggestions(false);
    }
  }}
  className="w-full outline-none px-2 text-black"
/>
      </div>

      <div className="flex flex-col space-y-4">

        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

        <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>

        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>

        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

        <Link to="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist</Link>

        {isAuthenticated ? (
          <>
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>

            {user?.role === "admin" && (
              <Link
                to="/admin/dashboard"
                onClick={() => setMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}

            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="bg-red-500 py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </>
        )}

      </div>

    </div>

  </div>
)}
    </nav>
  );
}

export default Navbar;