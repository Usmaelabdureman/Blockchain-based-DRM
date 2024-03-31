import { BiEdit } from "react-icons/bi";

const userInfo = [
  {
    id: 1,
    firstName: "Naol",
    lastName: "D",
    email: "naol@gmail.com",
    bio: "I am a software engineer",
    usedItems: [
      {
        id: 1,
        name: "Data Structures and Algorithms",
        description: "A comprehensive guide to data structures and algorithms",
      },
      {
        id: 2,
        name: "Clean Code",
        description: "Learn how to write clean and maintainable code",
      },
      {
        id: 3,
        name: "Design Patterns",
        description:
          "Explore common design patterns used in software development",
      },
    ],
  },
];

export const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="md:w-1/4 bg-gray-100 border-r border-gray-300 p-4">
        {userInfo.map((user) => (
          <div key={user.id} className="mb-6">
            <img
              src="https://i.pravatar.cc/150?img=7"
              alt="profile"
              className=" h-[200px] w-[200px] rounded-md mb-2"
            />
            <h1 className="text-xl font-bold">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="mt-2">{user.bio}</p>
          </div>
        ))}
      </aside>
      <div className="md:w-3/4 bg-white p-4">
        <header className="border-b border-gray-300 pb-4 mb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Welcome to your dashboard</h1>

            <button className="text-blue-500 relative">
              <BiEdit className="inline-block" />
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 text-sm rounded opacity-0 transition-opacity duration-300 pointer-events-none">
                Edit Profile
              </span>
            </button>
          </div>
        </header>
        <div>
          <h1 className="text-lg font-bold mb-2">Usage Status</h1>
          {userInfo.map((user) => (
            <ul
              key={user.id}
              className="border border-gray-300 rounded-md p-2 mb-4"
            >
              {user.usedItems.map((item) => (
                <li key={item.id} className="mb-2">
                  <h1 className="font-semibold">{item.name}</h1>
                  <p className="text-gray-600">{item.description}</p>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};
