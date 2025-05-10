import axios from 'axios';
import createTokenAndSaveCookie from "../Backend/jwt/token.js";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/";
const jwt = createTokenAndSaveCookie.token
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: jwt,
    'Content-Type': 'multipart/form-data'
  }
 
});

export default axiosInstance