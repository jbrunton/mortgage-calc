import React from "react";
import {
  FormLabel,
  Flex,
  InputGroup,
  InputRightAddon,
  Input,
} from "@chakra-ui/react";

type InputProps = {
  testId: string;
  label: string;
  value: number;
  onValueChange?: (value: number) => void;
  onBlur?: () => void;
  readonly?: boolean;
  suffix?: string;
};

export const NumberInput: React.FC<InputProps> = ({
  testId,
  label,
  value,
  onValueChange,
  onBlur,
  suffix,
  readonly,
}) => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      onValueChange?.(value);
    }
  };
  return (
    <Flex mb={8}>
      <FormLabel flex={1}>{label}</FormLabel>
      <InputGroup flex={2}>
        <Input
          data-testid={testId}
          type="number"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          border={readonly ? "none" : undefined}
          readOnly={readonly === true}
        />
        {suffix && <InputRightAddon children={suffix} />}
      </InputGroup>
    </Flex>
  );
};
