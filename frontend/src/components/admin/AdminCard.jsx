import { Link } from "react-router-dom";

function AdminCard({
  title,
  value,
  icon,
  link,
  dark = false,
}) {
  return (
    <Link
      to={link}
      className={`rounded-2xl md:rounded-3xl p-4 md:p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        dark
          ? "bg-black text-white border-black"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between">

        <div>
          <p
            className={`text-xs md:text-sm ${
              dark ? "text-gray-300" : "text-gray-500"
            }`}
          >
            {title}
          </p>

          <h2
            className={`mt-2 md:mt-4 text-3xl md:text-5xl font-bold ${
              dark ? "text-white" : "text-black"
            }`}
          >
            {value}
          </h2>
        </div>

        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-orange-100 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>

      </div>
    </Link>
  );
}

export default AdminCard;