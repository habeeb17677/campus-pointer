import { Link } from "react-router-dom";
import Header from "../components/Header";
import { toolCategories } from "../data/tools";

function StudentLife() {
  const attendance = toolCategories.find(
    (category) => category.id === "attendance",
  );

  const money = toolCategories.find(
    (category) => category.id === "money",
  );

  const categories = [attendance, money];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main className="pt-[68px]">
        <section className="px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-slate-500">
                Student Life
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Make student life easier.
              </h1>

              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                Keep track of attendance and make smarter decisions about
                your student spending, allowance, and savings.
              </p>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <section key={category.id}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                        <Icon
                          size={21}
                          strokeWidth={2}
                          className="text-slate-700"
                        />
                      </div>

                      <div>
                        <h2 className="text-2xl font-semibold text-slate-950">
                          {category.name}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {category.tools.map((tool) => (
                        <Link
                          key={tool.path}
                          to={tool.path}
                          className="group block rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-slate-950">
                                {tool.name}
                              </h3>

                              <p className="mt-1 text-sm leading-6 text-slate-500">
                                {tool.description}
                              </p>
                            </div>

                            <span className="shrink-0 text-lg text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-600">
                              →
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-5 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link
                to="/"
                className="text-lg font-bold tracking-tight text-slate-950"
              >
                CampusPointer
              </Link>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Simple digital tools to help students calculate, plan, track,
                and study smarter.
              </p>
            </div>

            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600"
            >
              <Link to="/about" className="transition hover:text-slate-950">
                About
              </Link>

              <Link to="/contact" className="transition hover:text-slate-950">
                Contact
              </Link>

              <Link to="/privacy" className="transition hover:text-slate-950">
                Privacy
              </Link>

              <Link to="/terms" className="transition hover:text-slate-950">
                Terms
              </Link>
            </nav>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} CampusPointer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default StudentLife;