import { ArrowLeft, Calculator } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";

import GPACalculator from "../components/calculators/GPACalculator";
import CGPACalculator from "../components/calculators/CGPACalculator";
import TargetGPACalculator from "../components/calculators/TargetGPACalculator";
import GradeCalculator from "../components/calculators/GradeCalculator";
import PercentageCalculator from "../components/calculators/PercentageCalculator";

import AttendanceCalculator from "../components/calculators/AttendanceCalculator";
import BunkCalculator from "../components/calculators/BunkCalculator";
import AttendanceGoal from "../components/calculators/AttendanceGoal";

import StudentBudget from "../components/calculators/StudentBudget";
import AllowanceCalculator from "../components/calculators/AllowanceCalculator";
import SavingsCalculator from "../components/calculators/SavingsCalculator";

import StudyPlanner from "../components/calculators/StudyPlanner";
import PomodoroTimer from "../components/calculators/PomodoroTimer";
import ExamCountdown from "../components/calculators/ExamCountdown";

import { toolCategories } from "../data/tools";

function ToolPage() {
  const { toolSlug } = useParams();

  /*
   * Create one list containing every tool from every category.
   */
  const allTools = toolCategories.flatMap((category) =>
    category.tools.map((tool) => ({
      ...tool,
      category: category.name,
    })),
  );

  /*
   * Find the tool that matches the current URL.
   */
  const tool = allTools.find(
    (item) => item.path.replace("/", "") === toolSlug,
  );

  /*
   * Tool not found
   */
  if (!tool) {
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <Header />

        <main className="flex min-h-screen items-center justify-center px-5 pt-[68px]">
          <div className="max-w-md text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Tool not found
            </h1>

            <p className="mt-3 text-base leading-7 text-slate-600">
              We couldn't find the student tool you're looking for.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              <ArrowLeft size={17} />
              Back to CampusPointer
            </Link>
          </div>
        </main>
      </div>
    );
  }

  /*
   * Identify the current calculator.
   */
  const isGPA =
    toolSlug === "gpa-calculator";

  const isCGPA =
    toolSlug === "cgpa-calculator";

  const isTargetGPA =
    toolSlug === "target-gpa-calculator";

  const isGradeCalculator =
    toolSlug === "grade-calculator";

  const isPercentageCalculator =
    toolSlug === "percentage-calculator";

  const isAttendanceCalculator =
    toolSlug === "attendance-calculator";

  const isBunkCalculator =
    toolSlug === "bunk-calculator";

  const isAttendanceGoal =
    toolSlug === "attendance-goal";

  const isStudentBudget =
    toolSlug === "student-budget";

  const isAllowanceCalculator =
    toolSlug === "allowance-calculator";

  const isSavingsCalculator =
    toolSlug === "savings-calculator";

  const isStudyPlanner =
    toolSlug === "study-planner";

  const isPomodoroTimer =
    toolSlug === "pomodoro-timer";

  const isExamCountdown =
    toolSlug === "exam-countdown";

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main className="pt-[68px]">

        {/* =====================================================
            TOOL HEADER
        ===================================================== */}
        <section className="px-5 pb-10 pt-12 sm:px-6 sm:pb-12 sm:pt-16 lg:px-8">
          <div className="mx-auto max-w-4xl">

            {/* Back to all tools */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
            >
              <ArrowLeft size={16} />
              All student tools
            </Link>

            {/* Category */}
            <p className="mt-8 text-sm font-semibold text-slate-500">
              {tool.category}
            </p>

            {/* Title and description */}
            <div className="mt-3 flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100">
                <Calculator
                  size={22}
                  strokeWidth={2}
                  className="text-slate-700"
                />
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  {tool.name}
                </h1>

                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                  {tool.description}
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* =====================================================
            CALCULATOR
        ===================================================== */}
        <section className="border-y border-slate-100 bg-slate-50/60 px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-4xl">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">

              {isGPA ? (
                <GPACalculator />

              ) : isCGPA ? (
                <CGPACalculator />

              ) : isTargetGPA ? (
                <TargetGPACalculator />

              ) : isGradeCalculator ? (
                <GradeCalculator />

              ) : isPercentageCalculator ? (
                <PercentageCalculator />

              ) : isAttendanceCalculator ? (
                <AttendanceCalculator />

              ) : isBunkCalculator ? (
                <BunkCalculator />

              ) : isAttendanceGoal ? (
                <AttendanceGoal />

              ) : isStudentBudget ? (
                <StudentBudget />

              ) : isAllowanceCalculator ? (
                <AllowanceCalculator />

              ) : isSavingsCalculator ? (
                <SavingsCalculator />

              ) : isStudyPlanner ? (
                <StudyPlanner />

              ) : isPomodoroTimer ? (
                <PomodoroTimer />

              ) : isExamCountdown ? (
                <ExamCountdown />

              ) : (
                <div>

                  <h2 className="text-xl font-semibold text-slate-950">
                    {tool.name}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    The interactive calculator for this tool will be
                    added next.
                  </p>

                  <div className="mt-8 rounded-xl border border-dashed border-slate-300 p-8 text-center">
                    <p className="text-sm text-slate-500">
                      Calculator coming next.
                    </p>
                  </div>

                </div>
              )}

            </div>
          </div>
        </section>


        {/* =====================================================
            EDUCATIONAL CONTENT
        ===================================================== */}
        <section className="px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-4xl">

            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              About {tool.name}
            </h2>

            <div className="mt-5 space-y-4 text-base leading-7 text-slate-600">

              <p>
                {tool.name} is designed to make common student
                calculations easier to understand and faster to
                complete.
              </p>

              <p>
                Enter the information above and use the result to
                better understand your academic progress and make
                informed student-life decisions.
              </p>

            </div>


            {/* =================================================
                GPA FORMULA
            ================================================= */}
            {isGPA && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">

                <h3 className="text-lg font-semibold text-slate-950">
                  GPA formula
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  GPA is calculated by dividing the total grade points
                  earned by the total number of credit units.
                </p>

                <div className="mt-4 rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
                  GPA = Total Grade Points ÷ Total Credit Units
                </div>

              </div>
            )}


            {/* =================================================
                CGPA FORMULA
            ================================================= */}
            {isCGPA && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">

                <h3 className="text-lg font-semibold text-slate-950">
                  CGPA formula
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  CGPA is the weighted average of your semester GPAs,
                  based on the credit units taken in each semester.
                </p>

                <div className="mt-4 rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
                  CGPA = Σ(GPA × Credit Units) ÷ Σ(Credit Units)
                </div>

              </div>
            )}


            {/* =================================================
                TARGET GPA FORMULA
            ================================================= */}
            {isTargetGPA && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">

                <h3 className="text-lg font-semibold text-slate-950">
                  Target GPA formula
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  The required GPA is calculated from your current
                  CGPA, completed credits, target CGPA, and remaining
                  credits.
                </p>

                <div className="mt-4 rounded-xl bg-white p-4 text-center font-mono text-sm leading-7 text-slate-800">
                  Required GPA = [Target × Total Credits − Current GPA
                  × Completed Credits] ÷ Remaining Credits
                </div>

              </div>
            )}


            {/* =================================================
                GRADE CALCULATOR FORMULA
            ================================================= */}
            {isGradeCalculator && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">

                <h3 className="text-lg font-semibold text-slate-950">
                  How the grade is calculated
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Each assessment contributes according to its
                  assigned percentage weight.
                </p>

                <div className="mt-4 rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
                  Final Grade = Σ(Score × Weight) ÷ 100
                </div>

              </div>
            )}


            {/* =================================================
                PERCENTAGE FORMULAS
            ================================================= */}
            {isPercentageCalculator && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">

                <h3 className="text-lg font-semibold text-slate-950">
                  Percentage formulas
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Percentage calculations can be used to find a
                  portion of a number, compare two values, or measure
                  a change.
                </p>

                <div className="mt-4 space-y-3">

                  <div className="rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
                    Percentage = (Part ÷ Whole) × 100
                  </div>

                  <div className="rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
                    Percentage Change = ((New − Original) ÷ |Original|)
                    × 100
                  </div>

                </div>

              </div>
            )}


            {/* =================================================
                ATTENDANCE FORMULA
            ================================================= */}
            {isAttendanceCalculator && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">

                <h3 className="text-lg font-semibold text-slate-950">
                  Attendance formula
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Attendance percentage is calculated by dividing the
                  number of classes attended by the total number of
                  classes held.
                </p>

                <div className="mt-4 rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
                  Attendance % = (Classes Attended ÷ Classes Held) ×
                  100
                </div>

              </div>
            )}


            {/* =================================================
                BUNK CALCULATOR FORMULA
            ================================================= */}
            {isBunkCalculator && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">

                <h3 className="text-lg font-semibold text-slate-950">
                  Bunk calculator formula
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  The calculator finds the largest number of
                  additional classes you can miss while keeping your
                  attendance at or above your selected target.
                </p>

                <div className="mt-4 rounded-xl bg-white p-4 text-center font-mono text-sm leading-7 text-slate-800">
                  Maximum Misses = (Classes Attended ÷ Target Rate) −
                  Classes Held
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Because you can only miss a whole class, the result
                  is rounded down to the nearest whole number.
                </p>

              </div>
            )}


            {/* =================================================
                ATTENDANCE GOAL FORMULA
            ================================================= */}
            {isAttendanceGoal && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">

                <h3 className="text-lg font-semibold text-slate-950">
                  Attendance goal formula
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  To find the number of consecutive classes you need
                  to attend, we calculate how many additional attended
                  classes are required for your attendance to reach
                  the target.
                </p>

                <div className="mt-4 rounded-xl bg-white p-4 text-center font-mono text-sm leading-7 text-slate-800">
                  Required Classes = (Target × Classes Held − 100 ×
                  Classes Attended) ÷ (100 − Target)
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  The result is rounded up because you must attend a
                  whole number of classes to reach or exceed your
                  target.
                </p>

              </div>
            )}


            {/* =================================================
                STUDENT BUDGET FORMULA
            ================================================= */}
            {isStudentBudget && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">

                <h3 className="text-lg font-semibold text-slate-950">
                  Student budget formula
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Your remaining budget is calculated by subtracting
                  your total planned expenses from your monthly
                  income.
                </p>

                <div className="mt-4 rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
                  Remaining Budget = Monthly Income − Total Expenses
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  The calculator also shows what percentage of your
                  income is being used by your planned expenses.
                </p>

              </div>
            )}


            {/* =================================================
                ALLOWANCE CALCULATOR FORMULA
            ================================================= */}
            {isAllowanceCalculator && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">

                <h3 className="text-lg font-semibold text-slate-950">
                  Allowance planning formula
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Your available spending amount is calculated by
                  taking your monthly allowance and subtracting your
                  planned savings.
                </p>

                <div className="mt-4 space-y-3">

                  <div className="rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
                    Monthly Allowance = Allowance × Payments Per Month
                  </div>

                  <div className="rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
                    Available Spending = Monthly Allowance − Savings
                  </div>

                  <div className="rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
                    Remaining = Available Spending − Planned Expenses
                  </div>

                </div>

              </div>
            )}


            {/* =================================================
                SAVINGS CALCULATOR FORMULA
            ================================================= */}
            {isSavingsCalculator && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">

                <h3 className="text-lg font-semibold text-slate-950">
                  Savings formula
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  The calculator first determines how much more you
                  need to save, then estimates how many months it will
                  take based on your planned monthly savings.
                </p>

                <div className="mt-4 space-y-3">

                  <div className="rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
                    Amount Remaining = Savings Goal − Current Savings
                  </div>

                  <div className="rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
                    Months Needed = Amount Remaining ÷ Monthly Savings
                  </div>

                  <p className="pt-1 text-sm leading-6 text-slate-600">
                    The estimated number of months is rounded up
                    because you need to complete a full savings period
                    to reach or exceed your goal.
                  </p>

                </div>

              </div>
            )}


            {/* =================================================
                STUDY PLANNER FORMULA
            ================================================= */}
            {isStudyPlanner && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">

                <h3 className="text-lg font-semibold text-slate-950">
                  Study planning formula
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Your daily study time is estimated by dividing the
                  total study hours you plan to complete by the number
                  of days in your study period.
                </p>

                <div className="mt-4 space-y-3">

                  <div className="rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
                    Daily Study Time = Total Study Hours ÷ Number of Days
                  </div>

                  <div className="rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
                    Subject Daily Time = Subject Hours ÷ Number of Days
                  </div>

                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  The planner distributes your requested study time
                  evenly across the selected study period. You can
                  adjust the hours for each subject to create a plan
                  that fits your priorities.
                </p>

              </div>
            )}


            {/* =================================================
                POMODORO TIMER CONTENT
            ================================================= */}
            {isPomodoroTimer && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">

                <h3 className="text-lg font-semibold text-slate-950">
                  How the Pomodoro method works
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  The Pomodoro technique breaks study time into
                  focused work sessions followed by short breaks.
                  This timer uses a 25-minute focus session followed
                  by a 5-minute break.
                </p>

                <div className="mt-4 space-y-3">

                  <div className="rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
                    Focus Session = 25 minutes
                  </div>

                  <div className="rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
                    Short Break = 5 minutes
                  </div>

                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Complete a focus session, take a short break, and
                  then return to your next task. Use the completed
                  session counter to keep track of your progress.
                </p>

              </div>
            )}


            {/* =================================================
                EXAM COUNTDOWN CONTENT
            ================================================= */}
            {isExamCountdown && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">

                <h3 className="text-lg font-semibold text-slate-950">
                  How the exam countdown works
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  The countdown compares the current time with your
                  scheduled exam date and time and continuously shows
                  the remaining days, hours, minutes, and seconds.
                </p>

                <div className="mt-4 space-y-3">

                  <div className="rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
                    Time Remaining = Exam Date and Time − Current Time
                  </div>

                  <div className="rounded-xl bg-white p-4 text-center text-sm text-slate-700">
                    When the countdown reaches zero, the exam time
                    has arrived.
                  </div>

                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Set the countdown early enough to give yourself time
                  for revision, practice, and final preparation before
                  your exam.
                </p>

              </div>
            )}


            {/* =================================================
                BACK TO TOOLS
            ================================================= */}
            <div className="mt-10">

              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-950"
              >
                <ArrowLeft size={17} />
                Explore more student tools
              </Link>

            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

export default ToolPage;