import { useMemo, useState } from "react";

function StudyPlanner() {
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: "",
      hours: "",
    },
  ]);

  const [days, setDays] = useState("7");

  const addSubject = () => {
    setSubjects((current) => [
      ...current,
      {
        id: Date.now(),
        name: "",
        hours: "",
      },
    ]);
  };

  const removeSubject = (id) => {
    setSubjects((current) => {
      if (current.length === 1) {
        return current;
      }

      return current.filter((subject) => subject.id !== id);
    });
  };

  const updateSubject = (id, field, value) => {
    setSubjects((current) =>
      current.map((subject) =>
        subject.id === id
          ? {
              ...subject,
              [field]: value,
            }
          : subject,
      ),
    );
  };

  const plan = useMemo(() => {
    const validSubjects = subjects.filter(
      (subject) =>
        subject.name.trim() !== "" &&
        Number(subject.hours) > 0,
    );

    const totalHours = validSubjects.reduce(
      (total, subject) => total + Number(subject.hours),
      0,
    );

    const numberOfDays = Number(days);

    const dailyHours =
      numberOfDays > 0 ? totalHours / numberOfDays : 0;

    return {
      validSubjects,
      totalHours,
      dailyHours,
      numberOfDays,
    };
  }, [subjects, days]);

  const hasPlan = plan.validSubjects.length > 0 && plan.totalHours > 0;

  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold text-slate-950">
          Build your study plan
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Add your subjects and the number of hours you want to
          study for each one.
        </p>
      </div>

      {/* Number of days */}
      <div className="mt-7">
        <label
          htmlFor="study-days"
          className="block text-sm font-medium text-slate-700"
        >
          Study period
        </label>

        <div className="mt-2 flex items-center gap-3">
          <input
            id="study-days"
            type="number"
            min="1"
            step="1"
            value={days}
            onChange={(event) => setDays(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />

          <span className="shrink-0 text-sm text-slate-500">
            days
          </span>
        </div>
      </div>

      {/* Subjects */}
      <div className="mt-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-slate-950">
              Subjects
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Set the total study hours for each subject.
            </p>
          </div>

          <button
            type="button"
            onClick={addSubject}
            className="shrink-0 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            + Add subject
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {subjects.map((subject, index) => (
            <div
              key={subject.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
            >
              <div className="grid gap-3 sm:grid-cols-[1fr_150px_auto] sm:items-end">
                <div>
                  <label
                    htmlFor={`subject-name-${subject.id}`}
                    className="block text-xs font-medium text-slate-500"
                  >
                    Subject {index + 1}
                  </label>

                  <input
                    id={`subject-name-${subject.id}`}
                    type="text"
                    value={subject.name}
                    onChange={(event) =>
                      updateSubject(
                        subject.id,
                        "name",
                        event.target.value,
                      )
                    }
                    placeholder="e.g. Mathematics"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`subject-hours-${subject.id}`}
                    className="block text-xs font-medium text-slate-500"
                  >
                    Study hours
                  </label>

                  <input
                    id={`subject-hours-${subject.id}`}
                    type="number"
                    min="0"
                    step="0.5"
                    value={subject.hours}
                    onChange={(event) =>
                      updateSubject(
                        subject.id,
                        "hours",
                        event.target.value,
                      )
                    }
                    placeholder="e.g. 6"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeSubject(subject.id)}
                  disabled={subjects.length === 1}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-white hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Result */}
      {hasPlan && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white sm:p-6">
          <p className="text-sm font-medium text-slate-300">
            Your study plan
          </p>

          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-slate-400">
                Total study time
              </p>

              <p className="mt-1 text-2xl font-bold">
                {plan.totalHours.toFixed(1)} hrs
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Study period
              </p>

              <p className="mt-1 text-2xl font-bold">
                {plan.numberOfDays} days
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Daily study time
              </p>

              <p className="mt-1 text-2xl font-bold">
                {plan.dailyHours.toFixed(1)} hrs
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-800 pt-5">
            <p className="text-sm font-medium text-slate-200">
              Suggested daily allocation
            </p>

            <div className="mt-3 space-y-3">
              {plan.validSubjects.map((subject) => {
                const dailyHours =
                  Number(subject.hours) / plan.numberOfDays;

                return (
                  <div
                    key={subject.id}
                    className="flex items-center justify-between gap-4 rounded-xl bg-slate-900 px-4 py-3"
                  >
                    <span className="text-sm text-slate-200">
                      {subject.name}
                    </span>

                    <span className="shrink-0 text-sm font-semibold text-white">
                      {dailyHours.toFixed(1)} hrs/day
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {!hasPlan && (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="text-sm text-slate-500">
            Add at least one subject and its study hours to see
            your study plan.
          </p>
        </div>
      )}
    </div>
  );
}

export default StudyPlanner;