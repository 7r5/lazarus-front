import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import ProductDetails from './ProductDetails';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError('');

    getProductById(id)
      .then((res) => {
        if (!isMounted) return;
        if (!res.data) {
          setError('Producto no encontrado.');
          return;
        }
        setProduct({
          ...res.data,
          category: res.data.category ? res.data.category.toLowerCase() : res.data.category,
        });
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error('Error cargando el producto:', err);
        setError('No se pudo obtener el producto.');
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] py-24">
        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-600"></div>
        <p className="mt-5 text-slate-600 text-lg font-semibold">Cargando producto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-10 text-center">
        <p className="text-slate-500 text-lg font-medium mb-6">{error || 'Producto no encontrado.'}</p>
        <button
          onClick={handleBack}
          className="bg-slate-900 text-white px-5 py-3 rounded-2xl hover:bg-blue-600 transition-colors"
        >
          Volver al catálogo
        </button>
      </div>
    );
  }

  return <ProductDetails product={product} onBack={handleBack} />;
}
