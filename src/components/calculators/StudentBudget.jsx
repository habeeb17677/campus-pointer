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

function StudentBudget() {
  const [currency, setCurrency] = useState("USD");

  const [income, setIncome] = useState("2000");
  const [housing, setHousing] = useState("600");
  const [food, setFood] = useState("300");
  const [transport, setTransport] = useState("150");
  const [school, setSchool] = useState("200");
  const [other, setOther] = useState("100");

  const selectedCurrency = currencies.find(
    (item) => item.code === currency,
  );

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

  const monthlyIncome = Number(income) || 0;

  const totalExpenses =
    (Number(housing) || 0) +
    (Number(food) || 0) +
    (Number(transport) || 0) +
    (Number(school) || 0) +
    (Number(other) || 0);

  const remaining = monthlyIncome - totalExpenses;

  const expensePercentage =
    monthlyIncome > 0
      ? (totalExpenses / monthlyIncome) * 100
      : 0;

  const formatMoney = (value) => formatter.format(value);

  const inputClasses =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100";

  return (
    <div>
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-slate-950">
          Build your student budget
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Enter your monthly income and expenses to see how much
          money you have left after your planned spending.
        </p>
      </div>

      {/* Currency */}
      <div className="mt-8">
        <label
          htmlFor="currency"
          className="text-sm font-medium text-slate-800"
        >
          Currency
        </label>

        <select
          id="currency"
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

      {/* Income */}
      <div className="mt-8">
        <label
          htmlFor="monthly-income"
          className="text-sm font-medium text-slate-800"
        >
          Monthly income
        </label>

        <input
          id="monthly-income"
          type="number"
          min="0"
          step="0.01"
          value={income}
          onChange={(event) => setIncome(event.target.value)}
          className={inputClasses}
          placeholder="Enter your monthly income"
        />
      </div>

      {/* Expenses */}
      <div className="mt-8">
        <h3 className="text-base font-semibold text-slate-950">
          Monthly expenses
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Enter the amount you normally spend in each category.
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {/* Housing */}
          <div>
            <label
              htmlFor="housing"
              className="text-sm font-medium text-slate-800"
            >
              Housing
            </label>

            <input
              id="housing"
              type="number"
              min="0"
              step="0.01"
              value={housing}
              onChange={(event) => setHousing(event.target.value)}
              className={inputClasses}
              placeholder="0"
            />
          </div>

          {/* Food */}
          <div>
            <label
              htmlFor="food"
              className="text-sm font-medium text-slate-800"
            >
              Food
            </label>

            <input
              id="food"
              type="number"
              min="0"
              step="0.01"
              value={food}
              onChange={(event) => setFood(event.target.value)}
              className={inputClasses}
              placeholder="0"
            />
          </div>

          {/* Transport */}
          <div>
            <label
              htmlFor="transport"
              className="text-sm font-medium text-slate-800"
            >
              Transport
            </label>

            <input
              id="transport"
              type="number"
              min="0"
              step="0.01"
              value={transport}
              onChange={(event) => setTransport(event.target.value)}
              className={inputClasses}
              placeholder="0"
            />
          </div>

          {/* School */}
          <div>
            <label
              htmlFor="school"
              className="text-sm font-medium text-slate-800"
            >
              School expenses
            </label>

            <input
              id="school"
              type="number"
              min="0"
              step="0.01"
              value={school}
              onChange={(event) => setSchool(event.target.value)}
              className={inputClasses}
              placeholder="0"
            />
          </div>

          {/* Other */}
          <div className="sm:col-span-2">
            <label
              htmlFor="other"
              className="text-sm font-medium text-slate-800"
            >
              Other expenses
            </label>

            <input
              id="other"
              type="number"
              min="0"
              step="0.01"
              value={other}
              onChange={(event) => setOther(event.target.value)}
              className={inputClasses}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-8">
        <h3 className="text-base font-semibold text-slate-950">
          Your budget
        </h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {/* Income */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Monthly income
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              {formatMoney(monthlyIncome)}
            </p>
          </div>

          {/* Expenses */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Total expenses
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              {formatMoney(totalExpenses)}
            </p>
          </div>

          {/* Remaining */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Remaining
            </p>

            <p
              className={`mt-2 text-2xl font-bold tracking-tight ${
                remaining >= 0
                  ? "text-slate-950"
                  : "text-red-600"
              }`}
            >
              {formatMoney(remaining)}
            </p>
          </div>
        </div>
      </div>

      {/* Expense percentage */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-800">
              Income used for expenses
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {expensePercentage.toFixed(1)}% of your monthly income
            </p>
          </div>

          <span className="text-lg font-bold text-slate-950">
            {expensePercentage.toFixed(0)}%
          </span>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-slate-900 transition-all"
            style={{
              width: `${Math.min(expensePercentage, 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Budget status */}
      <div
        className={`mt-6 rounded-2xl border p-5 ${
          remaining >= 0
            ? "border-slate-200 bg-slate-50"
            : "border-red-200 bg-red-50"
        }`}
      >
        {remaining >= 0 ? (
          <>
            <h3 className="font-semibold text-slate-950">
              You are within your budget
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              After your planned expenses, you have{" "}
              <strong>{formatMoney(remaining)}</strong>{" "}
              remaining for savings, emergencies, or additional
              spending.
            </p>
          </>
        ) : (
          <>
            <h3 className="font-semibold text-red-700">
              Your expenses are higher than your income
            </h3>

            <p className="mt-2 text-sm leading-6 text-red-600">
              You are currently spending{" "}
              <strong>{formatMoney(Math.abs(remaining))}</strong>{" "}
              more than your monthly income. Consider reducing some
              expenses or adjusting your budget.
            </p>
          </>
        )}
      </div>

      {/* Currency note */}
      <p className="mt-6 text-center text-xs leading-5 text-slate-400">
        All calculations are performed using the amounts you enter.
        Currency selection only changes how your results are
        displayed.
      </p>
    </div>
  );
}

export default StudentBudget;