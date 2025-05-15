import axios from "axios";
import type { IUserIdeaProperties } from "../types";

export default class IdeaService {
  static async generateIdeas(userIdeaProperties: IUserIdeaProperties, is_adult: boolean) {
    return await axios.post("http://127.0.0.1:5000/ideas/generate", {
      ...userIdeaProperties,
      is_adult: is_adult,
    });;
  }
}
