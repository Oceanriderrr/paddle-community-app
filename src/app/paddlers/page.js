export default function Paddlers() {
  const paddlers = [
    { id: 1, name: "Kaleo" },
    { id: 2, name: "Lani" },
    { id: 3, name: "Makani" },
  ];

  return (
    <div className="min-h-screen hawaiian-bg wave-layer vignette flex flex-col items-center p-6">
      {/* Header */}
      <h1 className="text-5xl font-bold text-[#F5F5F5] mb-6 border-b-2 border-[#6D4C41] pb-2 tracking-tight">
        Find Paddlers
      </h1>

      {/* Paddler List */}
      <ul className="w-full max-w-2xl bg-[#F5F5F5] rounded-lg shadow-lg p-6 space-y-4">
        {paddlers.map((paddler) => (
          <li
            key={paddler.id}
            className="flex justify-between items-center p-4 bg-[#F5F5F5] rounded-lg shadow-md"
          >
            <span className="text-lg text-[#1C2526]">{paddler.name}</span>
            <button className="px-4 py-2 bg-[#558B2F] text-[#F5F5F5] rounded-lg shadow-md hover:bg-[#40C4FF] hover:text-[#1C2526] transition border border-[#6D4C41]">
              Connect
            </button>
          </li>
        ))}
      </ul>

      {/* Back to Home */}
      <a
        href="/"
        className="mt-6 text-[#40C4FF] hover:text-[#558B2F] text-lg transition"
      >
        Back to Home
      </a>
    </div>
  );
}