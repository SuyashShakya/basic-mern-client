import React from "react";

import {
  Box,
  Container,
  Text,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import convertBase64 from "../utils/functions/convertBase64";

interface FormDataType {
  creator?: string;
  title?: string;
  message?: string;
}

const EventForm = () => {
  const [selectedFile, setSelectedFile] = React.useState<unknown>();
  const [tags, setTags] = React.useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const handleUploadFile = async (e: any) => {
    const file = e?.target.files[0];
    console.log("file", e);
    const base64 = await convertBase64(file);
    setSelectedFile(base64);
  };

  const onSubmit = (data: FormDataType) => {
    console.log("data", data);
  };
  console.log("selected file", selectedFile);
  return (
    <Box mt="80px">
      <Container maxW="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDir="column" gap={5}>
            <Text fontSize="2xl">Create an event</Text>

            <Input placeholder="Creator" {...register("creator")} />

            <Input placeholder="Title" {...register("title")} />

            <Textarea placeholder="Message" {...register("message")} />

            <Input
              placeholder="Tags (coma separated)"
              onChange={(e) => setTags(e.target.value)}
            />

            <Input type="file" border="none" onChange={handleUploadFile} />
            <Box display="flex" gap={2}>
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
              <Button colorScheme="red">Reset</Button>
            </Box>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default EventForm;
