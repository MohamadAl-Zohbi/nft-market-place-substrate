import axios from "@/plugins/http.service";

const axiosFunction = {

  getNft() {
    return axios.get(`nft/get-all-nft`);
  },

};
export default axiosFunction;
