import React, { useEffect, useState } from "react";
import { FormControl } from "@chakra-ui/react";
import { Params } from "@entities/repayments";
import { NumberInput } from "../../../components/NumberInput";

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
    <FormControl>
      <NumberInput
        label="Loan"
        testId="loan"
        value={loan}
        onValueChange={setLoan}
        onBlur={onBlur}
      />
      <NumberInput
        label="Interest Rate"
        testId="rate"
        suffix="%"
        value={rate}
        onValueChange={setRate}
        onBlur={onBlur}
      />
      <NumberInput
        label="Term"
        testId="term"
        suffix="years"
        value={term}
        onValueChange={setTerm}
        onBlur={onBlur}
      />
    </FormControl>
  );
};
