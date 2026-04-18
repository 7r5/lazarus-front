export default function Sidebar({ categories, sizes, onFilterSelect, activeFilters }) {
  
  // Función interna para manejar la lógica de alternancia (toggle)
  const handleToggle = (type, value) => {
    // Si el valor ya está seleccionado, enviamos string vacío para limpiar el filtro
    const newValue = activeFilters[type] === value ? '' : value;
    onFilterSelect(type, newValue);
  };

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
      {/* Sección de Categorías */}
      <div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-5">
          Categorías
        </h3>
        <ul className="space-y-1.5">
          {Array.isArray(categories) && categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => handleToggle('category', cat)}
                className={`text-sm w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 ${
                  activeFilters.category === cat 
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-200 translate-x-1' 
                  : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
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
        <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-5">
          Tallas Disponibles
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {Array.isArray(sizes) && sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleToggle('size', size)}
              className={`border-2 text-[11px] font-bold py-2.5 rounded-lg transition-all duration-200 ${
                activeFilters.size === size
                ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm'
                : 'border-slate-100 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Indicador sutil de filtros activos */}
      {(activeFilters.category || activeFilters.size) && (
        <div className="pt-4 border-t border-slate-200">
          <p className="text-[10px] text-slate-400 italic">
            * Haz clic en un filtro activo para quitarlo.
          </p>
        </div>
      )}
    </aside>
  );
}