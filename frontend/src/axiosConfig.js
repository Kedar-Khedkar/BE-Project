import axios from "axios";

let config = {
  baseURL: "http://localhost:5000",
  withCredentials: true,
};
if (process.env === "production") {
  console.log("PRODUCTION ENVIRONMENT VARIABLES SET");
  config.baseURL = `http://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}`;
}
const axiosInstance = axios.create(config);

export default axiosInstance;
