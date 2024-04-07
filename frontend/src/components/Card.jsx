import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import PropTypes from "prop-types";

export const Card = ({ title, desc, rate }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img
        src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1498&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Book Image"
        className="w-full h-40 object-cover mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{desc}</p>
      <div className="flex items-center mb-2">
        <span className="text-yellow-500 mr-1">⭐</span>
        <span className="text-gray-600">{rate}</span>
      </div>
      <div className="flex justify-between mb-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">
          <FaThumbsUp />
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">
          <FaThumbsDown />
        </button>
      </div>
      <div className="flex flex-wrap">
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm mr-2 mb-2">
          Fiction
        </span>
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm mr-2 mb-2">
          Biography
        </span>
        {/* <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm mr-2 mb-2">Tag 3</span> */}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
};
