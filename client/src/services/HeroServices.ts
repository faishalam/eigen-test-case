import Axios from "axios";

const baseURL = "https://newsapi.org/v2/";

export const HeroServices = Axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
