import React from "react";

import {
  Box,
  Container,
  Text,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import convertBase64 from "../utils/functions/convertBase64";
import { createEvents, fetchEvents } from "../redux/eventsSlice";
import { useAppDispatch } from "../redux/store";
import { NewEventType } from "../api";

export interface FormDataType {
  creator?: string;
  title?: string;
  message?: string;
}

const EventForm = () => {
  const [selectedFile, setSelectedFile] = React.useState<unknown>();
  const [tags, setTags] = React.useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleUploadFile = async (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    const base64 = await convertBase64(file);
    setSelectedFile(base64);
  };

  const onSubmit = (data: FormDataType) => {
    const tagsArray = tags.split(",");
    const dataToBeSent = {
      ...data,
      tags: tagsArray,
      selectedFiles: selectedFile,
    };
    dispatch(createEvents(dataToBeSent as NewEventType)).then(() => {
      navigate("/", { replace: false });
      dispatch(fetchEvents());
    });
  };

  return (
    <Box mt="80px">
      <Container maxW="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDir="column" gap={5}>
            <Text fontSize="2xl">Create an event</Text>
            <Text fontSize={14} mb={-5}>
              Creator
            </Text>
            <Input
              placeholder="Enter Creator"
              {...register("creator", { required: true })}
            />
            {errors.creator && (
              <Text fontSize={14} mt={-5}>
                This field is required
              </Text>
            )}
            <Text fontSize={14} mb={-5}>
              Title
            </Text>
            <Input
              placeholder="Enter Title"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <Text fontSize={14} mt={-5}>
                This field is required
              </Text>
            )}

            <Text fontSize={14} mb={-5}>
              Message
            </Text>
            <Textarea
              placeholder="Enter Message"
              {...register("message", { required: true })}
            />
            {errors.message && (
              <Text fontSize={14} mt={-5}>
                This field is required
              </Text>
            )}

            <Text fontSize={14} mb={-5}>
              Tags (coma separated)
            </Text>
            <Input
              placeholder="Enter Tags"
              onChange={(e) => setTags(e.target.value)}
            />
            <Text fontSize={14} mb={-5}>
              Upload Image
            </Text>
            <Input type="file" border="none" onChange={handleUploadFile} />
            <Box display="flex" gap={2}>
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
              <Button colorScheme="red" onClick={() => reset()}>
                Reset
              </Button>
            </Box>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default EventForm;
