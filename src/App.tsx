import React from "react";
import AppBar from "./components/AppBar";
import Events from "./components/Events";
import EventForm from "./components/EventForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const App = () => {
  return (
    <Box minH="100%">
      <Router>
        <AppBar />
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="create" element={<EventForm />} />
          <Route path="edit/:eventId" element={<EventForm />} />
        </Routes>
      </Router>
    </Box>
  );
};
export default App;