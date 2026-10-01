import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm, ValidationError } from "@formspree/react";
import Header from "../components/Header";

function Contact() {
  const [state, handleSubmit] = useForm("xgaoebzq");

  useEffect(() => {
    if (state.succeeded) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [state.succeeded]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main className="pt-[68px]">
        <section className="px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold text-slate-500">
              Contact
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Get in touch.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Have feedback, found a problem, or have an idea for a useful
              student tool? We would like to hear from you.
            </p>

            {state.succeeded ? (
              <div
                role="status"
                className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-xl text-white">
                  ✓
                </div>

                <h2 className="mt-5 text-2xl font-semibold text-slate-950">
                  Message sent successfully
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Thank you for contacting CampusPointer. Your message has
                  been submitted successfully.
                </p>

                <Link
                  to="/"
                  className="mt-6 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Back to CampusPointer
                </Link>
              </div>
            ) : (
              <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-slate-950">
                  Send us a message
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Fill out the form below and your message will be sent to the
                  CampusPointer contact email.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-7 space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Name
                    </label>

                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                    />

                    <ValidationError
                      prefix="Name"
                      field="name"
                      errors={state.errors}
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Email
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                    />

                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Subject
                    </label>

                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      required
                      placeholder="What is your message about?"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                    />

                    <ValidationError
                      prefix="Subject"
                      field="subject"
                      errors={state.errors}
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Message
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows="6"
                      placeholder="How can we help?"
                      className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                    />

                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>

                  {/* General errors */}
                  <ValidationError
                    errors={state.errors}
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                  />

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {state.submitting ? "Sending..." : "Send message"}
                  </button>
                </form>
              </div>
            )}
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
              <Link
                to="/about"
                className="transition hover:text-slate-950"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="transition hover:text-slate-950"
              >
                Contact
              </Link>

              <Link
                to="/privacy"
                className="transition hover:text-slate-950"
              >
                Privacy
              </Link>

              <Link
                to="/terms"
                className="transition hover:text-slate-950"
              >
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

export default Contact;