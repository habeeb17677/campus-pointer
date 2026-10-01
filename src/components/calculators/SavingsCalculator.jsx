import { useMemo, useState } from "react";

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "GH₵" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "AED", name: "UAE Dirham", symbol: "AED" },
];

function SavingsCalculator() {
  const [currency, setCurrency] = useState("USD");

  const [currentSavings, setCurrentSavings] = useState("0");
  const [savingsGoal, setSavingsGoal] = useState("1000");
  const [monthlySavings, setMonthlySavings] = useState("100");

  const formatter = useMemo(() => {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      });
    } catch {
      return new Intl.NumberFormat(undefined, {
        maximumFractionDigits: 2,
      });
    }
  }, [currency]);

  const current = Number(currentSavings) || 0;
  const goal = Number(savingsGoal) || 0;
  const monthly = Number(monthlySavings) || 0;

  const amountRemaining = Math.max(goal - current, 0);

  const monthsNeeded =
    amountRemaining <= 0
      ? 0
      : monthly > 0
        ? Math.ceil(amountRemaining / monthly)
        : null;

  const progress =
    goal > 0
      ? Math.min((current / goal) * 100, 100)
      : 0;

  const projectedSavings =
    monthly > 0 && monthsNeeded !== null
      ? current + monthly * monthsNeeded
      : current;

  const formatMoney = (value) => formatter.format(value);

  const inputClasses =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100";

  return (
    <div>
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-slate-950">
          Plan your savings goal
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Enter your current savings, your target, and how much you
          can save each month to estimate how long it will take to
          reach your goal.
        </p>
      </div>

      {/* Currency */}
      <div className="mt-8">
        <label
          htmlFor="savings-currency"
          className="text-sm font-medium text-slate-800"
        >
          Currency
        </label>

        <select
          id="savings-currency"
          value={currency}
          onChange={(event) => setCurrency(event.target.value)}
          className={inputClasses}
        >
          {currencies.map((item) => (
            <option key={item.code} value={item.code}>
              {item.code} — {item.name} ({item.symbol})
            </option>
          ))}
        </select>

        <p className="mt-2 text-xs text-slate-400">
          Choose the currency you normally use. No currency
          conversion is performed.
        </p>
      </div>

      {/* Inputs */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {/* Current savings */}
        <div>
          <label
            htmlFor="current-savings"
            className="text-sm font-medium text-slate-800"
          >
            Current savings
          </label>

          <input
            id="current-savings"
            type="number"
            min="0"
            step="0.01"
            value={currentSavings}
            onChange={(event) =>
              setCurrentSavings(event.target.value)
            }
            className={inputClasses}
            placeholder="0"
          />
        </div>

        {/* Savings goal */}
        <div>
          <label
            htmlFor="savings-goal"
            className="text-sm font-medium text-slate-800"
          >
            Savings goal
          </label>

          <input
            id="savings-goal"
            type="number"
            min="0"
            step="0.01"
            value={savingsGoal}
            onChange={(event) =>
              setSavingsGoal(event.target.value)
            }
            className={inputClasses}
            placeholder="1000"
          />
        </div>

        {/* Monthly savings */}
        <div className="sm:col-span-2">
          <label
            htmlFor="monthly-savings"
            className="text-sm font-medium text-slate-800"
          >
            Amount you can save each month
          </label>

          <input
            id="monthly-savings"
            type="number"
            min="0"
            step="0.01"
            value={monthlySavings}
            onChange={(event) =>
              setMonthlySavings(event.target.value)
            }
            className={inputClasses}
            placeholder="100"
          />

          <p className="mt-2 text-xs text-slate-400">
            This is the amount you expect to add to your savings
            every month.
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-800">
              Goal progress
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {formatMoney(current)} of {formatMoney(goal)}
            </p>
          </div>

          <span className="text-lg font-bold text-slate-950">
            {progress.toFixed(0)}%
          </span>
        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-slate-900 transition-all"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Results */}
      <div className="mt-8">
        <h3 className="text-base font-semibold text-slate-950">
          Your savings plan
        </h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {/* Remaining */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Amount remaining
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              {formatMoney(amountRemaining)}
            </p>
          </div>

          {/* Monthly savings */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Monthly savings
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              {formatMoney(monthly)}
            </p>
          </div>

          {/* Time */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Time to goal
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              {monthsNeeded === null
                ? "—"
                : monthsNeeded === 1
                  ? "1 month"
                  : `${monthsNeeded} months`}
            </p>
          </div>
        </div>
      </div>

      {/* Goal status */}
      <div
        className={`mt-6 rounded-2xl border p-5 ${
          amountRemaining === 0
            ? "border-slate-200 bg-slate-50"
            : monthsNeeded !== null
              ? "border-slate-200 bg-slate-50"
              : "border-amber-200 bg-amber-50"
        }`}
      >
        {amountRemaining === 0 ? (
          <>
            <h3 className="font-semibold text-slate-950">
              You've reached your savings goal
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Your current savings already meet or exceed your
              target of <strong>{formatMoney(goal)}</strong>.
            </p>
          </>
        ) : monthsNeeded !== null ? (
          <>
            <h3 className="font-semibold text-slate-950">
              You're on track
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              If you consistently save{" "}
              <strong>{formatMoney(monthly)}</strong> each month,
              you should reach your goal in approximately{" "}
              <strong>
                {monthsNeeded}{" "}
                {monthsNeeded === 1 ? "month" : "months"}
              </strong>
              .
            </p>
          </>
        ) : (
          <>
            <h3 className="font-semibold text-amber-700">
              Add a monthly savings amount
            </h3>

            <p className="mt-2 text-sm leading-6 text-amber-700">
              Enter an amount greater than zero to calculate how
              long it could take to reach your goal.
            </p>
          </>
        )}
      </div>

      {/* Projection */}
      {monthsNeeded !== null && amountRemaining > 0 && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="font-semibold text-slate-950">
            Savings projection
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            After approximately {monthsNeeded}{" "}
            {monthsNeeded === 1 ? "month" : "months"}, your projected
            savings would be{" "}
            <strong>{formatMoney(projectedSavings)}</strong>.
          </p>
        </div>
      )}

      {/* Explanation */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="font-semibold text-slate-950">
          How it works
        </h3>

        <div className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
          <p>
            The calculator subtracts your current savings from your
            target to find how much more you need to save.
          </p>

          <p>
            It then divides the remaining amount by your planned
            monthly savings and rounds up to the next whole month.
          </p>
        </div>
      </div>

      <p className="mt-6 text-center text-xs leading-5 text-slate-400">
        This calculator does not include investment returns,
        interest, taxes, or inflation. Currency selection only
        changes how your amounts are displayed.
      </p>
    </div>
  );
}

export default SavingsCalculator;