export default function Boats() {
    // Dummy boat data
    const boats = [
      { id: 1, name: "Ka Moana" },
      { id: 2, name: "Leilani" },
      { id: 3, name: "Hoku" },
    ];
  
    return (
        <div className="min-h-screen beach-bg sunset-glow flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold text-white mb-6 border-b-4 border-brown-600 border-dashed pb-2 canoe-silhouette">
          Find Escort Boats
        </h1>
  
        {/* Boat List */}
        <ul className="w-full max-w-md space-y-4">
          {boats.map((boat) => (
            <li
              key={boat.id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow"
            >
              <span className="text-lg text-gray-800">{boat.name}</span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Book
              </button>
            </li>
          ))}
        </ul>
  
        {/* Back to Home */}
        <a
          href="/"
          className="mt-6 text-blue-900 hover:underline"
        >
          Back to Home
        </a>
      </div>
    );
  }