import { Search, Calculator, CalendarCheck, BookOpen } from "lucide-react";
import { useMemo, useState } from "react";
import Header from "./components/Header";
import CategorySection from "./components/CategorySection";
import { toolCategories } from "./data/tools";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const allTools = useMemo(() => {
    return toolCategories.flatMap((category) =>
      category.tools.map((tool) => ({
        ...tool,
        category: category.name,
      })),
    );
  }, []);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return allTools.filter((tool) => {
      const searchableText = [
        tool.name,
        tool.description,
        tool.category,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [allTools, searchQuery]);

  const handleSuggestionClick = (value) => {
    setSearchQuery(value);
    document.getElementById("tool-search")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main className="pt-[68px]">
        {/* Hero */}
        <section className="px-5 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mx-auto max-w-3xl">
              <p className="mb-4 text-sm font-semibold text-slate-500">
                Your student toolkit
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Everything students need, in one place.
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Calculate, plan, track, and study smarter with simple tools
                built for students.
              </p>
            </div>

            {/* Hero Search */}
            <div
              id="tool-search"
              className="relative mx-auto mt-9 max-w-2xl scroll-mt-24"
            >
              <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm transition focus-within:border-slate-300 focus-within:shadow-md">
                <Search
                  size={21}
                  strokeWidth={2}
                  className="shrink-0 text-slate-400"
                />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="What do you need help with?"
                  aria-label="Search student tools"
                  className="ml-3 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="ml-2 shrink-0 rounded-lg px-2 py-1 text-xs font-medium text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    Clear
                  </button>
                )}

                <span className="ml-3 hidden shrink-0 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-400 sm:block">
                  Search
                </span>
              </div>

              {/* Search Results */}
              {searchQuery.trim() && (
                <div className="absolute left-0 right-0 top-full z-20 mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-xl">
                  {searchResults.length > 0 ? (
                    <div className="max-h-96 overflow-y-auto p-2">
                      {searchResults.map((tool) => (
                        <a
                          key={tool.path}
                          href={tool.path}
                          className="flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-slate-50"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                            <Search
                              size={17}
                              strokeWidth={2}
                              className="text-slate-600"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900">
                              {tool.name}
                            </p>

                            <p className="mt-0.5 truncate text-xs text-slate-500">
                              {tool.description}
                            </p>
                          </div>

                          <span className="ml-auto shrink-0 text-xs font-medium text-slate-400">
                            {tool.category}
                          </span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="px-5 py-6 text-center">
                      <p className="text-sm font-medium text-slate-900">
                        No tools found
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Try searching for GPA, attendance, budget, or study.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Search Suggestions */}
              {!searchQuery.trim() && (
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500">
                  <span>Try:</span>

                  {[
                    "GPA",
                    "Attendance",
                    "Budget",
                    "Pomodoro",
                    "Exam Countdown",
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleSuggestionClick(item)}
                      className="rounded-full bg-slate-50 px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Student Tools */}
        <section
          id="student-tools"
          className="scroll-mt-24 border-t border-slate-100 px-5 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-10">
              <p className="text-sm font-semibold text-slate-500">
                Student Tools
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Tools built for student life.
              </h2>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                Simple calculators and planning tools to help you stay on top
                of grades, attendance, money, and study time.
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {toolCategories.map((category) => (
                <CategorySection
                  key={category.id}
                  category={category}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why CampusPointer */}
        <section className="border-t border-slate-100 bg-slate-50/60 px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold text-slate-500">
                Why CampusPointer?
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Simple tools. Less stress.
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600">
                Everything is designed to help students make everyday
                academic and personal planning easier.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {/* Benefit 1 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                  <Calculator
                    size={21}
                    strokeWidth={2}
                    className="text-slate-700"
                  />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-950">
                  Quick and practical
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Get useful answers without complicated spreadsheets or
                  unnecessary steps.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                  <CalendarCheck
                    size={21}
                    strokeWidth={2}
                    className="text-slate-700"
                  />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-950">
                  Built for student life
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  From grades and attendance to budgeting and study planning,
                  the tools focus on real student needs.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                  <BookOpen
                    size={21}
                    strokeWidth={2}
                    className="text-slate-700"
                  />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-950">
                  Easy to understand
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Clear explanations and straightforward results make each
                  tool easy to use.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-5 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <a
              href="/"
              className="text-lg font-bold tracking-tight text-slate-950"
            >
              CampusPointer
            </a>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Simple digital tools to help students calculate, plan, track,
              and study smarter.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600"
          >
            <a
              href="/about"
              className="transition hover:text-slate-950"
            >
              About
            </a>

            <a
              href="/contact"
              className="transition hover:text-slate-950"
            >
              Contact
            </a>

            <a
              href="/privacy"
              className="transition hover:text-slate-950"
            >
              Privacy
            </a>

            <a
              href="/terms"
              className="transition hover:text-slate-950"
            >
              Terms
            </a>
          </nav>
        </div>

        <div className="mx-auto mt-8 max-w-6xl border-t border-slate-100 pt-6">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} CampusPointer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;