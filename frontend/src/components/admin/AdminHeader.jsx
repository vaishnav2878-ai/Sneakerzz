import { FaUserCircle, FaBars } from "react-icons/fa";

function AdminHeader({ setIsOpen }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-2xl text-gray-700"
        >
          <FaBars />
        </button>

        <h1 className="text-lg md:text-2xl font-bold text-gray-800">
          Sneakerzz Admin
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <FaUserCircle className="text-3xl text-gray-700" />

        <div className="hidden sm:block">
          <p className="font-semibold">Admin</p>
          <p className="text-xs text-gray-500">
            Administrator
          </p>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;