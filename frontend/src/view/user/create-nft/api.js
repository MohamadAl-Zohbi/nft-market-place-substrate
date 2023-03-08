import axios from "@/plugins/http.service";

const axiosFunction = {
  getAllCollections() {
    return axios.get("collection/get-all-collections");
  },
  createNft(data) {
    return axios.post(`nft/create`, data);
  },
};
export default axiosFunction;
