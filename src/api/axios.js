import axios from "axios";

const baseURL = "https://sairna.abdulrahman-hares.com/api/v1/website";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
