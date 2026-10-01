import { useState } from "react";

function AttendanceCalculator() {
  const [classesHeld, setClassesHeld] = useState("40");
  const [classesAttended, setClassesAttended] = useState("34");
  const [result, setResult] = useState(null);

  const calculateAttendance = () => {
    const held = Number(classesHeld);
    const attended = Number(classesAttended);

    if (
      !Number.isFinite(held) ||
      !Number.isFinite(attended) ||
      held <= 0 ||
      attended < 0 ||
      attended > held
    ) {
      setResult({
        type: "error",
        message:
          "Enter valid numbers. Classes attended cannot be greater than classes held.",
      });
      return;
    }

    const percentage = (attended / held) * 100;

    setResult({
      type: "success",
      percentage,
      attended,
      missed: held - attended,
      held,
    });
  };

  const resetCalculator = () => {
    setClassesHeld("40");
    setClassesAttended("34");
    setResult(null);
  };

  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold text-slate-950">
          Calculate your attendance
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter the number of classes held and the number of classes you
          attended.
        </p>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {/* Classes Held */}
        <div>
          <label
            htmlFor="classes-held"
            className="block text-sm font-medium text-slate-700"
          >
            Classes held
          </label>

          <input
            id="classes-held"
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
            htmlFor="classes-attended"
            className="block text-sm font-medium text-slate-700"
          >
            Classes attended
          </label>

          <input
            id="classes-attended"
            type="number"
            min="0"
            value={classesAttended}
            onChange={(event) => setClassesAttended(event.target.value)}
            className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            placeholder="e.g. 34"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={calculateAttendance}
          className="h-12 rounded-xl bg-slate-950 px-6 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Calculate Attendance
        </button>

        <button
          type="button"
          onClick={resetCalculator}
          className="h-12 rounded-xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Reset
        </button>
      </div>

      {/* Result */}
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

      {result?.type === "success" && (
        <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <p className="text-sm font-medium text-slate-500">
            Your attendance
          </p>

          <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-1">
            <span className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {result.percentage.toFixed(2)}%
            </span>

            <span className="pb-1 text-sm text-slate-500">
              attendance
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Classes held
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                {result.held}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Attended
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                {result.attended}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Missed
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-900">
                {result.missed}
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-600">
            Your attendance is calculated as the number of classes attended
            divided by the total number of classes held, multiplied by 100.
          </p>
        </div>
      )}
    </div>
  );
}

export default AttendanceCalculator;