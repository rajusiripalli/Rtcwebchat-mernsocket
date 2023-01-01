 import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});


export const constants = {
  baseURL: 'http://localhost:5000',
};