import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchEvents = () => axios.get(url);
