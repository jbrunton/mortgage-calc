import { useEffect, useState } from "react";
import { FormattedNumber } from "react-intl";
import { Input } from "./components/Input";
import { RepaymentsChart } from "./components/RepaymentsChart";
import { calculateRepayments, RepaymentsSummary } from "./repayments";

function App() {
  const [loan, setLoan] = useState(100_000);
  const [rate, setRate] = useState(4);
  const [term, setTerm] = useState(20);
  const [summary, setSummary] = useState<RepaymentsSummary>();

  useEffect(() => {
    const summary = calculateRepayments({ loan, rate, term });
    setSummary(summary);
  }, [loan, rate, term]);

  return (
    <div className="App uk-container">
      <div className="uk-navbar-container uk-navbar-transparent">
        <div className="uk-navbar-left">
          <div className="uk-navbar-item">Mortgage Calculator</div>
        </div>
      </div>

      <div className="uk-grid uk-child-width-expand">
        <div className="uk-width-1-3">
          <form className="uk-form-width-small">
            <Input id="loan" label="Loan" value={loan} onChange={setLoan} />
            <Input id="rate" label="Rate" value={rate} onChange={setRate} />
            <Input
              id="term"
              label="Term (Years)"
              value={term}
              onChange={setTerm}
            />
          </form>
        </div>
        <div className="uk-width-2-3">
          {summary && <RepaymentsChart repayments={summary?.repayments} />}
        </div>
      </div>

      <table className="uk-table uk-table-striped">
        <caption>
          {summary && (
            <span>
              Total cost:{" "}
              <FormattedNumber
                value={summary.totalCost}
                maximumFractionDigits={0}
              />
            </span>
          )}
        </caption>
        <thead>
          <tr>
            <th>Month</th>

            <th>Amount</th>
            <th>Principal</th>
            <th>Interest</th>

            <th>Remaining Principal</th>
            <th>Cumulative Interest</th>
          </tr>
        </thead>
        <tbody>
          {summary?.repayments.map((row) => (
            <tr key={row.month}>
              <td>{row.month}</td>

              <td>
                <FormattedNumber
                  value={row.amount}
                  maximumFractionDigits={0}
                />
              </td>
              <td>
                <FormattedNumber
                  value={row.principal}
                  maximumFractionDigits={0}
                />
              </td>
              <td>
                <FormattedNumber
                  value={row.interest}
                  maximumFractionDigits={0}
                />
              </td>

              <td>
                <FormattedNumber
                  value={row.remainingPrincipal}
                  maximumFractionDigits={0}
                />
              </td>
              <td>
                <FormattedNumber
                  value={row.cumulativeInterest}
                  maximumFractionDigits={0}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
