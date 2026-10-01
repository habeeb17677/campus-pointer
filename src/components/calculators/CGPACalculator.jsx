import { useState } from "react";
import { Plus, Trash2, RotateCcw } from "lucide-react";

const createSemester = (id) => ({
  id,
  name: "",
  credits: 18,
  gpa: 5,
});

function CGPACalculator() {
  const [semesters, setSemesters] = useState([createSemester(1)]);
  const [result, setResult] = useState(null);

  const addSemester = () => {
    setSemesters((currentSemesters) => [
      ...currentSemesters,
      createSemester(Date.now()),
    ]);
  };

  const removeSemester = (id) => {
    setSemesters((currentSemesters) =>
      currentSemesters.filter((semester) => semester.id !== id),
    );

    setResult(null);
  };

  const updateSemester = (id, field, value) => {
    setSemesters((currentSemesters) =>
      currentSemesters.map((semester) =>
        semester.id === id
          ? {
              ...semester,
              [field]: value,
            }
          : semester,
      ),
    );

    setResult(null);
  };

  const calculateCGPA = () => {
    const validSemesters = semesters.filter(
      (semester) =>
        Number(semester.credits) > 0 &&
        Number(semester.gpa) >= 0 &&
        Number(semester.gpa) <= 5,
    );

    if (validSemesters.length === 0) {
      setResult(null);
      return;
    }

    let totalCredits = 0;
    let totalWeightedGPA = 0;

    validSemesters.forEach((semester) => {
      const credits = Number(semester.credits);
      const gpa = Number(semester.gpa);

      totalCredits += credits;
      totalWeightedGPA += gpa * credits;
    });

    const cgpa = totalWeightedGPA / totalCredits;

    setResult({
      cgpa,
      totalCredits,
      totalWeightedGPA,
    });
  };

  const resetCalculator = () => {
    setSemesters([createSemester(Date.now())]);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Semester Inputs */}
      <div className="space-y-4">
        {semesters.map((semester, index) => (
          <div
            key={semester.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">
                Semester {index + 1}
              </h3>

              {semesters.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSemester(semester.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} />

                  <span className="hidden sm:inline">
                    Remove
                  </span>
                </button>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {/* Semester Name */}
              <div>
                <label
                  htmlFor={`semester-name-${semester.id}`}
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Semester
                </label>

                <input
                  id={`semester-name-${semester.id}`}
                  type="text"
                  value={semester.name}
                  onChange={(event) =>
                    updateSemester(
                      semester.id,
                      "name",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. Year 1, Semester 1"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              {/* Credit Units */}
              <div>
                <label
                  htmlFor={`semester-credits-${semester.id}`}
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Credit units
                </label>

                <input
                  id={`semester-credits-${semester.id}`}
                  type="number"
                  min="1"
                  max="100"
                  step="1"
                  value={semester.credits}
                  onChange={(event) =>
                    updateSemester(
                      semester.id,
                      "credits",
                      event.target.value,
                    )
                  }
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              {/* GPA */}
              <div>
                <label
                  htmlFor={`semester-gpa-${semester.id}`}
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Semester GPA
                </label>

                <input
                  id={`semester-gpa-${semester.id}`}
                  type="number"
                  min="0"
                  max="5"
                  step="0.01"
                  value={semester.gpa}
                  onChange={(event) =>
                    updateSemester(
                      semester.id,
                      "gpa",
                      event.target.value,
                    )
                  }
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={addSemester}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          <Plus size={17} />
          Add semester
        </button>

        <div className="flex gap-3">
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
            onClick={calculateCGPA}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Calculate CGPA
          </button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white sm:p-7">
          <p className="text-sm font-medium text-slate-300">
            Your CGPA
          </p>

          <div className="mt-2 text-5xl font-bold tracking-tight">
            {result.cgpa.toFixed(2)}
          </div>

          <p className="mt-2 text-sm text-slate-400">
            Based on {result.totalCredits} total credit{" "}
            {result.totalCredits === 1 ? "unit" : "units"}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-xs text-slate-400">
                Total credits
              </p>

              <p className="mt-1 text-lg font-semibold">
                {result.totalCredits}
              </p>
            </div>

            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-xs text-slate-400">
                Weighted points
              </p>

              <p className="mt-1 text-lg font-semibold">
                {result.totalWeightedGPA.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Formula */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="text-sm font-semibold text-slate-900">
          CGPA formula
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          CGPA is calculated using the GPA and credit units from
          each semester.
        </p>

        <div className="mt-4 rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
          CGPA = Σ(GPA × Credit Units) ÷ Σ(Credit Units)
        </div>
      </div>

      {/* Grading Scale */}
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
              <p className="font-semibold text-slate-900">
                {grade}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CGPACalculator;