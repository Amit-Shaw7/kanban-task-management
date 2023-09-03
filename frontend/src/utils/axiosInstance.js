import axios from "axios";
const API_SERVER = process.env.REACT_APP_BACKEND_URI

const instance = axios.create({
    baseURL: `${API_SERVER}`,
    timeout: 10000, // Request timeout in milliseconds
    withCredentials: true, // Include credentials in cross-origin requests
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;