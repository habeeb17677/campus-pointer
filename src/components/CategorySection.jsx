function CategorySection({ category }) {
  const Icon = category.icon;

  return (
    <section>
      <div className="mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
            <Icon size={20} strokeWidth={2} className="text-slate-700" />
          </div>

          <h2 className="text-xl font-semibold text-slate-950">
            {category.name}
          </h2>
        </div>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          {category.description}
        </p>
      </div>

      <div className="space-y-3">
        {category.tools.map((tool) => (
          <a
            key={tool.path}
            href={tool.path}
            className="group block rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-medium text-slate-900">
                  {tool.name}
                </h3>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  {tool.description}
                </p>
              </div>

              <span className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500">
                →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;