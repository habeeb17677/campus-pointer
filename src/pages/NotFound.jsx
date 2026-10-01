import { Link } from "react-router-dom";
import { ArrowLeft, SearchX } from "lucide-react";
import Header from "../components/Header";
import SEO from "../components/SEO";

function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found — CampusPointer"
        description="The CampusPointer page you are looking for could not be found."
        path="/404"
      />

      <Header />

      <main className="flex min-h-screen items-center justify-center px-4 pb-20 pt-28">
        <div className="w-full max-w-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <SearchX size={30} className="text-slate-600" />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Error 404
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Page not found
          </h1>

          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-500">
            Sorry, we couldn't find the page you're looking for. It may have
            been moved or the address may be incorrect.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <ArrowLeft size={17} />
              Back to CampusPointer
            </Link>

            <Link
              to="/calculators"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Browse calculators
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default NotFound;