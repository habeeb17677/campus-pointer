import { useState } from "react";

function AttendanceGoal() {
  const [classesHeld, setClassesHeld] = useState("40");
  const [classesAttended, setClassesAttended] = useState("30");
  const [targetAttendance, setTargetAttendance] = useState("75");
  const [result, setResult] = useState(null);

  const calculateGoal = () => {
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
          "Enter valid values. Your target attendance must be between 0% and 100%.",
      });
      return;
    }

    const currentAttendance = (attended / held) * 100;

    if (currentAttendance >= target) {
      setResult({
        type: "already-reached",
        currentAttendance,
        target,
      });
      return;
    }

    /*
      We need to find x:

      (attended + x) / (held + x) >= target / 100

      Therefore:

      x >= (target × held - 100 × attended) / (100 - target)
    */

    const requiredClasses =
      (target * held - 100 * attended) / (100 - target);

    const classesNeeded = Math.ceil(requiredClasses);

    const finalAttendance =
      ((attended + classesNeeded) /
        (held + classesNeeded)) *
      100;

    setResult({
      type: "success",
      currentAttendance,
      target,
      classesNeeded,
      finalAttendance,
      held,
      attended,
    });
  };

  const resetCalculator = () => {
    setClassesHeld("40");
    setClassesAttended("30");
    setTargetAttendance("75");
    setResult(null);
  };

  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold text-slate-950">
          Calculate classes needed to reach your goal
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter your current attendance and target percentage to find out
          how many consecutive classes you need to attend.
        </p>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-3">
        {/* Classes Held */}
        <div>
          <label
            htmlFor="goal-classes-held"
            className="block text-sm font-medium text-slate-700"
          >
            Classes held
          </label>

          <input
            id="goal-classes-held"
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
            htmlFor="goal-classes-attended"
            className="block text-sm font-medium text-slate-700"
          >
            Classes attended
          </label>

          <input
            id="goal-classes-attended"
            type="number"
            min="0"
            value={classesAttended}
            onChange={(event) =>
              setClassesAttended(event.target.value)
            }
            className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            placeholder="e.g. 30"
          />
        </div>

        {/* Target */}
        <div>
          <label
            htmlFor="goal-target-attendance"
            className="block text-sm font-medium text-slate-700"
          >
            Target attendance
          </label>

          <div className="relative mt-2">
            <input
              id="goal-target-attendance"
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
          onClick={calculateGoal}
          className="h-12 rounded-xl bg-slate-950 px-6 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Calculate Goal
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

      {/* Already Reached */}
      {result?.type === "already-reached" && (
        <div className="mt-7 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
          <p className="text-sm font-medium text-emerald-800">
            You have already reached your target attendance.
          </p>

          <div className="mt-3 flex flex-wrap items-end gap-3">
            <span className="text-4xl font-bold tracking-tight text-emerald-950 sm:text-5xl">
              {result.currentAttendance.toFixed(2)}%
            </span>

            <span className="pb-1 text-sm text-emerald-700">
              current attendance
            </span>
          </div>

          <p className="mt-4 text-sm leading-6 text-emerald-800">
            Your target is {result.target}%, so you do not need additional
            classes to reach this goal.
          </p>
        </div>
      )}

      {/* Result */}
      {result?.type === "success" && (
        <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <p className="text-sm font-medium text-slate-500">
            Classes you need to attend
          </p>

          <div className="mt-2 flex flex-wrap items-end gap-3">
            <span className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {result.classesNeeded}
            </span>

            <span className="pb-1 text-sm text-slate-500">
              {result.classesNeeded === 1 ? "class" : "consecutive classes"}
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Current
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                {result.currentAttendance.toFixed(2)}%
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Target
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                {result.target}%
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                After attending
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                {result.finalAttendance.toFixed(2)}%
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-600">
            This assumes you attend every class until you reach your target
            and do not miss any additional classes during that period.
          </p>
        </div>
      )}
    </div>
  );
}

export default AttendanceGoal;