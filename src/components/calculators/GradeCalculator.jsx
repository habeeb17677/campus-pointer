import { useState } from "react";
import { Plus, Trash2, RotateCcw } from "lucide-react";

const createAssessment = (id) => ({
  id,
  name: "",
  score: "",
  weight: 10,
});

function GradeCalculator() {
  const [assessments, setAssessments] = useState([
    createAssessment(1),
  ]);
  const [result, setResult] = useState(null);

  const addAssessment = () => {
    setAssessments((current) => [
      ...current,
      createAssessment(Date.now()),
    ]);

    setResult(null);
  };

  const removeAssessment = (id) => {
    setAssessments((current) =>
      current.filter((assessment) => assessment.id !== id),
    );

    setResult(null);
  };

  const updateAssessment = (id, field, value) => {
    setAssessments((current) =>
      current.map((assessment) =>
        assessment.id === id
          ? {
              ...assessment,
              [field]: value,
            }
          : assessment,
      ),
    );

    setResult(null);
  };

  const calculateGrade = () => {
    const validAssessments = assessments.filter(
      (assessment) =>
        assessment.score !== "" &&
        Number(assessment.score) >= 0 &&
        Number(assessment.score) <= 100 &&
        Number(assessment.weight) > 0,
    );

    if (validAssessments.length === 0) {
      setResult(null);
      return;
    }

    const totalWeight = validAssessments.reduce(
      (total, assessment) => total + Number(assessment.weight),
      0,
    );

    if (totalWeight <= 0) {
      setResult(null);
      return;
    }

    const weightedScore = validAssessments.reduce(
      (total, assessment) =>
        total +
        (Number(assessment.score) * Number(assessment.weight)) / 100,
      0,
    );

    const percentage =
      totalWeight === 100
        ? weightedScore
        : (weightedScore / totalWeight) * 100;

    let grade = "F";

    if (percentage >= 70) {
      grade = "A";
    } else if (percentage >= 60) {
      grade = "B";
    } else if (percentage >= 50) {
      grade = "C";
    } else if (percentage >= 45) {
      grade = "D";
    } else if (percentage >= 40) {
      grade = "E";
    }

    setResult({
      percentage,
      grade,
      totalWeight,
    });
  };

  const resetCalculator = () => {
    setAssessments([createAssessment(Date.now())]);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Assessment Inputs */}
      <div className="space-y-4">
        {assessments.map((assessment, index) => (
          <div
            key={assessment.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">
                Assessment {index + 1}
              </h3>

              {assessments.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAssessment(assessment.id)}
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
              {/* Assessment Name */}
              <div>
                <label
                  htmlFor={`assessment-name-${assessment.id}`}
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Assessment
                </label>

                <input
                  id={`assessment-name-${assessment.id}`}
                  type="text"
                  value={assessment.name}
                  onChange={(event) =>
                    updateAssessment(
                      assessment.id,
                      "name",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. Test"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              {/* Score */}
              <div>
                <label
                  htmlFor={`assessment-score-${assessment.id}`}
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Score (%)
                </label>

                <input
                  id={`assessment-score-${assessment.id}`}
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={assessment.score}
                  onChange={(event) =>
                    updateAssessment(
                      assessment.id,
                      "score",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. 75"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              {/* Weight */}
              <div>
                <label
                  htmlFor={`assessment-weight-${assessment.id}`}
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Weight (%)
                </label>

                <input
                  id={`assessment-weight-${assessment.id}`}
                  type="number"
                  min="0.1"
                  max="100"
                  step="0.1"
                  value={assessment.weight}
                  onChange={(event) =>
                    updateAssessment(
                      assessment.id,
                      "weight",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. 20"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
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
          onClick={addAssessment}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          <Plus size={17} />
          Add assessment
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
            onClick={calculateGrade}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Calculate Grade
          </button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white sm:p-7">
          <p className="text-sm font-medium text-slate-300">
            Your result
          </p>

          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-5xl font-bold tracking-tight">
                {result.percentage.toFixed(2)}%
              </div>

              <p className="mt-2 text-sm text-slate-400">
                Final grade
              </p>
            </div>

            <div className="text-5xl font-bold">
              {result.grade}
            </div>
          </div>

          {result.totalWeight !== 100 && (
            <div className="mt-5 rounded-xl bg-amber-400/10 p-4">
              <p className="text-sm leading-6 text-amber-200">
                Your assessment weights currently total{" "}
                <strong>{result.totalWeight.toFixed(1)}%</strong>.
                For a standard final grade, make the total weight
                100%.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Grading Scale */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="text-sm font-semibold text-slate-900">
          Percentage grading scale
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {[
            ["A", "70–100%"],
            ["B", "60–69%"],
            ["C", "50–59%"],
            ["D", "45–49%"],
            ["E", "40–44%"],
            ["F", "0–39%"],
          ].map(([grade, range]) => (
            <div
              key={grade}
              className="rounded-xl bg-white p-3 text-center"
            >
              <p className="font-semibold text-slate-900">
                {grade}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {range}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Formula */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="text-sm font-semibold text-slate-900">
          Grade formula
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Each assessment contributes to your final grade according to
          its percentage weight.
        </p>

        <div className="mt-4 rounded-xl bg-white p-4 text-center font-mono text-sm leading-7 text-slate-800">
          Final Grade = Σ(Score × Weight) ÷ 100
        </div>
      </div>

      {/* Example */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-slate-900">
          Example
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Suppose you score 80% on a test worth 20%, 70% on an
          assignment worth 30%, and 75% on an exam worth 50%.
          The calculator combines those scores according to their
          weights to determine your final percentage and grade.
        </p>
      </div>
    </div>
  );
}

export default GradeCalculator;