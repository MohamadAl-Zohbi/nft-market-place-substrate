import axios from "@/plugins/http.service";

const axiosFunction = {
  login(data) {
    return axios.post(`login/login`, data);
  },
};
export default axiosFunction;
