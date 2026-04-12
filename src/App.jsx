import { useEffect, useState } from 'react';
import { getProducts, filterProducts } from './services/api';

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');

  const loadProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const handleFilter = async () => {
    const res = await filterProducts({ category });
    setProducts(res.data);
  };

  useEffect(() => { loadProducts(); }, []);

  return (
    // Fondo oscuro con degradado moderno
    <div className="min-h-screen bg-[#0a0f1e] text-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header con gradiente */}
        <header className="flex justify-between items-center mb-16 border-b border-slate-800 pb-8">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
            Lazarus Shop
          </h1>
          <div className="flex gap-4">
            <input 
              className="bg-[#111827] border border-slate-700 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-72 transition-all"
              placeholder="Buscar por categoría (ej: Pantalones)..." 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            {/* Botón de Buscar con feedback de hover */}
            <button 
              onClick={handleFilter}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200 active:scale-95 shadow-lg shadow-cyan-900/40"
            >
              Buscar
            </button>
            {/* Botón de Limpiar con feedback de hover */}
            <button 
              onClick={loadProducts}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-8 py-3 rounded-xl transition-colors duration-200 active:scale-95"
            >
              Limpiar
            </button>
          </div>
        </header>

        {/* Product Grid con Imágenes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map(p => (
            <div key={p.id} className="bg-[#111827] border border-slate-800 rounded-3xl p-6 transition-all duration-300 hover:border-cyan-500/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(34,211,238,0.1)] group overflow-hidden">
              
              {/* Contenedor de Imagen de producto */}
              <div className="aspect-square bg-slate-800 rounded-2xl mb-6 overflow-hidden flex items-center justify-center border border-slate-700">
                <img 
                  // Usamos una imagen de placeholder profesional, luego la cambiaremos por las tuyas
                  src={`https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600`}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Info del producto */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold group-hover:text-cyan-400 transition-colors">{p.name}</h3>
                  <span className="bg-cyan-500/10 text-cyan-400 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                    {p.category}
                  </span>
                </div>
                
                <p className="text-4xl font-extrabold text-fuchsia-400">${p.price}</p>
                
                <div className="flex gap-2 text-sm text-slate-400 border-t border-slate-800 pt-4">
                  <span className="bg-slate-800 px-4 py-1.5 rounded-lg flex-1 text-center">Talla: {p.size}</span>
                  <span className="bg-slate-800 px-4 py-1.5 rounded-lg flex-1 text-center">Color: {p.color}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;