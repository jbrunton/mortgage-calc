import { useEffect, useState } from "react";
import { FormattedNumber } from "react-intl";
import { Input } from "./components/Input";

type Params = {
  loan: number;
  rate: number;
  term: number;
};

type Repayment = {
  month: number;
  principal: number;
  monthlyRepayment: number;
  monthlyInterest: number;
  cumulativeInterest: number;
};

type RepaymentsSummary = {
  repayments: Repayment[];
  totalCost: number;
};

const calculateRepayments = ({
  loan,
  rate,
  term,
}: Params): RepaymentsSummary => {
  let principal = loan;
  let month = 0;
  let cumulativeInterest = 0;

  const monthlyRate = rate / 100 / 12;

  const repayments: Repayment[] = [];

  while (principal > 0.01) {
    ++month;

    const remainingTerm = term * 12 - month;

    const ln = Math.pow(1 + monthlyRate, remainingTerm);
    const monthlyRepayment = principal / ((1 - 1 / ln) / monthlyRate);

    const monthlyInterest = principal * monthlyRate;
    cumulativeInterest += monthlyInterest;

    repayments.push({
      month,
      principal,
      monthlyRepayment,
      monthlyInterest,
      cumulativeInterest,
    });

    principal -= monthlyRepayment - monthlyInterest;
  }

  return {
    repayments,
    totalCost: cumulativeInterest,
  };
};

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

      <form className="uk-form-horizontal">
        <Input id="loan" label="Loan" value={loan} onChange={setLoan} />
        <Input id="rate" label="Rate" value={rate} onChange={setRate} />
        <Input id="term" label="Term (Years)" value={term} onChange={setTerm} />
      </form>

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
            <th>Principal</th>
            <th>Repayment</th>
            <th>Interest</th>
          </tr>
        </thead>
        <tbody>
          {summary?.repayments.map((row) => (
            <tr key={row.month}>
              <td>{row.month}</td>
              <td>
                <FormattedNumber
                  value={row.principal}
                  maximumFractionDigits={0}
                />
              </td>
              <td>
                <FormattedNumber
                  value={row.monthlyRepayment}
                  maximumFractionDigits={0}
                />
              </td>
              <td>
                <FormattedNumber
                  value={row.monthlyInterest}
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
