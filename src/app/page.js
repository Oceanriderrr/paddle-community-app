export default function Home() {
  // Dummy data for the mini calendar/board
  const events = [
    { id: 1, title: "Paddle Meetup - Feb 28" },
    { id: 2, title: "Need Boat for Saturday" },
  ];

  return (
    <div className="min-h-screen bg-blue-300 flex flex-col items-center justify-center p-4">
      {/* Header with tribal vibe */}
      <h1 className="text-4xl font-bold text-blue-900 mb-2 border-b-4 border-blue-900 border-double pb-2">
        Aloha Paddlers
      </h1>
      <p className="text-lg text-gray-800 mb-6">Join the Hawaii Paddle Community</p>

      {/* Mini Calendar/Board */}
      <div className="w-full max-w-md bg-white rounded-lg shadow p-4 mb-8">
        <h2 className="text-xl font-semibold text-blue-800 mb-3">Community Board</h2>
        <ul className="space-y-2">
          {events.map((event) => (
            <li key={event.id} className="text-gray-700">
              {event.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="space-x-4">
        <a
          href="/paddlers"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Find Paddlers
        </a>
        <a
          href="/boats"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Find Escort Boats
        </a>
      </div>
    </div>
  );
}