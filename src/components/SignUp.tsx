import { Box, Button, Input, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SignInBackground from "../assets/svgs/subtle-prism.svg";
import PasswordInput from "./common/PasswordInput";
import * as api from "../api";
import { userSignup } from "../redux/thunkFunctions";
import { useAppDispatch } from "../redux/store";

const passwordValidationRegex = {
  required: true,
  minLength: 8,
  pattern:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
};

const passwordErrorText = (type?: string) => {
  switch (type) {
    case "required":
      return (
        <Text fontSize={13} color="red">
          This field is required
        </Text>
      );
    case "minLength":
      return (
        <Text fontSize={13} color="red">
          Must have minimum of 8 characters
        </Text>
      );
    case "pattern":
      return (
        <Text fontSize={13} color="red">
          Password must have 1 lowercase, 1 uppercase, 1 number and 1 special
          character
        </Text>
      );
    default:
      return (
        <Text fontSize={13} color="red">
          This field is required
        </Text>
      );
  }
};
const emailErrorText = (type?: string) => {
  switch (type) {
    case "required":
      return (
        <Text fontSize={13} color="red">
          This field is required
        </Text>
      );
    case "pattern":
      return (
        <Text fontSize={13} color="red">
          Invalid email address
        </Text>
      );
    default:
      return (
        <Text fontSize={13} color="red">
          This field is required
        </Text>
      );
  }
};

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { register, handleSubmit, formState } = useForm();
  const onSubmit = (data: api.ISignup) => {
    if (data?.password === data?.confirmPassword) {
      dispatch(userSignup(data)).then(() => {
        toast({
          title: "User registered succesfully!!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/signin");
      });
    } else {
      toast({
        title: "Password did not match",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const errors = formState?.errors;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      bgImage={SignInBackground}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDirection="column"
          padding={5}
          bg="white"
          w={400}
          borderRadius={5}
          gap={5}
        >
          <Text fontSize={24} fontWeight={600} textAlign="center">
            Sign Up
          </Text>
          <Box>
            <Text fontSize={13}>First Name</Text>
            <Input
              placeholder="Enter First Name"
              {...register("firstName", { required: true })}
            />
            {errors?.firstName && (
              <Text fontSize={13} color="red">
                Field is required
              </Text>
            )}
          </Box>
          <Box>
            <Text fontSize={13}>Last Name</Text>
            <Input
              placeholder="Enter Last Name"
              {...register("lastName", { required: true })}
            />
            {errors?.lastName && (
              <Text fontSize={13} color="red">
                Field is required
              </Text>
            )}
          </Box>
          <Box>
            <Text fontSize={13}>Email</Text>
            <Input
              placeholder="Enter Email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />
            {errors?.email &&
              emailErrorText((errors?.email?.type || "") as string)}
          </Box>
          <Box>
            <PasswordInput
              label="Password"
              placeholder="Enter Password"
              register={register}
              fieldName="password"
              validation={passwordValidationRegex}
            />
            {errors?.password &&
              passwordErrorText((errors?.password?.type || "") as string)}
          </Box>
          <Box>
            <PasswordInput
              label="Confirm Password"
              placeholder="Enter confirmation password"
              register={register}
              fieldName="confirmPassword"
              validation={passwordValidationRegex}
            />
            {errors?.confirmPassword &&
              passwordErrorText(
                (errors?.confirmPassword?.type || "") as string
              )}
          </Box>
          <Button type="submit">Sign up</Button>
          <Box display="flex">
            <Text fontSize={13}>Already have an account?</Text> &nbsp;
            <Text
              fontSize={13}
              color="blue"
              fontWeight={600}
              cursor="pointer"
              onClick={() => navigate("/signin")}
            >
              Sign in
            </Text>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default SignUp;
