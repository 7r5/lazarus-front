import { useEffect, useState } from 'react';
import { 
  getProducts, 
  filterProducts, 
  getCategories, 
  getSizes, 
  getSizesByCategory 
} from './services/api';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState({ category: '', size: '' });
  
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);

  // 1. EL WAKE-UP CALL: Una función simple para "tocar la puerta" del servidor
  const wakeUpServer = async () => {
    try {
      // Llamamos a cualquier endpoint ligero solo para activar el contenedor de Render
      await getCategories();
      console.log("Servidor despertando...");
    } catch (e) {
      console.log("Esperando al servidor...");
    }
  };

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes, sizeRes] = await Promise.all([
        getProducts(),
        getCategories(),
        getSizes()
      ]);
      
      setProducts(prodRes.data);
      setAvailableCategories(catRes.data);
      setAvailableSizes(sizeRes.data);
    } catch (error) {
      console.error("Error cargando datos iniciales:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterSelect = async (type, value) => {
    const newFilters = { ...activeFilters, [type]: value };

    if (type === 'category') {
      newFilters.size = ''; 
      try {
        if (value !== '') {
          const sizeRes = await getSizesByCategory(value);
          setAvailableSizes(sizeRes.data);
        } else {
          const sizeRes = await getSizes();
          setAvailableSizes(sizeRes.data);
        }
      } catch (error) {
        console.error("Error al actualizar tallas:", error);
      }
    }

    setActiveFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = async (filters) => {
    setLoading(true);
    try {
      const cleanParams = {};
      if (filters.category) cleanParams.category = filters.category;
      if (filters.size) cleanParams.size = filters.size;

      if (Object.keys(cleanParams).length === 0) {
        const res = await getProducts();
        setProducts(res.data);
      } else {
        const res = await filterProducts(cleanParams);
        setProducts(res.data);
      }
    } catch (error) {
      console.error("Error al filtrar:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Ejecutamos el despertar y la carga de datos al montar el componente
    wakeUpServer();
    loadInitialData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tighter text-blue-600 uppercase">
            Lazarus<span className="text-slate-400"> Shopee</span>
          </h1>
          <button 
            onClick={() => { 
              setActiveFilters({category: '', size: ''}); 
              loadInitialData(); 
            }}
            className="text-slate-500 hover:text-blue-600 text-sm font-bold uppercase tracking-widest transition-colors"
          >
            Resetear Filtros
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        <Sidebar 
          categories={availableCategories} 
          sizes={availableSizes} 
          onFilterSelect={handleFilterSelect}
          activeFilters={activeFilters}
        />

        <div className="flex-1">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              <div className="text-center">
                <p className="text-slate-600 font-bold animate-pulse">
                  Despertando el servidor...
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Esto puede tardar unos segundos en el plan gratuito de Render.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              
              {products.length === 0 && (
                <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
                  <p className="text-slate-400 text-lg font-medium">No se encontraron productos.</p>
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