import axios from "@/plugins/http.service";

const axiosFunction = {
  createCollection(data) {
    return axios.post(`collection/create`, data);
  },
};
export default axiosFunction;
