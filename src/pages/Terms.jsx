import { Link } from "react-router-dom";
import Header from "../components/Header";

function Terms() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main className="pt-[68px]">
        <section className="px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <article className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold text-slate-500">
              Terms
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Terms of Use
            </h1>

            <p className="mt-5 text-sm text-slate-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="mt-10 space-y-10">
              <section>
                <h2 className="text-xl font-semibold text-slate-950">
                  1. Using CampusPointer
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  CampusPointer provides general-purpose student calculators
                  and planning tools. By using the site, you agree to use the
                  tools responsibly and for their intended purposes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">
                  2. Calculator results
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Calculator results are provided as practical estimates or
                  calculations based on the information entered by the user.
                  You should verify important academic, financial, or
                  administrative decisions with the relevant official source.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">
                  3. No guarantee
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  CampusPointer is provided as a student productivity toolkit.
                  While the tools are designed to be useful and accurate, no
                  guarantee is made that every result will match a particular
                  institution's policies, grading system, or calculation
                  method.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">
                  4. External requirements
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Universities, schools, employers, and other organizations
                  may use their own rules and calculation systems. When an
                  official result is required, consult the appropriate
                  institution.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-950">
                  5. Changes
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  These terms may be updated as CampusPointer develops.
                  Continued use of the site after changes means you accept the
                  updated terms.
                </p>
              </section>
            </div>

            <div className="mt-12">
              <Link
                to="/"
                className="inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Back to CampusPointer
              </Link>
            </div>
          </article>
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

            <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
              <Link to="/about" className="hover:text-slate-950">
                About
              </Link>

              <Link to="/contact" className="hover:text-slate-950">
                Contact
              </Link>

              <Link to="/privacy" className="hover:text-slate-950">
                Privacy
              </Link>

              <Link to="/terms" className="hover:text-slate-950">
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

export default Terms;