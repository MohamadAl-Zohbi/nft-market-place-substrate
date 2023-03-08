import axios from "@/plugins/http.service";

const axiosFunction = {
  getCollectionByUser() {
    return axios.get(`collection/get-user-collection`);
  },
};
export default axiosFunction;
