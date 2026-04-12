const getProductImage = (cat) => {
  const images = {
    'Calzado': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600',
    'Accesorios': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600',
    'Ropa': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600',
    'default': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600'
  };
  return images[cat] || images['default'];
};

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 transition-all hover:shadow-xl hover:shadow-slate-200/50 group">
      <div className="aspect-[4/5] overflow-hidden bg-slate-100">
        <img 
          src={getProductImage(product.category)}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-50 px-2 py-1 rounded">
            {product.category}
          </span>
          <span className="text-xs font-medium text-slate-400 italic">ID: {product.id}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1 leading-tight">{product.name}</h3>
        <p className="text-2xl font-black text-slate-900 mb-4">${product.price}</p>
        <div className="flex gap-2 mb-6">
          <div className="bg-slate-50 border border-slate-100 px-3 py-1 rounded-md text-[11px] font-semibold text-slate-500">
            TALLA {product.size}
          </div>
          <div className="bg-slate-50 border border-slate-100 px-3 py-1 rounded-md text-[11px] font-semibold text-slate-500 uppercase">
            {product.color}
          </div>
        </div>
        <button className="w-full bg-slate-900 hover:bg-black text-white text-xs font-bold py-3 rounded-lg transition-colors">
          VER DETALLES
        </button>
      </div>
    </div>
  );
}
