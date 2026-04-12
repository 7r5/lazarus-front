export default function ProductCard({ product }) {
  // AJUSTE AQUÍ:
  // Definimos la fuente de la imagen dinámicamente.
  // Usamos product.image (o product.imageUrl si así se llama en tu JSON).
  // Incluimos un "fallback" (una imagen de respaldo) por si el producto no tiene imagen.
  const imageSrc = product.imageUrl || 'https://via.placeholder.com/400x300?text=Sin+Imagen';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-slate-100 flex flex-col h-full group">
      
      {/* Contenedor de la Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img 
          // VINCU_LAMOS LA URL AQUÍ:
          src={imageSrc} 
          alt={product.name}
          // object-cover asegura que la imagen llene el espacio sin deformarse
          // object-center centra la imagen si se recorta
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          // loading="lazy" mejora el rendimiento cargando la imagen solo cuando es visible
          loading="lazy"
        />
        {/* Badge de Categoría (Opcional, si quieres mostrarla) */}
        {product.category && (
          <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm border border-white/10">
            {product.category}
          </span>
        )}
      </div>

      {/* Información del Producto */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Nombre del Producto */}
        <h3 className="text-lg font-bold text-slate-800 leading-tight mb-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Talla */}
        <p className="text-slate-500 text-sm mb-4">
          Talla: <span className="font-semibold text-slate-700">{product.size}</span>
        </p>
        
        {/* Precio y Acción (Al final de la tarjeta) */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-50">
          <span className="text-2xl font-black text-blue-600">
            {/* Formateamos el precio con comas (ej. $1,200) */}
            ${product.price.toLocaleString('es-MX')}
          </span>
          <button className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-blue-600 transition-colors shadow-sm active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}