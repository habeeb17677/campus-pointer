import { Link } from "react-router-dom";
import Header from "../components/Header";

const resources = [
  {
    title: "Understanding GPA",
    description:
      "Learn what GPA means, how it is calculated, and how to use your GPA when planning your academic goals.",
    path: "/gpa-calculator",
    label: "Grades",
  },
  {
    title: "Understanding CGPA",
    description:
      "Learn how cumulative GPA works and how your semester results contribute to your overall academic performance.",
    path: "/cgpa-calculator",
    label: "Grades",
  },
  {
    title: "Managing Attendance",
    description:
      "Understand your attendance percentage and plan ahead when you need to know how many classes you can miss.",
    path: "/attendance-calculator",
    label: "Attendance",
  },
  {
    title: "Planning Your Budget",
    description:
      "Use a simple budgeting approach to understand your income, regular expenses, savings, and available spending money.",
    path: "/student-budget",
    label: "Money",
  },
  {
    title: "Better Study Sessions",
    description:
      "Use focused study sessions and structured breaks to make your revision time more manageable.",
    path: "/pomodoro-timer",
    label: "Study",
  },
  {
    title: "Preparing for Exams",
    description:
      "Keep track of the time remaining before an exam and use it to organize your revision priorities.",
    path: "/exam-countdown",
    label: "Study",
  },
];

function Resources() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main className="pt-[68px]">
        <section className="px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-slate-500">
                Resources
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Helpful student resources.
              </h1>

              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                Explore simple explanations and practical tools for grades,
                attendance, money management, and studying.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource) => (
                <Link
                  key={resource.title}
                  to={resource.path}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                >
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {resource.label}
                  </span>

                  <h2 className="mt-5 text-lg font-semibold text-slate-950">
                    {resource.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {resource.description}
                  </p>

                  <div className="mt-5 text-sm font-medium text-slate-700">
                    Explore tool
                    <span className="ml-2 inline-block transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              ))}
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

export default Resources;