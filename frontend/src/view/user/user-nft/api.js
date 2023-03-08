import axios from "@/plugins/http.service";

const axiosFunction = {
  getNftByUser() {
    return axios.get(`user/get-user-nft`);
  },
};
export default axiosFunction;
