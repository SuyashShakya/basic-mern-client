import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface IPasswordProps {
  label?: string;
  placeholder?: string;
  register?: UseFormRegister<FieldValues>;
  fieldName?: string;
  validation?: RegisterOptions;
}
const PasswordInput = (props: IPasswordProps) => {
  const { label, placeholder, register, fieldName, validation } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <Box>
      <Text fontSize={13}>{label}</Text>
      <InputGroup>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...(register && fieldName && register(fieldName, validation))}
        />
        <InputRightElement>
          {showPassword ? (
            <AiOutlineEyeInvisible
              cursor="pointer"
              color="green.500"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <AiOutlineEye
              cursor="pointer"
              color="green.500"
              onClick={() => setShowPassword(true)}
            />
          )}
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default PasswordInput;
