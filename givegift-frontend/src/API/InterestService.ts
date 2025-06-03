import axios from "axios";

export default class InterestService {
  static async fetchAll() {
    return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/interests/all`);
  }
}
