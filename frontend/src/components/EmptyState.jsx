import { Link } from "react-router-dom";

function EmptyState({ image }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-8">
      <Link to="/">
        <img
          src={image}
          alt="Empty State"
          className="w-64 sm:w-72 md:w-80 lg:w-[420px] xl:w-[480px] object-contain cursor-pointer transition-all duration-300 hover:scale-105"
          draggable="false"
        />
      </Link>
    </div>
  );
}

export default EmptyState;