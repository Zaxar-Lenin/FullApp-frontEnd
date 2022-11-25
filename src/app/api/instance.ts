import axios from "axios";

export const instance = axios.create({
    baseURL: "https://full-app-server.vercel.app",
    withCredentials: false,
})