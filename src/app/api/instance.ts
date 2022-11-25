import axios from "axios";

export const instance = axios.create({
    baseURL: "https://full-app-server-zaxar-lenin.vercel.app/",
    withCredentials: false,
})