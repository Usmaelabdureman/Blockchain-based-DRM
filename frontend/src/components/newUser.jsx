import { useState } from "react";

export const NewUserScreen = () => {
  const [userType, setUserType] = useState("Creator");

  return (
    <div className="container mx-auto p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Join Us</h1>
      </div>

      <div className="flex justify-center mt-10">
        {/* Full-width box */}
        <div className="max-w-screen-md w-full border p-6 rounded shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            {/* Creator Card */}
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Creator</div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="font-bold text-xl mb-2">
                    <label className="mr-2">
                      <input
                        type="radio"
                        value="Creator"
                        checked={userType === "Creator"}
                        onChange={() => setUserType("Creator")}
                      />
                    </label>
                  </div>
                </div>
                <p className="text-gray-700 text-base">
                  Create and share your Books and other resources
                </p>
              </div>
            </div>

            {/* User Card */}
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">User</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="font-bold text-xl mb-2">
                    <label>
                      <input
                        type="radio"
                        value="User"
                        checked={userType === "User"}
                        onChange={() => setUserType("User")}
                      />
                    </label>
                  </div>
                </div>
                <p className="text-gray-700 text-base">
                  Join and explore the Books and other resources
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center p-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            window.location.href = `/register?role=${userType}`;
          }}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};
