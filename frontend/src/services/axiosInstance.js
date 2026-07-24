import axios from "axios";

const axiosInstance = axios.create({
  baseURL:"https://sneakerzz.onrender.com",

});

export default axiosInstance;