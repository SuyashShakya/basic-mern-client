import AppBar from "./components/AppBar";
import Events from "./components/Events";
import EventForm from "./components/EventForm";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Box } from "@chakra-ui/react";

import PageNotFound from "./components/PageNotFound";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const NavBarLayout = () => {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
};
const App = () => {
  return (
    <Box minH="100%">
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<NavBarLayout />}>
            <Route path="/" element={<Events />} />
            <Route path="create" element={<EventForm />} />
            <Route path="edit/:eventId" element={<EventForm />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </Box>
  );
};
export default App;
