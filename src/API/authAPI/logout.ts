import axios from "axios";
import { urlUser } from "../../config/config";

export const logout = async () => {
  try {
    await axios.delete(urlUser + "/logout");
  } catch (e) {
    console.error(e);
  }
};
