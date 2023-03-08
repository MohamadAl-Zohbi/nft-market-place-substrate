import axios from "@/plugins/http.service";

const axiosFunction = {
  signup(data) {
    return axios.post("user/signup", data);
  },
};
export default axiosFunction;
