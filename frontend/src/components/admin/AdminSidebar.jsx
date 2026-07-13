import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingBag,
  FaTags,
  FaList,
  FaUsers,
  FaArrowLeft,
  FaEnvelope,
  FaTimes,
} from "react-icons/fa";

function AdminSidebar({ isOpen, setIsOpen }) {
  const menus = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/admin/dashboard",
    },
    {
      name: "Products",
      icon: <FaBoxOpen />,
      path: "/admin/products",
    },
    {
      name: "Orders",
      icon: <FaShoppingBag />,
      path: "/admin/orders",
    },
    {
      name: "Brands",
      icon: <FaTags />,
      path: "/admin/brands",
    },
    {
      name: "Categories",
      icon: <FaList />,
      path: "/admin/categories",
    },
    {
      name: "Users",
      icon: <FaUsers />,
      path: "/admin/users",
    },
    {
      name: "Messages",
      icon: <FaEnvelope />,
      path: "/admin/messages",
    },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static
          top-0 left-0
          z-50
          w-72
          h-screen
          bg-black
          text-white
          flex flex-col
          shadow-2xl
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 md:hidden text-2xl"
        >
          <FaTimes />
        </button>

        {/* Logo */}
        <div className="px-8 py-8 border-b border-gray-800">
          <h1 className="text-3xl font-extrabold tracking-wide">
            Sneakerzz
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Admin Panel
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-8 px-4">
          {menus.map((menu) => (
            <NavLink
              key={menu.name}
              to={menu.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-5 py-4 mb-3 transition-all duration-300 ${
                  isActive
                    ? "bg-orange-500 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-900 hover:text-white"
                }`
              }
            >
              <span className="text-xl">{menu.icon}</span>
              <span className="font-medium">{menu.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-800 p-5">
          <NavLink
            to="/"
            className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition"
          >
            <FaArrowLeft />
            Back to Store
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;