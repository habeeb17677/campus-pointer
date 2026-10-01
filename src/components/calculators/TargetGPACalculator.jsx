import { useState } from "react";
import { RotateCcw } from "lucide-react";

function TargetGPACalculator() {
  const [currentGPA, setCurrentGPA] = useState("");
  const [completedCredits, setCompletedCredits] = useState("");
  const [targetGPA, setTargetGPA] = useState("");
  const [upcomingCredits, setUpcomingCredits] = useState("");
  const [result, setResult] = useState(null);

  const calculateTargetGPA = () => {
    const current = Number(currentGPA);
    const completed = Number(completedCredits);
    const target = Number(targetGPA);
    const upcoming = Number(upcomingCredits);

    if (
      current < 0 ||
      current > 5 ||
      completed <= 0 ||
      target < 0 ||
      target > 5 ||
      upcoming <= 0
    ) {
      setResult(null);
      return;
    }

    const currentPoints = current * completed;
    const requiredTotalPoints = target * (completed + upcoming);
    const requiredUpcomingPoints = requiredTotalPoints - currentPoints;
    const requiredGPA = requiredUpcomingPoints / upcoming;

    setResult({
      requiredGPA,
      currentPoints,
      requiredUpcomingPoints,
    });
  };

  const resetCalculator = () => {
    setCurrentGPA("");
    setCompletedCredits("");
    setTargetGPA("");
    setUpcomingCredits("");
    setResult(null);
  };

  const isImpossible = result && result.requiredGPA > 5;
  const isAlreadyAchieved = result && result.requiredGPA <= 0;

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Current GPA */}
        <div>
          <label
            htmlFor="current-gpa"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Current CGPA
          </label>

          <input
            id="current-gpa"
            type="number"
            min="0"
            max="5"
            step="0.01"
            value={currentGPA}
            onChange={(event) => {
              setCurrentGPA(event.target.value);
              setResult(null);
            }}
            placeholder="e.g. 3.80"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            Your current cumulative GPA on a 5-point scale.
          </p>
        </div>

        {/* Completed Credits */}
        <div>
          <label
            htmlFor="completed-credits"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Completed credit units
          </label>

          <input
            id="completed-credits"
            type="number"
            min="1"
            step="1"
            value={completedCredits}
            onChange={(event) => {
              setCompletedCredits(event.target.value);
              setResult(null);
            }}
            placeholder="e.g. 72"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            Total credit units already completed.
          </p>
        </div>

        {/* Target GPA */}
        <div>
          <label
            htmlFor="target-gpa"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Target CGPA
          </label>

          <input
            id="target-gpa"
            type="number"
            min="0"
            max="5"
            step="0.01"
            value={targetGPA}
            onChange={(event) => {
              setTargetGPA(event.target.value);
              setResult(null);
            }}
            placeholder="e.g. 4.20"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            The cumulative GPA you want to achieve.
          </p>
        </div>

        {/* Upcoming Credits */}
        <div>
          <label
            htmlFor="upcoming-credits"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Remaining credit units
          </label>

          <input
            id="upcoming-credits"
            type="number"
            min="1"
            step="1"
            value={upcomingCredits}
            onChange={(event) => {
              setUpcomingCredits(event.target.value);
              setResult(null);
            }}
            placeholder="e.g. 36"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            Credit units you still have left to complete.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={resetCalculator}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
        >
          <RotateCcw size={16} />
          Reset
        </button>

        <button
          type="button"
          onClick={calculateTargetGPA}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Calculate Target GPA
        </button>
      </div>

      {/* Result */}
      {result && (
        <div
          className={`rounded-2xl border p-6 sm:p-7 ${
            isImpossible
              ? "border-amber-200 bg-amber-50"
              : "border-slate-200 bg-slate-950 text-white"
          }`}
        >
          {isImpossible ? (
            <>
              <p className="text-sm font-semibold text-amber-800">
                Target may not be achievable
              </p>

              <p className="mt-2 text-sm leading-6 text-amber-700">
                You would need a GPA of{" "}
                <strong>{result.requiredGPA.toFixed(2)}</strong>{" "}
                across your remaining credit units. Since this is above the
                5.00 maximum, the target cannot be reached with the credits
                remaining.
              </p>
            </>
          ) : isAlreadyAchieved ? (
            <>
              <p className="text-sm font-medium text-slate-300">
                Target already achieved
              </p>

              <div className="mt-2 text-4xl font-bold tracking-tight">
                {Number(currentGPA).toFixed(2)}
              </div>

              <p className="mt-2 text-sm text-slate-400">
                Your current CGPA is already at or above your target.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-slate-300">
                Required GPA
              </p>

              <div className="mt-2 text-5xl font-bold tracking-tight">
                {result.requiredGPA.toFixed(2)}
              </div>

              <p className="mt-2 text-sm text-slate-400">
                You need approximately{" "}
                <strong className="text-slate-200">
                  {result.requiredGPA.toFixed(2)}
                </strong>{" "}
                GPA across your remaining credit units to reach your target.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-xs text-slate-400">
                    Current grade points
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {result.currentPoints.toFixed(2)}
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-xs text-slate-400">
                    Required upcoming points
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {result.requiredUpcomingPoints.toFixed(2)}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Formula */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="text-sm font-semibold text-slate-900">
          Target GPA formula
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          The calculator works out the average GPA you need in your remaining
          credit units to reach your desired cumulative GPA.
        </p>

        <div className="mt-4 rounded-xl bg-white p-4 text-center font-mono text-sm leading-7 text-slate-800">
          Required GPA ={" "}
          [Target × Total Credits − Current GPA × Completed Credits]
          ÷ Remaining Credits
        </div>
      </div>

      {/* Example */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-slate-900">
          Example
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          If your current CGPA is 3.80 after completing 72 credit units and
          you have 36 credit units remaining, enter your desired target to
          see the average GPA you need across those remaining credits.
        </p>
      </div>

      {/* Scale */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="text-sm font-semibold text-slate-900">
          5-point grading scale
        </h3>

        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {[
            ["A", "5.00"],
            ["B", "4.00"],
            ["C", "3.00"],
            ["D", "2.00"],
            ["E", "1.00"],
            ["F", "0.00"],
          ].map(([grade, point]) => (
            <div
              key={grade}
              className="rounded-xl bg-white p-3 text-center"
            >
              <p className="font-semibold text-slate-900">{grade}</p>

              <p className="mt-1 text-xs text-slate-500">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TargetGPACalculator;