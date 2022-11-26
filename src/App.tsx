import { useEffect, useState } from "react";
import { FormattedNumber } from "react-intl";
import { Input } from "./components/Input";
import { RepaymentsChart } from "./components/RepaymentsChart";
import { SummaryTable } from "./components/SummaryTable";
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
      <h1>Mortgage Calculator</h1>

      <p className="uk-text-lead">
        Calculate repayments and interest for a mortgage.
      </p>

      <div className="uk-grid">
        <div className="uk-width-1-2">
          <form className="uk-form-horizontal">
            <Input
              id="loan"
              label="Loan"
              defaultValue={loan}
              onValueChange={setLoan}
            />
            <Input
              id="rate"
              label="Interest Rate"
              suffix="%"
              defaultValue={rate}
              onValueChange={setRate}
            />
            <Input
              id="term"
              label="Term"
              suffix="years"
              defaultValue={term}
              onValueChange={setTerm}
            />
          </form>
        </div>
        <div className="uk-width-1-2">
          {summary && <SummaryTable summary={summary} />}
        </div>
      </div>

      {summary && <RepaymentsChart repayments={summary.repayments} />}

      <table className="uk-table uk-table-striped">
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
                <FormattedNumber value={row.amount} maximumFractionDigits={0} />
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
