import { Card } from "./Card";

const Home = () => {
  const books = [
    {
      title: "The Great Gatsby",
      description: "A classic novel about the American Dream",
      rate: 4.5,
    },
    {
      title: "To Kill a Mockingbird",
      description: "A powerful story about racial injustice",
      rate: 4.8,
    },
    {
      title: "Pride and Prejudice",
      description: "A timeless tale of love and societal expectations",
      rate: 4.7,
    },

    {
      title: "The Lord of the Rings",

      description: "A powerful and epic fantasy novel",
      rate: 4.9,
    },
    {
      title: "1984",
      description: "A dystopian novel about the dangers of totalitarianism",
      rate: 4.6,
    },
    {
      title: "The Catcher in the Rye",
      description: "A coming-of-age novel about teenage angst",
      rate: 4.2,
    },
  ];

  const categories = ["Fiction", "Non-Fiction", "Mystery", "Sci-Fi", "Romance"];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Explore Books</h1>
        <div className="flex items-center">
          <select className="p-2 border border-gray-300 rounded">
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="search"
            placeholder="Search"
            className="p-2 border border-gray-300 rounded"
          />
          <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Add Book
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book, index) => (
          <Card
            key={index}
            title={book.title}
            desc={book.description}
            rate={book.rate}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
