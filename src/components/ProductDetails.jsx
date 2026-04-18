import { useEffect, useState } from 'react';
import { getProductComments } from '../services/api';
import CommentsSection from './CommentsSection';

export default function ProductDetails({ product, onBack }) {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoadingComments(true);

    getProductComments(product.id)
      .then((res) => {
        if (!isMounted) return;
        setComments(res.data);
      })
      .catch(() => {
        if (!isMounted) return;
        setComments([]);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoadingComments(false);
      });

    return () => {
      isMounted = false;
    };
  }, [product.id]);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="space-y-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500 hover:text-blue-600 transition-colors"
        >
          ← Volver
        </button>

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
          <div className="relative aspect-[4/3] bg-slate-100">
            <img
              src={product.image || product.imageUrl || 'https://via.placeholder.com/900x675?text=Sin+Imagen'}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="p-8 space-y-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{product.name}</h2>
                <p className="text-sm uppercase tracking-[0.22em] text-slate-400 mt-2">{product.category || 'Categoría desconocida'}</p>
              </div>
              <span className="text-3xl font-extrabold text-blue-600">${product.price?.toLocaleString('es-MX')}</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5 border border-slate-100">
                <p className="text-xs font-semibold uppercase text-slate-400 tracking-[0.2em]">Talla</p>
                <p className="mt-3 text-lg font-bold text-slate-900">{product.size || 'N/A'}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5 border border-slate-100">
                <p className="text-xs font-semibold uppercase text-slate-400 tracking-[0.2em]">Disponibilidad</p>
                <p className="mt-3 text-lg font-bold text-slate-900">{product.stock ?? 'Disponible'}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900">Descripción del producto</h3>
              <p className="text-slate-600 leading-7">
                {product.description || 'Este producto no cuenta con una descripción adicional, pero puedes revisar sus características principales en la ficha.'}
              </p>
            </div>
          </div>
        </div>

        <CommentsSection comments={comments} loading={loadingComments} />
      </section>

      <aside className="space-y-6">
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">Detalles rápidos</h3>
          <dl className="mt-6 grid gap-4 text-sm text-slate-600">
            <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-50 p-4">
              <span className="font-semibold text-slate-900">Nombre</span>
              <span>{product.name}</span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-50 p-4">
              <span className="font-semibold text-slate-900">Categoría</span>
              <span>{product.category || 'Sin categoría'}</span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-50 p-4">
              <span className="font-semibold text-slate-900">Talla</span>
              <span>{product.size || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-50 p-4">
              <span className="font-semibold text-slate-900">Precio</span>
              <span>${product.price?.toLocaleString('es-MX')}</span>
            </div>
          </dl>
        </div>
      </aside>
    </div>
  );
}
