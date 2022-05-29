import axios from "axios";


const instance = axios.create({
    baseURL: "",
    withCredentials: false
});
// instance.get('/foo-bar');
export default instance;