import React, { useEffect, useState } from "react";
import { FormControl } from "@chakra-ui/react";
import { NumberInput } from "../../../components/NumberInput";
import { RentParams } from "@entities/rent";

type RentParamsFormProps = {
  params: RentParams;
  onChange: (params: RentParams) => void;
};

export const RentParamsForm: React.FC<RentParamsFormProps> = ({
  params,
  onChange,
}) => {
  const [monthlyRent, setMonthlyRent] = useState<number>(params.monthlyRent);
  const [interestRate, setInterestRate] = useState<number>(params.interestRate);
  const [term, setTerm] = useState<number>(params.term);

  useEffect(() => {
    const { monthlyRent, interestRate, term } = params;
    setMonthlyRent(monthlyRent);
    setInterestRate(interestRate);
    setTerm(term);
  }, [JSON.stringify(params)]);

  const onBlur = () => {
    const newParams = { monthlyRent, interestRate, term };
    if (JSON.stringify(newParams) !== JSON.stringify(params)) {
      onChange(newParams);
    }
  };

  return (
    <FormControl>
      <NumberInput
        label="Monthly Rent"
        testId="monthly-rent"
        value={monthlyRent}
        onValueChange={setMonthlyRent}
        onBlur={onBlur}
      />
      <NumberInput
        label="Interest Rate"
        testId="interest-rate"
        suffix="%"
        value={interestRate}
        onValueChange={setInterestRate}
        onBlur={onBlur}
      />
      <NumberInput
        label="Term"
        testId="rent-term"
        suffix="years"
        value={term}
        onValueChange={setTerm}
        onBlur={onBlur}
      />
    </FormControl>
  );
};
