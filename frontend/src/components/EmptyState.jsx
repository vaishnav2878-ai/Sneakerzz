import { Link } from "react-router-dom";

function EmptyState({
  image,
  title,
  description,
  buttonText,
  buttonLink,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <img
        src={image}
        alt={title}
        className="w-72 md:w-96"
      />

      <h2 className="text-3xl font-bold mt-6">
        {title}
      </h2>

      <p className="text-gray-500 mt-3 text-center max-w-md">
        {description}
      </p>

      <Link
        to={buttonLink}
        className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg transition"
      >
        {buttonText}
      </Link>
    </div>
  );
}

export default EmptyState;