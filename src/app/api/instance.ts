import axios from "axios";

export const instance = axios.create({
    baseURL: "https://full-app-server-oh45psgvl-zaxar-lenin.vercel.app",
    withCredentials: false,
})