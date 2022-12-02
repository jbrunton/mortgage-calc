import React, { useEffect, useState } from "react";
import { Params } from "../repayments";
import { Input } from "./Input";

type InputsFormProps = {
  params: Params;
  onChange: (params: Params) => void;
};

export const InputsForm: React.FC<InputsFormProps> = ({ params, onChange }) => {
  const [loan, setLoan] = useState<number>(params.loan);
  const [rate, setRate] = useState<number>(params.rate);
  const [term, setTerm] = useState<number>(params.term);

  useEffect(() => {
    const { loan, rate, term } = params;
    setLoan(loan);
    setRate(rate);
    setTerm(term);
  }, [JSON.stringify(params)]);

  const onBlur = () => {
    const newParams = { loan, rate, term };
    if (JSON.stringify(newParams) !== JSON.stringify(params)) {
      onChange(newParams);
    }
  };

  return (
    <form className="uk-form-horizontal">
      <Input
        id="loan"
        label="Loan"
        value={loan}
        onValueChange={setLoan}
        onBlur={onBlur}
      />
      <Input
        id="rate"
        label="Interest Rate"
        suffix="%"
        value={rate}
        onValueChange={setRate}
        onBlur={onBlur}
      />
      <Input
        id="term"
        label="Term"
        suffix="years"
        value={term}
        onValueChange={setTerm}
        onBlur={onBlur}
      />
    </form>
  );
};
