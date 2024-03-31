import { useState } from "react";
import { BsPersonVideo3 } from "react-icons/bs";
import { FcReadingEbook } from "react-icons/fc";
import UserCard from "../components/newUserCard";
import { Link, useNavigate } from "react-router-dom";

export const NewUserScreen = () => {
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="justify-center items-center mt-20">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Join as a Content Creator or Content Consumer
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <UserCard
            icon={<BsPersonVideo3 className="text-6xl mx-auto" />}
            userType="Creator"
            selectedUserType={userType}
            setUserType={setUserType}
            description="Create and share your books and other resources"
          />

          <UserCard
            icon={<FcReadingEbook className="text-6xl mx-auto" />}
            userType="User"
            selectedUserType={userType}
            setUserType={setUserType}
            description="Join as a User and explore the content and other resources"
          />
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
          onClick={() => {
            navigate(`/register?role=${userType}`);
          }}
        >
          {userType ? `Register as ${userType}` : "Select Account Type"}
        </button>
      </div>
      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/signin" className="text-green-500 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};
