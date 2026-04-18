export default function CommentsSection({ comments, loading }) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Comentarios del producto</h3>
          <p className="text-sm text-slate-500">Solo se muestran los comentarios de tipo <span className="font-semibold">Product</span>.</p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">Tipo: Product</span>
      </div>

      {loading ? (
        <div className="mt-8 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
          Cargando comentarios...
        </div>
      ) : comments.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
          No hay comentarios para este producto aún.
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {comments.map((comment) => (
            <article key={comment.id} className="rounded-3xl bg-slate-50 p-6 border border-slate-100 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{comment.author}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{comment.createdAt}</p>
                </div>
                <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-bold text-white">{comment.rating} ★</span>
              </div>
              <p className="mt-4 text-slate-600 leading-7">{comment.text}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
