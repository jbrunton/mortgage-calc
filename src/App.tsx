import { useEffect, useState } from "react";
import { DebtChart, MonthlyRepaymentsChart } from "./components/charts";
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

      <div className="uk-section uk-text-center">
        <a data-uk-toggle="target: #modal-example">View monthly repayments</a>
        <div id="modal-example" className="uk-modal-container" data-uk-modal>
          <div className="uk-modal-dialog">
            <button
              className="uk-modal-close-default"
              type="button"
              data-uk-close
            ></button>

            <div className="uk-modal-header">
              <h2 className="uk-modal-title">Monthly Repayments</h2>
            </div>

            <div className="uk-modal-body" data-uk-overflow-auto>
              {summary && <RepaymentsTable repayments={summary.repayments} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
