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
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Lazarus Shop</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          placeholder="Filtrar por categoría (ej: Pantalones)" 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={handleFilter}>Buscar</button>
        <button onClick={loadProducts}>Limpiar</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {products.map(p => (
          <div key={p.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <h3>{p.name}</h3>
            <p>Precio: ${p.price}</p>
            <small>Talla: {p.size} | Color: {p.color}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;