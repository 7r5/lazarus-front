import { useEffect, useState } from 'react';
import { getProducts, filterProducts } from './services/api';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState({ category: '', size: '' });
  
  // Estos datos deberían venir de tu API, los pongo aquí como placeholder
  const [availableCategories, setAvailableCategories] = useState(['Calzado', 'Accesorios', 'Ropa']);
  const [availableSizes, setAvailableSizes] = useState(['CH', 'M', 'G', '42', '44']);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setProducts(res.data);
      // Aquí podrías cargar también las categorías y tallas reales desde el backend
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterSelect = (type, value) => {
    const newFilters = { ...activeFilters, [type]: value === activeFilters[type] ? '' : value };
    setActiveFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = async (filters) => {
    setLoading(true);
    try {
      const res = await filterProducts(filters);
      setProducts(res.data);
    } catch (error) {
      console.error("Error filtrando:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tighter text-blue-600 uppercase">
            Lazarus<span className="text-slate-400">Shop</span>
          </h1>
          <button 
            onClick={() => { setActiveFilters({category: '', size: ''}); loadData(); }}
            className="text-slate-500 hover:text-blue-600 text-sm font-bold uppercase tracking-widest transition-colors"
          >
            Resetear Filtros
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        {/* Sidebar de Filtros */}
        <Sidebar 
          categories={availableCategories} 
          sizes={availableSizes} 
          onFilterSelect={handleFilterSelect}
          activeFilters={activeFilters}
        />

        {/* Grid de Productos */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
              
              {products.length === 0 && (
                <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
                  <p className="text-slate-400 text-lg font-medium">No hay productos con esos filtros.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;