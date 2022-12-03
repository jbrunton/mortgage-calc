import React, { useEffect, useState } from "react";
import { FormControl } from "@chakra-ui/react";
import { Params } from "@entities/repayments";
import { ParamInput } from "../../../components/Input";

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
      <ParamInput
        id="loan"
        label="Loan"
        value={loan}
        onValueChange={setLoan}
        onBlur={onBlur}
      />
      <ParamInput
        id="rate"
        label="Interest Rate"
        suffix="%"
        value={rate}
        onValueChange={setRate}
        onBlur={onBlur}
      />
      <ParamInput
        id="term"
        label="Term"
        suffix="years"
        value={term}
        onValueChange={setTerm}
        onBlur={onBlur}
      />
    </FormControl>
  );
};
