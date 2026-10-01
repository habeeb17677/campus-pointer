import {
  Calculator,
  CalendarCheck,
  Wallet,
  BookOpen,
  Target,
  Percent,
  PiggyBank,
  Clock,
  Timer,
} from "lucide-react";

export const toolCategories = [
  {
    id: "grades",
    name: "Grades",
    description: "Understand your grades and plan your academic goals.",
    icon: Calculator,
    tools: [
      {
        name: "GPA Calculator",
        description: "Calculate your semester GPA.",
        path: "/gpa-calculator",
      },
      {
        name: "CGPA Calculator",
        description: "Calculate your cumulative GPA.",
        path: "/cgpa-calculator",
      },
      {
        name: "Target GPA",
        description: "Find the GPA you need to reach your goal.",
        path: "/target-gpa-calculator",
      },
      {
        name: "Grade Calculator",
        description: "Work out your final or required grade.",
        path: "/grade-calculator",
      },
      {
        name: "Percentage Calculator",
        description: "Calculate percentages quickly.",
        path: "/percentage-calculator",
      },
    ],
  },

  {
    id: "attendance",
    name: "Attendance",
    description: "Track attendance and know how many classes you can miss.",
    icon: CalendarCheck,
    tools: [
      {
        name: "Attendance Calculator",
        description: "Calculate your current attendance.",
        path: "/attendance-calculator",
      },
      {
        name: "Bunk Calculator",
        description: "See how many classes you can safely miss.",
        path: "/bunk-calculator",
      },
      {
        name: "Attendance Goal",
        description: "Find the classes needed to reach your target.",
        path: "/attendance-goal",
      },
    ],
  },

  {
    id: "money",
    name: "Money",
    description: "Plan your student spending, savings, and allowance.",
    icon: Wallet,
    tools: [
      {
        name: "Student Budget",
        description: "Build a simple student-friendly budget.",
        path: "/student-budget",
      },
      {
        name: "Allowance Calculator",
        description: "Plan how much you can spend from your allowance.",
        path: "/allowance-calculator",
      },
      {
        name: "Savings Calculator",
        description: "Plan your savings toward a goal.",
        path: "/savings-calculator",
      },
    ],
  },

  {
    id: "study",
    name: "Study",
    description: "Plan your study time and stay focused.",
    icon: BookOpen,
    tools: [
      {
        name: "Study Planner",
        description: "Organize your study sessions.",
        path: "/study-planner",
      },
      {
        name: "Pomodoro Timer",
        description: "Focus with timed study sessions.",
        path: "/pomodoro-timer",
      },
      {
        name: "Exam Countdown",
        description: "Count down to your next exam.",
        path: "/exam-countdown",
      },
    ],
  },
];