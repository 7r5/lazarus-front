export default function Sidebar({ categories, sizes, onFilterSelect, activeFilters }) {
  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
      {/* Sección de Categorías */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Categorías</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => onFilterSelect('category', cat)}
                className={`text-sm w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  activeFilters.category === cat 
                  ? 'bg-blue-600 text-white font-bold' 
                  : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Sección de Tallas */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Tallas Disponibles</h3>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onFilterSelect('size', size)}
              className={`border text-[11px] font-bold py-2 rounded-md transition-all ${
                activeFilters.size === size
                ? 'border-blue-600 bg-blue-50 text-blue-600'
                : 'border-slate-200 text-slate-500 hover:border-slate-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}