import axios from "axios";

const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(/^(127\.|10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1]))$/) ||
    window.location.hostname.startsWith("localhost:")
);

const API_URL = isLocalhost
? "http://localhost:5008"
: "https://hearmeserver.khuprat.com";

const Axios = axios.create({
withCredentials: true,
baseURL: API_URL,
});

export default Axios;



