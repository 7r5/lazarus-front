import { useEffect, useState } from 'react';
import { getProducts, filterProducts } from './services/api';

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  // Imágenes realistas por categoría (Placeholder profesional)
  const getProductImage = (cat) => {
    const images = {
      'Calzado': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600',
      'Accesorios': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600',
      'Ropa': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600',
      'default': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600'
    };
    return images[cat] || images['default'];
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    setLoading(true);
    try {
      const res = await filterProducts({ category });
      setProducts(res.data);
    } catch (error) {
      console.error("Error al filtrar:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tighter text-blue-600 uppercase">
            Lazarus<span className="text-slate-400">Shop</span>
          </h1>
          <div className="flex items-center gap-3">
            <input 
              className="bg-slate-100 border-none rounded-full px-6 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 w-64 transition-all"
              placeholder="¿Qué categoría buscas?" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button 
              onClick={handleFilter}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all active:scale-95 shadow-md shadow-blue-200"
            >
              Buscar
            </button>
            <button 
              onClick={() => { setCategory(''); loadProducts(); }}
              className="text-slate-500 hover:text-slate-800 text-sm font-medium px-4 py-2"
            >
              Limpiar
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(p => (
              <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 transition-all hover:shadow-xl hover:shadow-slate-200/50 group">
                <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                  <img 
                    src={getProductImage(p.category)}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-50 px-2 py-1 rounded">
                      {p.category}
                    </span>
                    <span className="text-xs font-medium text-slate-400 italic">ID: {p.id}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1 leading-tight">{p.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-black text-slate-900">${p.price}</span>
                  </div>
                  <div className="flex gap-2 mb-6">
                    <div className="bg-slate-50 border border-slate-100 px-3 py-1 rounded-md text-[11px] font-semibold text-slate-500">
                      TALLA {p.size}
                    </div>
                    <div className="bg-slate-50 border border-slate-100 px-3 py-1 rounded-md text-[11px] font-semibold text-slate-500 uppercase">
                      {p.color}
                    </div>
                  </div>
                  <button className="w-full bg-slate-900 hover:bg-black text-white text-xs font-bold py-3 rounded-lg transition-colors">
                    VER DETALLES
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {products.length === 0 && !loading && (
          <div className="text-center py-24">
            <p className="text-slate-400 text-lg font-medium">No encontramos productos en esa categoría.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;