import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { 
  getProducts, 
  filterProducts, 
  getCategories, 
  getSizes, 
  getSizesByCategory 
} from './services/api';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import ProductDetailsPage from './components/ProductDetailsPage';

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
        getSizesByCategory("None")
      ]);
      
      // Limpiar los datos de productos para evitar recursión infinita en comments
      const cleanProducts = Array.isArray(prodRes.data) ? prodRes.data.map(product => ({
        ...product,
        comments: undefined, // Remover comments para evitar problemas de renderizado
        category: product.category ? product.category.toLowerCase() : product.category // Normalizar categorías a minúsculas
      })) : [];
      
      // Normalizar categorías del sidebar a minúsculas
      const normalizedCategories = Array.isArray(catRes.data) ? catRes.data.map(cat => 
        typeof cat === 'string' ? cat.toLowerCase() : cat
      ) : [];
      
      setProducts(cleanProducts);
      setAvailableCategories(normalizedCategories);
      setAvailableSizes(Array.isArray(sizeRes.data) ? sizeRes.data : []);
      
      console.log("Datos iniciales cargados:", {
        products: cleanProducts.slice(0, 2), // Solo mostrar primeros 2 para no saturar
        categories: normalizedCategories,
        sizes: sizeRes.data,
        // Comparar categorías
        productCategories: [...new Set(cleanProducts.map(p => p.category))],
        sidebarCategories: normalizedCategories
      });
    } catch (error) {
      console.error("Error cargando datos iniciales:", error);
      // En caso de error, asegurarse de que tengamos arrays vacíos
      setProducts([]);
      setAvailableCategories([]);
      setAvailableSizes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterSelect = async (type, value) => {
    console.log("Filter select:", { type, value });
    console.log("Available categories:", availableCategories);
    console.log("Current products categories:", [...new Set(products.map(p => p.category))]);
    const newFilters = { ...activeFilters, [type]: value };

    if (type === 'category') {
      newFilters.size = ''; 
      try {
        if (value !== '') {
          console.log("Getting sizes for category:", value);
          const sizeRes = await getSizesByCategory(value);
          console.log("Sizes response:", sizeRes.data);
          setAvailableSizes(Array.isArray(sizeRes.data) ? sizeRes.data : []);
        } else {
          console.log("Getting all sizes");
          const sizeRes = await getSizes();
          console.log("All sizes response:", sizeRes.data);
          setAvailableSizes(Array.isArray(sizeRes.data) ? sizeRes.data : []);
        }
      } catch (error) {
        console.error("Error al actualizar tallas:", error);
      }
    }

    setActiveFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = async (filters) => {
    console.log("Applying filters:", filters);
    setLoading(true);
    try {
      const cleanParams = {};
      if (filters.category) cleanParams.category = filters.category.toLowerCase(); // Normalizar a minúsculas
      if (filters.size) cleanParams.size = filters.size;

      console.log("Clean params:", cleanParams);

      if (Object.keys(cleanParams).length === 0) {
        console.log("Getting all products");
        const res = await getProducts();
        console.log("All products response:", res.data);
        // Limpiar comments y normalizar categorías
        const cleanProducts = Array.isArray(res.data) ? res.data.map(product => ({
          ...product,
          comments: undefined,
          category: product.category ? product.category.toLowerCase() : product.category
        })) : [];
        setProducts(cleanProducts);
      } else {
        console.log("Filtering products with params:", cleanParams);
        const res = await filterProducts(cleanParams);
        console.log("Filtered products response:", res.data);
        // Limpiar comments y normalizar categorías
        const cleanProducts = Array.isArray(res.data) ? res.data.map(product => ({
          ...product,
          comments: undefined,
          category: product.category ? product.category.toLowerCase() : product.category
        })) : [];
        setProducts(cleanProducts);
      }
    } catch (error) {
      console.error("Error al filtrar:", error);
      setProducts([]);
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

      <Routes>
        <Route path="/" element={
          <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
            <Sidebar 
              categories={Array.isArray(availableCategories) ? availableCategories : []} 
              sizes={Array.isArray(availableSizes) ? availableSizes : []} 
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
                    {Array.isArray(products) && products.map(p => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                   
                  {(!Array.isArray(products) || products.length === 0) && (
                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
                      <p className="text-slate-400 text-lg font-medium">
                        {Array.isArray(products) ? "No se encontraron productos." : "Error cargando productos."}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </main>
        } />

        <Route path="/products/:id" element={
          <main className="max-w-7xl mx-auto px-6 py-12">
            <ProductDetailsPage />
          </main>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;