export default function Home() {
  const events = [
    { id: 1, title: "Paddle Meetup - Feb 28" },
    { id: 2, title: "Need Boat for Saturday" },
  ];

  return (
    <div className="min-h-screen beach-bg sunset-glow flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-2 border-b-4 border-brown-600 border-dashed pb-2 canoe-silhouette">
        Aloha Paddlers
      </h1>
      <p className="text-lg text-white mb-6">Join the Hawaii Paddle Community</p>
      <div className="space-x-4 mb-8">
        <a href="/login" className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900">
          Login
        </a>
        <a href="/signup" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-brown-700">
          Sign Up
        </a>
      </div>
      <div className="w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow p-4 mb-8">
        <h2 className="text-xl font-semibold text-blue-800 mb-3">Community Board</h2>
        <ul className="space-y-2">
          {events.map((event) => (
            <li key={event.id} className="text-gray-800">
              {event.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="space-x-4">
        <a href="/paddlers" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Find Paddlers
        </a>
        <a href="/boats" className="px-6 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900">
          Find Escort Boats
        </a>
      </div>
    </div>
  );
}