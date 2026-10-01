import { Link } from "react-router-dom";
import Header from "../components/Header";

function About() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main className="pt-[68px]">
        <section className="px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold text-slate-500">
              About CampusPointer
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Simple tools for everyday student life.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              CampusPointer is a digital toolkit designed to make common
              student tasks easier. Instead of switching between different
              websites and spreadsheets, students can use simple tools for
              grades, attendance, money, and study planning in one place.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-lg font-semibold text-slate-950">
                  Calculate
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Work out GPA, CGPA, percentages, grades, attendance, and
                  other everyday student calculations.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-lg font-semibold text-slate-950">
                  Plan
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Organize your study sessions, budget, savings, allowance,
                  and academic goals.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-lg font-semibold text-slate-950">
                  Track
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Keep an eye on attendance, countdowns, and other useful
                  student planning information.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-lg font-semibold text-slate-950">
                  Study smarter
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Use tools such as the study planner and Pomodoro timer to
                  make study time more focused and manageable.
                </p>
              </div>
            </div>

            <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-semibold text-slate-950">
                Built around simplicity
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                CampusPointer focuses on clear interfaces, straightforward
                calculations, and practical student tools. The goal is to
                reduce unnecessary complexity so students can spend less time
                figuring out the tool and more time using the result.
              </p>

              <Link
                to="/"
                className="mt-6 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Explore student tools
              </Link>
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

export default About;