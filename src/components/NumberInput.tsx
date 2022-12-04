import React from "react";
import {
  FormLabel,
  Flex,
  Spacer,
  InputGroup,
  InputRightAddon,
  Input,
} from "@chakra-ui/react";

type InputProps = {
  testId: string;
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  onBlur: () => void;
  suffix?: string;
};

export const NumberInput: React.FC<InputProps> = ({
  testId,
  label,
  value,
  onValueChange,
  onBlur,
  suffix,
}) => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      onValueChange(value);
    }
  };
  return (
    <Flex mb={8}>
      <FormLabel flex={1}>{label}</FormLabel>
      <InputGroup flex={1}>
        <Input
          data-testid={testId}
          placeholder="mysite"
          type="number"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
        {suffix && <InputRightAddon children={suffix} />}
      </InputGroup>
      <Spacer flex={1} />
    </Flex>
  );
};
