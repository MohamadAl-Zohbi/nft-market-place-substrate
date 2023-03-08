import axios from "@/plugins/http.service";

const axiosFunction = {
  getAllCollections() {
    return axios.get(`collection//get-all-collections`);
  },
};
export default axiosFunction;
