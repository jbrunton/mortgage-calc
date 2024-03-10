import React, { useEffect, useState } from "react";
import { FormControl } from "@chakra-ui/react";
import { MortgageParams } from "@entities/mortgages";
import { NumberInput } from "../../../components/NumberInput";
import { CheckboxInput } from "@components/CheckboxInput";

type MortgageParamsFormProps = {
  params: MortgageParams;
  onChange: (params: MortgageParams) => void;
};

export const MortgageParamsForm: React.FC<MortgageParamsFormProps> = ({
  params,
  onChange,
}) => {
  const [loan, setLoan] = useState(params.loan);
  const [rate, setRate] = useState(params.rate);
  const [term, setTerm] = useState(params.term);
  const [propertyValue, setPropertyValue] = useState(params.propertyValue);

  useEffect(() => {
    const { loan, rate, term, propertyValue } = params;
    setLoan(loan);
    setRate(rate);
    setTerm(term);
    setPropertyValue(propertyValue);
  }, [JSON.stringify(params)]);

  const onBlur = () => {
    const newParams = {
      loan,
      rate,
      term,
      propertyValue,
      firstTimeBuyer: params.firstTimeBuyer,
    };
    if (JSON.stringify(newParams) !== JSON.stringify(params)) {
      onChange(newParams);
    }
  };

  const onFirstTimeBuyerChecked = (firstTimeBuyer: boolean) => {
    onChange({ ...params, firstTimeBuyer });
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
        label="Property Value"
        testId="property-value"
        value={propertyValue}
        onValueChange={setPropertyValue}
        onBlur={onBlur}
      />
      <NumberInput
        label="Deposit"
        testId="deposit"
        readonly={true}
        value={propertyValue - loan}
      />
      <CheckboxInput
        label="First Time Buyer"
        testId="first-time-buyer"
        value={params.firstTimeBuyer}
        onValueChange={onFirstTimeBuyerChecked}
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
