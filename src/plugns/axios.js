import axios from "axios";

const $axios = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
});

export default $axios;