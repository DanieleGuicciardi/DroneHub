const FilterDropdown = ({ selected, onChange, categories, accent = "blue" }) => (
  <div className="flex justify-center mb-14">
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-gray-800 text-white px-5 py-2 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-${accent}-500 transition`}
    >
      <option value="all">All categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  </div>
);

export default FilterDropdown;
