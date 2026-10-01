import { useState } from "react";
import { RotateCcw } from "lucide-react";

function PercentageCalculator() {
  const [percentage, setPercentage] = useState("");
  const [number, setNumber] = useState("");
  const [part, setPart] = useState("");
  const [whole, setWhole] = useState("");
  const [changeFrom, setChangeFrom] = useState("");
  const [changeTo, setChangeTo] = useState("");

  const [resultOne, setResultOne] = useState(null);
  const [resultTwo, setResultTwo] = useState(null);
  const [resultThree, setResultThree] = useState(null);

  const calculatePercentageOf = () => {
    const percent = Number(percentage);
    const value = Number(number);

    if (!Number.isFinite(percent) || !Number.isFinite(value)) {
      setResultOne(null);
      return;
    }

    setResultOne((percent / 100) * value);
  };

  const calculateWhatPercentage = () => {
    const partValue = Number(part);
    const wholeValue = Number(whole);

    if (
      !Number.isFinite(partValue) ||
      !Number.isFinite(wholeValue) ||
      wholeValue === 0
    ) {
      setResultTwo(null);
      return;
    }

    setResultTwo((partValue / wholeValue) * 100);
  };

  const calculatePercentageChange = () => {
    const from = Number(changeFrom);
    const to = Number(changeTo);

    if (
      !Number.isFinite(from) ||
      !Number.isFinite(to) ||
      from === 0
    ) {
      setResultThree(null);
      return;
    }

    const change = ((to - from) / Math.abs(from)) * 100;

    setResultThree(change);
  };

  const resetCalculator = () => {
    setPercentage("");
    setNumber("");
    setPart("");
    setWhole("");
    setChangeFrom("");
    setChangeTo("");

    setResultOne(null);
    setResultTwo(null);
    setResultThree(null);
  };

  return (
    <div className="space-y-6">
      {/* Percentage of a Number */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">
            What is a percentage of a number?
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Find a percentage of any number.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="percentage"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Percentage
            </label>

            <div className="relative">
              <input
                id="percentage"
                type="number"
                value={percentage}
                onChange={(event) => {
                  setPercentage(event.target.value);
                  setResultOne(null);
                }}
                placeholder="e.g. 20"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />

              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                %
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="number"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Number
            </label>

            <input
              id="number"
              type="number"
              value={number}
              onChange={(event) => {
                setNumber(event.target.value);
                setResultOne(null);
              }}
              placeholder="e.g. 500"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={calculatePercentageOf}
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
        >
          Calculate
        </button>

        {resultOne !== null && (
          <div className="mt-5 rounded-xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Result
            </p>

            <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
              {resultOne.toFixed(2)}
            </p>
          </div>
        )}
      </div>

      {/* What Percentage Is One Number Of Another */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">
            What percentage is one number of another?
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Find what percentage one value represents of another.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="part"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Part
            </label>

            <input
              id="part"
              type="number"
              value={part}
              onChange={(event) => {
                setPart(event.target.value);
                setResultTwo(null);
              }}
              placeholder="e.g. 25"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="whole"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Whole
            </label>

            <input
              id="whole"
              type="number"
              value={whole}
              onChange={(event) => {
                setWhole(event.target.value);
                setResultTwo(null);
              }}
              placeholder="e.g. 100"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={calculateWhatPercentage}
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
        >
          Calculate
        </button>

        {resultTwo !== null && (
          <div className="mt-5 rounded-xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Result
            </p>

            <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
              {resultTwo.toFixed(2)}%
            </p>
          </div>
        )}
      </div>

      {/* Percentage Change */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">
            Percentage change
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Calculate the percentage increase or decrease between two
            numbers.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="change-from"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Original value
            </label>

            <input
              id="change-from"
              type="number"
              value={changeFrom}
              onChange={(event) => {
                setChangeFrom(event.target.value);
                setResultThree(null);
              }}
              placeholder="e.g. 80"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="change-to"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              New value
            </label>

            <input
              id="change-to"
              type="number"
              value={changeTo}
              onChange={(event) => {
                setChangeTo(event.target.value);
                setResultThree(null);
              }}
              placeholder="e.g. 100"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={calculatePercentageChange}
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
        >
          Calculate
        </button>

        {resultThree !== null && (
          <div className="mt-5 rounded-xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Percentage change
            </p>

            <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
              {Math.abs(resultThree).toFixed(2)}%
            </p>

            <p className="mt-2 text-sm font-medium text-slate-600">
              {resultThree > 0
                ? "Increase"
                : resultThree < 0
                  ? "Decrease"
                  : "No change"}
            </p>
          </div>
        )}
      </div>

      {/* Reset */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={resetCalculator}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
        >
          <RotateCcw size={16} />
          Reset all
        </button>
      </div>

      {/* Formula */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="text-sm font-semibold text-slate-900">
          Percentage formulas
        </h3>

        <div className="mt-4 space-y-3">
          <div className="rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
            Percentage of a number = (Percentage ÷ 100) × Number
          </div>

          <div className="rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
            Percentage = (Part ÷ Whole) × 100
          </div>

          <div className="rounded-xl bg-white p-4 text-center font-mono text-sm text-slate-800">
            Percentage Change = ((New − Original) ÷ |Original|) × 100
          </div>
        </div>
      </div>

      {/* Example */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-slate-900">
          Example
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          To find 20% of 500, enter 20 as the percentage and 500 as
          the number. The result is 100.
        </p>
      </div>
    </div>
  );
}

export default PercentageCalculator;