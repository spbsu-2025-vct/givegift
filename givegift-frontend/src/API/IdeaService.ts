import axios from "axios";

export interface IUserIdeaProperties {
  interests: string[];
  price_range: number[];
}

export default class IdeaService {
  static async generateIdeas(userIdeaProperties: IUserIdeaProperties, is_adult: boolean) {
    console.log("Mock generateIdeas called with:", {
      userIdeaProperties,
      is_adult,
    });
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          data: [
            `Mock idea for interests: ${userIdeaProperties.interests.join(
              ", "
            )}`,
            `Mock idea (adult=${is_adult})`,
          ],
        });
      }, 300);
    });

    // return await axios.post("http://127.0.0.1:5000/generate_ideas", {
    //   ...userIdeaProperties,
    //   is_adult: is_adult,
    // });
  }
}
