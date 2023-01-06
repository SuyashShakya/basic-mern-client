import { Box, Button, Input, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SignInBackground from "../assets/svgs/subtle-prism.svg";
import PasswordInput from "./common/PasswordInput";
import * as api from "../api";
import { userSignin } from "../redux/thunkFunctions";
import { useAppDispatch } from "../redux/store";

const SignIn = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const onSubmit = (data: api.ISignin) => {
    dispatch(userSignin(data)).then((res) => {
      console.log("hello", res);
      const payload: {
        response?: { status: number; data: { message: string } };
      } = res.payload;

      if (
        payload?.response?.status === 404 ||
        payload?.response?.status === 400
      ) {
        toast({
          title: payload.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      toast({
        title: "User logged in Successfully!!!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        h="100vh"
        bgImage={SignInBackground}
      >
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
            Sign In
          </Text>
          <Box>
            <Text fontSize={13}>Email</Text>
            <Input placeholder="Enter Email" {...register("email")} />
          </Box>
          <PasswordInput
            label="Password"
            placeholder="Enter Password"
            register={register}
            fieldName="password"
          />
          <Button type="submit">Sign in</Button>
          <Box display="flex">
            <Text fontSize={13}>Don&apos;t an account?</Text> &nbsp;
            <Text
              fontSize={13}
              color="blue"
              fontWeight={600}
              cursor="pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Text>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default SignIn;
