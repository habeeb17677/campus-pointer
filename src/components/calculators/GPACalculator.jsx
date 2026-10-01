import { useState } from "react";
import { Plus, Trash2, RotateCcw } from "lucide-react";

const gradeOptions = [
  { grade: "A", point: 5 },
  { grade: "B", point: 4 },
  { grade: "C", point: 3 },
  { grade: "D", point: 2 },
  { grade: "E", point: 1 },
  { grade: "F", point: 0 },
];

const createCourse = (id) => ({
  id,
  name: "",
  credits: 3,
  grade: "A",
});

function GPACalculator() {
  const [courses, setCourses] = useState([createCourse(1)]);
  const [result, setResult] = useState(null);

  const addCourse = () => {
    setCourses((currentCourses) => [
      ...currentCourses,
      createCourse(Date.now()),
    ]);
  };

  const removeCourse = (id) => {
    setCourses((currentCourses) =>
      currentCourses.filter((course) => course.id !== id),
    );

    setResult(null);
  };

  const updateCourse = (id, field, value) => {
    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === id
          ? {
              ...course,
              [field]: value,
            }
          : course,
      ),
    );

    setResult(null);
  };

  const calculateGPA = () => {
    const validCourses = courses.filter(
      (course) => Number(course.credits) > 0 && course.grade,
    );

    if (validCourses.length === 0) {
      setResult(null);
      return;
    }

    let totalCredits = 0;
    let totalPoints = 0;

    validCourses.forEach((course) => {
      const grade = gradeOptions.find(
        (item) => item.grade === course.grade,
      );

      const credits = Number(course.credits);

      totalCredits += credits;
      totalPoints += credits * grade.point;
    });

    const gpa = totalPoints / totalCredits;

    setResult({
      gpa,
      totalCredits,
      totalPoints,
    });
  };

  const resetCalculator = () => {
    setCourses([createCourse(Date.now())]);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Course Inputs */}
      <div className="space-y-4">
        {courses.map((course, index) => (
          <div
            key={course.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">
                Course {index + 1}
              </h3>

              {courses.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCourse(course.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} />
                  <span className="hidden sm:inline">Remove</span>
                </button>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {/* Course Name */}
              <div className="sm:col-span-1">
                <label
                  htmlFor={`course-name-${course.id}`}
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Course name
                </label>

                <input
                  id={`course-name-${course.id}`}
                  type="text"
                  value={course.name}
                  onChange={(event) =>
                    updateCourse(course.id, "name", event.target.value)
                  }
                  placeholder="e.g. Mathematics"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              {/* Credit Units */}
              <div>
                <label
                  htmlFor={`course-credits-${course.id}`}
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Credit units
                </label>

                <input
                  id={`course-credits-${course.id}`}
                  type="number"
                  min="1"
                  max="30"
                  step="1"
                  value={course.credits}
                  onChange={(event) =>
                    updateCourse(course.id, "credits", event.target.value)
                  }
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              {/* Grade */}
              <div>
                <label
                  htmlFor={`course-grade-${course.id}`}
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Grade
                </label>

                <select
                  id={`course-grade-${course.id}`}
                  value={course.grade}
                  onChange={(event) =>
                    updateCourse(course.id, "grade", event.target.value)
                  }
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                >
                  {gradeOptions.map((option) => (
                    <option key={option.grade} value={option.grade}>
                      {option.grade} — {option.point} points
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={addCourse}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          <Plus size={17} />
          Add course
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
            onClick={calculateGPA}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Calculate GPA
          </button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white sm:p-7">
          <p className="text-sm font-medium text-slate-300">
            Your GPA
          </p>

          <div className="mt-2 text-5xl font-bold tracking-tight">
            {result.gpa.toFixed(2)}
          </div>

          <p className="mt-2 text-sm text-slate-400">
            Based on {result.totalCredits} credit{" "}
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
                Grade points
              </p>

              <p className="mt-1 text-lg font-semibold">
                {result.totalPoints.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Grading Scale */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="text-sm font-semibold text-slate-900">
          5-point grading scale
        </h3>

        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {gradeOptions.map((option) => (
            <div
              key={option.grade}
              className="rounded-xl bg-white p-3 text-center"
            >
              <p className="font-semibold text-slate-900">
                {option.grade}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {option.point} pts
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GPACalculator;