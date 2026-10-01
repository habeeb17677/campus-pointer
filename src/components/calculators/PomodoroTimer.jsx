import { useEffect, useState } from "react";

function PomodoroTimer() {
  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  const [mode, setMode] = useState("work");
  const [seconds, setSeconds] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const timer = setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          setIsRunning(false);

          if (mode === "work") {
            setSessions((currentSessions) => currentSessions + 1);
            setMode("break");
            return BREAK_TIME;
          }

          setMode("work");
          return WORK_TIME;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, mode]);

  const formatTime = (value) => {
    const minutes = Math.floor(value / 60);
    const remainingSeconds = value % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMode("work");
    setSeconds(WORK_TIME);
  };

  const switchMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setSeconds(newMode === "work" ? WORK_TIME : BREAK_TIME);
  };

  return (
    <div>
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-slate-950">
          Pomodoro Timer
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Focus for 25 minutes, then take a short break before
          starting your next study session.
        </p>
      </div>

      {/* Mode selector */}
      <div className="mt-7 flex rounded-xl bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => switchMode("work")}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
            mode === "work"
              ? "bg-white text-slate-950 shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Focus
        </button>

        <button
          type="button"
          onClick={() => switchMode("break")}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
            mode === "break"
              ? "bg-white text-slate-950 shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Break
        </button>
      </div>

      {/* Timer */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center sm:p-10">
        <p className="text-sm font-medium text-slate-500">
          {mode === "work" ? "Focus session" : "Short break"}
        </p>

        <div
          className="mt-4 text-6xl font-bold tracking-tight text-slate-950 sm:text-7xl"
          aria-live="polite"
          aria-label={`Time remaining ${formatTime(seconds)}`}
        >
          {formatTime(seconds)}
        </div>

        <p className="mt-3 text-sm text-slate-500">
          {mode === "work"
            ? "Stay focused and work on one task."
            : "Step away, relax, and recharge."}
        </p>

        {/* Controls */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setIsRunning((running) => !running)}
            className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            {isRunning ? "Pause" : "Start"}
          </button>

          <button
            type="button"
            onClick={resetTimer}
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Session information */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">
            Completed focus sessions
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-950">
            {sessions}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">
            Current session
          </p>

          <p className="mt-2 text-lg font-semibold text-slate-950">
            {mode === "work" ? "Focus" : "Break"}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {mode === "work"
              ? "25-minute study session"
              : "5-minute break"}
          </p>
        </div>
      </div>

      {/* Tip */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="text-sm font-semibold text-slate-950">
          Study tip
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Choose one clear task before starting the timer. During
          the focus session, avoid switching between unrelated
          tasks so you can make the most of your study time.
        </p>
      </div>
    </div>
  );
}

export default PomodoroTimer;