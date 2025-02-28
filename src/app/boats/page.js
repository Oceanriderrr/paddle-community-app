export default function Boats() {
  const boats = [
    { id: 1, name: "Ka Moana" },
    { id: 2, name: "Leilani" },
    { id: 3, name: "Hoku" },
  ];

  return (
    <div className="min-h-screen hawaiian-bg wave-layer vignette flex flex-col items-center p-6">
      {/* Header */}
      <h1 className="text-5xl font-bold text-[#F5F5F5] mb-6 border-b-2 border-[#6D4C41] pb-2 tracking-tight">
        Find Escort Boats
      </h1>

      {/* Boat List */}
      <ul className="w-full max-w-2xl bg-[#F5F5F5] rounded-lg shadow-lg p-6 space-y-4">
        {boats.map((boat) => (
          <li
            key={boat.id}
            className="flex justify-between items-center p-4 bg-[#F5F5F5] rounded-lg shadow-md"
          >
            <span className="text-lg text-[#1C2526]">{boat.name}</span>
            <button className="px-4 py-2 bg-[#40C4FF] text-[#1C2526] rounded-lg shadow-md hover:bg-[#558B2F] hover:text-[#F5F5F5] transition border border-[#6D4C41]">
              Book
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
