import axios from "@/plugins/http.service";

const axiosFunction = {
  getNftById(id) {
    return axios.get(`nft/nft/${id}`);
  },
  getNftByThisCollection(id) {
    return axios.get(`collection/get-collection/${id}`);
  },
};
export default axiosFunction;
