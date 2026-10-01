import { useState } from "react";

function BunkCalculator() {
  const [classesHeld, setClassesHeld] = useState("40");
  const [classesAttended, setClassesAttended] = useState("34");
  const [targetAttendance, setTargetAttendance] = useState("75");
  const [result, setResult] = useState(null);

  const calculateBunk = () => {
    const held = Number(classesHeld);
    const attended = Number(classesAttended);
    const target = Number(targetAttendance);

    if (
      !Number.isFinite(held) ||
      !Number.isFinite(attended) ||
      !Number.isFinite(target) ||
      held <= 0 ||
      attended < 0 ||
      attended > held ||
      target <= 0 ||
      target > 100
    ) {
      setResult({
        type: "error",
        message:
          "Enter valid values. Attendance target must be between 0 and 100%.",
      });
      return;
    }

    const currentAttendance = (attended / held) * 100;

    // If current attendance is already below target,
    // no additional classes can be missed safely.
    if (currentAttendance < target) {
      setResult({
        type: "below-target",
        currentAttendance,
        target,
      });
      return;
    }

    // Find the largest whole number of future classes
    // that can be missed while staying at or above target.
    const maxMisses = Math.floor(
      attended / (target / 100) - held,
    );

    const safeMisses = Math.max(0, maxMisses);

    setResult({
      type: "success",
      currentAttendance,
      target,
      safeMisses,
      held,
      attended,
    });
  };

  const resetCalculator = () => {
    setClassesHeld("40");
    setClassesAttended("34");
    setTargetAttendance("75");
    setResult(null);
  };

  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold text-slate-950">
          Calculate how many classes you can miss
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter your current attendance and your minimum target to find out
          how many upcoming classes you can safely miss.
        </p>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-3">
        {/* Classes Held */}
        <div>
          <label
            htmlFor="bunk-classes-held"
            className="block text-sm font-medium text-slate-700"
          >
            Classes held
          </label>

          <input
            id="bunk-classes-held"
            type="number"
            min="1"
            value={classesHeld}
            onChange={(event) => setClassesHeld(event.target.value)}
            className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            placeholder="e.g. 40"
          />
        </div>

        {/* Classes Attended */}
        <div>
          <label
            htmlFor="bunk-classes-attended"
            className="block text-sm font-medium text-slate-700"
          >
            Classes attended
          </label>

          <input
            id="bunk-classes-attended"
            type="number"
            min="0"
            value={classesAttended}
            onChange={(event) => setClassesAttended(event.target.value)}
            className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            placeholder="e.g. 34"
          />
        </div>

        {/* Target Attendance */}
        <div>
          <label
            htmlFor="bunk-target-attendance"
            className="block text-sm font-medium text-slate-700"
          >
            Minimum attendance
          </label>

          <div className="relative mt-2">
            <input
              id="bunk-target-attendance"
              type="number"
              min="1"
              max="100"
              step="0.1"
              value={targetAttendance}
              onChange={(event) =>
                setTargetAttendance(event.target.value)
              }
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              placeholder="e.g. 75"
            />

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              %
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={calculateBunk}
          className="h-12 rounded-xl bg-slate-950 px-6 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Calculate Bunk
        </button>

        <button
          type="button"
          onClick={resetCalculator}
          className="h-12 rounded-xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Reset
        </button>
      </div>

      {/* Error */}
      {result?.type === "error" && (
        <div
          role="alert"
          className="mt-7 rounded-2xl border border-red-200 bg-red-50 p-5"
        >
          <p className="text-sm font-medium text-red-800">
            {result.message}
          </p>
        </div>
      )}

      {/* Below Target */}
      {result?.type === "below-target" && (
        <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <p className="text-sm font-medium text-amber-800">
            Your current attendance is already below your target.
          </p>

          <div className="mt-3 flex flex-wrap items-end gap-3">
            <span className="text-4xl font-bold tracking-tight text-amber-950">
              {result.currentAttendance.toFixed(2)}%
            </span>

            <span className="pb-1 text-sm text-amber-700">
              current attendance
            </span>
          </div>

          <p className="mt-4 text-sm leading-6 text-amber-800">
            Your target is {result.target}%. You cannot safely miss another
            class based on these numbers. You need to attend upcoming
            classes to improve your attendance.
          </p>
        </div>
      )}

      {/* Successful Result */}
      {result?.type === "success" && (
        <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <p className="text-sm font-medium text-slate-500">
            Classes you can safely miss
          </p>

          <div className="mt-2 flex flex-wrap items-end gap-3">
            <span className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {result.safeMisses}
            </span>

            <span className="pb-1 text-sm text-slate-500">
              {result.safeMisses === 1 ? "class" : "classes"}
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Current attendance
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                {result.currentAttendance.toFixed(2)}%
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Minimum target
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                {result.target}%
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Classes attended
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                {result.attended} / {result.held}
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-600">
            This is the maximum number of additional classes you can miss
            while keeping your attendance at or above your selected target.
          </p>
        </div>
      )}
    </div>
  );
}

export default BunkCalculator;