export default function Home() {
  const events = [
    { id: 1, title: "Paddle Meetup - Feb 28" },
    { id: 2, title: "Need Boat for Saturday" },
  ];

  return (
    <div className="min-h-screen hawaiian-bg wave-layer vignette flex flex-col items-center justify-center p-6">
      {/* Header */}
      <h1 className="text-5xl font-bold text-[#F5F5F5] mb-4 border-b-2 border-[#6D4C41] pb-2 tracking-tight">
        Aloha Paddlers
      </h1>
      <p className="text-xl text-[#F5F5F5] mb-8">A Modern Hub for Hawaii’s Paddle Community</p>

      {/* Buttons */}
      <div className="flex space-x-6 mb-10">
        <a href="/login" className="px-6 py-3 bg-[#40C4FF] text-[#1C2526] rounded-lg shadow-md hover:bg-[#558B2F] hover:text-[#F5F5F5] transition border border-[#6D4C41]">
          Login
        </a>
        <a href="/signup" className="px-6 py-3 bg-[#558B2F] text-[#F5F5F5] rounded-lg shadow-md hover:bg-[#40C4FF] hover:text-[#1C2526] transition border border-[#6D4C41]">
          Sign Up
        </a>
      </div>

      {/* Community Board */}
      <div className="w-full max-w-2xl bg-[#F5F5F5] rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-[#6D4C41] mb-4">Community Board</h2>
        <div className="wave-divider mb-4"></div>
        <ul className="space-y-3">
          {events.map((event) => (
            <li key={event.id} className="text-[#1C2526] text-lg">
              {event.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex space-x-6">
        <a href="/paddlers" className="px-8 py-4 bg-[#558B2F] text-[#F5F5F5] rounded-lg shadow-md hover:bg-[#40C4FF] hover:text-[#1C2526] transition border border-[#6D4C41]">
          Find Paddlers
        </a>
        <a href="/boats" className="px-8 py-4 bg-[#40C4FF] text-[#1C2526] rounded-lg shadow-md hover:bg-[#558B2F] hover:text-[#F5F5F5] transition border border-[#6D4C41]">
          Find Escort Boats
        </a>
      </div>
    </div>
  );
}