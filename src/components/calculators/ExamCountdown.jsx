import { useEffect, useMemo, useState } from "react";

function ExamCountdown() {
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examTime, setExamTime] = useState("09:00");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdown = useMemo(() => {
    if (!examDate) {
      return null;
    }

    const target = new Date(`${examDate}T${examTime || "00:00"}`);
    const difference = target.getTime() - now.getTime();

    if (Number.isNaN(target.getTime())) {
      return null;
    }

    if (difference <= 0) {
      return {
        expired: true,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        target,
      };
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor(
      (totalSeconds % (24 * 60 * 60)) / (60 * 60),
    );
    const minutes = Math.floor(
      (totalSeconds % (60 * 60)) / 60,
    );
    const seconds = totalSeconds % 60;

    return {
      expired: false,
      days,
      hours,
      minutes,
      seconds,
      target,
    };
  }, [examDate, examTime, now]);

  const formattedExamDate = countdown?.target
    ? countdown.target.toLocaleString([], {
        dateStyle: "full",
        timeStyle: "short",
      })
    : "";

  return (
    <div>
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-slate-950">
          Set your exam countdown
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter your exam date and time to see exactly how much
          time you have left.
        </p>
      </div>

      {/* Inputs */}
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="exam-name"
            className="block text-sm font-medium text-slate-700"
          >
            Exam name
          </label>

          <input
            id="exam-name"
            type="text"
            value={examName}
            onChange={(event) => setExamName(event.target.value)}
            placeholder="e.g. Mathematics Final Exam"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>

        <div>
          <label
            htmlFor="exam-date"
            className="block text-sm font-medium text-slate-700"
          >
            Exam date
          </label>

          <input
            id="exam-date"
            type="date"
            value={examDate}
            onChange={(event) => setExamDate(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>

        <div>
          <label
            htmlFor="exam-time"
            className="block text-sm font-medium text-slate-700"
          >
            Exam time
          </label>

          <input
            id="exam-time"
            type="time"
            value={examTime}
            onChange={(event) => setExamTime(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>
      </div>

      {/* Countdown */}
      {countdown && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white sm:p-8">
          {countdown.expired ? (
            <div className="text-center">
              <p className="text-sm font-medium text-slate-400">
                {examName || "Your exam"}
              </p>

              <p className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Exam time has arrived
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                The countdown has reached the scheduled exam time.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center">
                <p className="text-sm font-medium text-slate-400">
                  {examName || "Your exam"}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  {formattedExamDate}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl bg-slate-900 p-4 text-center">
                  <p className="text-3xl font-bold sm:text-4xl">
                    {countdown.days}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Days
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900 p-4 text-center">
                  <p className="text-3xl font-bold sm:text-4xl">
                    {String(countdown.hours).padStart(2, "0")}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Hours
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900 p-4 text-center">
                  <p className="text-3xl font-bold sm:text-4xl">
                    {String(countdown.minutes).padStart(2, "0")}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Minutes
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-900 p-4 text-center">
                  <p className="text-3xl font-bold sm:text-4xl">
                    {String(countdown.seconds).padStart(2, "0")}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Seconds
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {!countdown && (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="text-sm text-slate-500">
            Select your exam date to start the countdown.
          </p>
        </div>
      )}

      {/* Preparation tip */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="text-sm font-semibold text-slate-950">
          Preparation tip
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Use the remaining time to break your revision into
          smaller study sessions. Focus on the topics you need to
          improve most and leave time for practice and review.
        </p>
      </div>
    </div>
  );
}

export default ExamCountdown;