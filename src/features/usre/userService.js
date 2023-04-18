import axios from "axios";
import { Base_url} from "../../utils/axiosConfig"
const register = async (userData) => {
  const response = await axios.post( `${Base_url}user/register`, userData);
  if (response.data) {
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
    }
    return response.data;
  }
};

const login = async (userData) => {
  const response = await axios.post( `${Base_url}user/login`, userData);
  if (response.data) {
    return response.data;
  }
};




export const authService={
    register, login
}
