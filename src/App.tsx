import { useEffect, useRef, useState } from "react";
import { DebtChart, MonthlyRepaymentsChart } from "./components/charts";
import { CurrencyAmount } from "./components/CurrencyAmount";
import { Input } from "./components/Input";
import { RepaymentsTable } from "./components/RepaymentsTable";
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

      {summary && (
        <div className="uk-grid">
          <div className="uk-width-1-2">
            <MonthlyRepaymentsChart repayments={summary.repayments} />
          </div>
          <div className="uk-width-1-2">
            <DebtChart repayments={summary.repayments} />
          </div>
        </div>
      )}

      {summary && <RepaymentsTable repayments={summary.repayments} />}
    </div>
  );
}

export default App;
