import axios from "axios";

const config={
    baseURL:import.meta.env.VITE_API_URL
}


export default axios.create(config)