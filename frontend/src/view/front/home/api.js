import axios from "@/plugins/http.service";

const axiosFunction = {
  getLastNfts() {
    return axios.get(`nft/get-last-nft`);
  },
  getTopTenNfts() {
    return axios.get(`nft/top-ten-nft`);
  },
  getTopCollections() {
    return axios.get(`collection/top-ten-collections`);
  },
  getTopCreators() {
    return axios.get(`/user/top-ten-users`);
  },
};
export default axiosFunction;
