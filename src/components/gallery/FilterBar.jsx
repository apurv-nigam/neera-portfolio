const filters = [
  { label: "All", value: "all" },
  { label: "Oil Colors", value: "oil" },
  { label: "Watercolor", value: "watercolor" },
];

const FilterBar = ({ active, onChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            active === filter.value
              ? "bg-accent text-white shadow-md"
              : "bg-warm-gray-100 text-warm-gray-600 hover:bg-warm-gray-200"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
