import axios from "axios";

export const getHelloWorld = () => {
    return axios.get(`http://localhost:5301/health`);
}
