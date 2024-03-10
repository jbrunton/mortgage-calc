import React from "react";
import {
  FormLabel,
  Flex,
  InputGroup,
  InputRightAddon,
  Checkbox,
} from "@chakra-ui/react";

type InputProps = {
  testId: string;
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  suffix?: string;
};

export const CheckboxInput: React.FC<InputProps> = ({
  testId,
  label,
  value,
  onValueChange,
  suffix,
}) => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(e.target.checked);
  };
  return (
    <Flex mb={8}>
      <FormLabel flex={1}>{label}</FormLabel>
      <InputGroup flex={2}>
        <Checkbox data-testid={testId} onChange={onChange} isChecked={value} />
        {suffix && <InputRightAddon children={suffix} />}
      </InputGroup>
    </Flex>
  );
};
