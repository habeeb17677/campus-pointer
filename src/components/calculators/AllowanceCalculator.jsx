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

function AllowanceCalculator() {
  const [currency, setCurrency] = useState("USD");

  const [allowance, setAllowance] = useState("500");
  const [frequency, setFrequency] = useState("monthly");
  const [savings, setSavings] = useState("20");
  const [food, setFood] = useState("100");
  const [transport, setTransport] = useState("75");
  const [school, setSchool] = useState("50");
  const [other, setOther] = useState("50");

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

  const amount = Number(allowance) || 0;

  /*
   * Convert the allowance to a monthly amount.
   *
   * Weekly → approximately 4.33 weeks per month
   * Biweekly → approximately 2.17 payments per month
   * Monthly → 1 payment per month
   */
  const monthlyAllowance = useMemo(() => {
    if (frequency === "weekly") {
      return amount * 4.33;
    }

    if (frequency === "biweekly") {
      return amount * 2.17;
    }

    return amount;
  }, [amount, frequency]);

  const savingsAmount =
    monthlyAllowance * ((Number(savings) || 0) / 100);

  const plannedExpenses =
    (Number(food) || 0) +
    (Number(transport) || 0) +
    (Number(school) || 0) +
    (Number(other) || 0);

  const spendingAmount =
    monthlyAllowance - savingsAmount;

  const remaining =
    spendingAmount - plannedExpenses;

  const formatMoney = (value) => formatter.format(value);

  const inputClasses =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100";

  return (
    <div>
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-slate-950">
          Plan your allowance
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          See how much of your allowance you can save, spend, and
          keep available for unexpected expenses.
        </p>
      </div>

      {/* Currency */}
      <div className="mt-8">
        <label
          htmlFor="allowance-currency"
          className="text-sm font-medium text-slate-800"
        >
          Currency
        </label>

        <select
          id="allowance-currency"
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
      </div>

      {/* Allowance amount */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="allowance-amount"
            className="text-sm font-medium text-slate-800"
          >
            Allowance amount
          </label>

          <input
            id="allowance-amount"
            type="number"
            min="0"
            step="0.01"
            value={allowance}
            onChange={(event) =>
              setAllowance(event.target.value)
            }
            className={inputClasses}
            placeholder="Enter allowance"
          />
        </div>

        <div>
          <label
            htmlFor="allowance-frequency"
            className="text-sm font-medium text-slate-800"
          >
            How often do you receive it?
          </label>

          <select
            id="allowance-frequency"
            value={frequency}
            onChange={(event) =>
              setFrequency(event.target.value)
            }
            className={inputClasses}
          >
            <option value="weekly">Weekly</option>
            <option value="biweekly">Every 2 weeks</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      {/* Savings */}
      <div className="mt-8">
        <label
          htmlFor="allowance-savings"
          className="text-sm font-medium text-slate-800"
        >
          Savings goal
        </label>

        <div className="relative mt-2">
          <input
            id="allowance-savings"
            type="number"
            min="0"
            max="100"
            step="1"
            value={savings}
            onChange={(event) =>
              setSavings(event.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            placeholder="20"
          />

          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            %
          </span>
        </div>

        <p className="mt-2 text-xs text-slate-400">
          Percentage of your monthly allowance you want to save.
        </p>
      </div>

      {/* Planned spending */}
      <div className="mt-8">
        <h3 className="text-base font-semibold text-slate-950">
          Planned monthly spending
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Estimate what you normally spend from your allowance.
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {/* Food */}
          <div>
            <label
              htmlFor="allowance-food"
              className="text-sm font-medium text-slate-800"
            >
              Food
            </label>

            <input
              id="allowance-food"
              type="number"
              min="0"
              step="0.01"
              value={food}
              onChange={(event) =>
                setFood(event.target.value)
              }
              className={inputClasses}
              placeholder="0"
            />
          </div>

          {/* Transport */}
          <div>
            <label
              htmlFor="allowance-transport"
              className="text-sm font-medium text-slate-800"
            >
              Transport
            </label>

            <input
              id="allowance-transport"
              type="number"
              min="0"
              step="0.01"
              value={transport}
              onChange={(event) =>
                setTransport(event.target.value)
              }
              className={inputClasses}
              placeholder="0"
            />
          </div>

          {/* School */}
          <div>
            <label
              htmlFor="allowance-school"
              className="text-sm font-medium text-slate-800"
            >
              School expenses
            </label>

            <input
              id="allowance-school"
              type="number"
              min="0"
              step="0.01"
              value={school}
              onChange={(event) =>
                setSchool(event.target.value)
              }
              className={inputClasses}
              placeholder="0"
            />
          </div>

          {/* Other */}
          <div>
            <label
              htmlFor="allowance-other"
              className="text-sm font-medium text-slate-800"
            >
              Other
            </label>

            <input
              id="allowance-other"
              type="number"
              min="0"
              step="0.01"
              value={other}
              onChange={(event) =>
                setOther(event.target.value)
              }
              className={inputClasses}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-8">
        <h3 className="text-base font-semibold text-slate-950">
          Your allowance plan
        </h3>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {/* Monthly allowance */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Monthly allowance
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              {formatMoney(monthlyAllowance)}
            </p>
          </div>

          {/* Savings */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Monthly savings
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              {formatMoney(savingsAmount)}
            </p>
          </div>

          {/* Planned expenses */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Planned spending
            </p>

            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              {formatMoney(plannedExpenses)}
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

      {/* Status */}
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
              Your allowance plan looks balanced
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              After saving{" "}
              <strong>{formatMoney(savingsAmount)}</strong> and
              covering your planned expenses, you have{" "}
              <strong>{formatMoney(remaining)}</strong> left.
            </p>
          </>
        ) : (
          <>
            <h3 className="font-semibold text-red-700">
              Your planned spending is too high
            </h3>

            <p className="mt-2 text-sm leading-6 text-red-600">
              Your planned expenses are{" "}
              <strong>
                {formatMoney(Math.abs(remaining))}
              </strong>{" "}
              above the amount available after your savings goal.
              Consider reducing some expenses or lowering your
              savings percentage.
            </p>
          </>
        )}
      </div>

      {/* Explanation */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="font-semibold text-slate-950">
          How it works
        </h3>

        <div className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
          <p>
            Your allowance is converted into an estimated monthly
            amount when you choose weekly or biweekly payments.
          </p>

          <p>
            Your savings goal is then set aside first. The remaining
            amount is compared with your planned monthly spending.
          </p>
        </div>
      </div>

      <p className="mt-6 text-center text-xs leading-5 text-slate-400">
        Currency selection only changes how your amounts are
        displayed. No currency conversion is performed.
      </p>
    </div>
  );
}

export default AllowanceCalculator;