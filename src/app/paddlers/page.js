export default function Paddlers() {
    // Dummy paddler data
    const paddlers = [
      { id: 1, name: "Kaleo" },
      { id: 2, name: "Lani" },
      { id: 3, name: "Makani" },
    ];
  
    return (
        <div className="min-h-screen beach-bg sunset-glow flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold text-white mb-6 border-b-4 border-brown-600 border-dashed pb-2 canoe-silhouette">
          Find Paddlers
        </h1>
  
        {/* Paddler List */}
        <ul className="w-full max-w-md space-y-4">
          {paddlers.map((paddler) => (
            <li
              key={paddler.id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow"
            >
              <span className="text-lg text-gray-800">{paddler.name}</span>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Connect
              </button>
            </li>
          ))}
        </ul>
  
        {/* Back to Home */}
        <a
          href="/"
          className="mt-6 text-blue-600 hover:underline"
        >
          Back to Home
        </a>
      </div>
    );
  }