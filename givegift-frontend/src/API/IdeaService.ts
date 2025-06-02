import axios from "axios";
import type { IUserIdeaProperties } from "../types";

export default class IdeaService {
  static async generateIdeas(userIdeaProperties: IUserIdeaProperties, is_adult: boolean) {
    return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ideas/generate`, {
      ...userIdeaProperties,
      is_adult: is_adult,
    });;
  }
}
