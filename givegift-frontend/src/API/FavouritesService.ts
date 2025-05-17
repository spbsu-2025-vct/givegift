import axios from "axios";
import type { IFavProduct } from "../types";

export default class FavouritesService {
  static async addToFavourites(favProduct: IFavProduct) {
    return await axios.post("http://127.0.0.1:5000/favourites/add", favProduct);
  }

  static async removeFromFavourites(favProduct: IFavProduct) {
    return await axios.delete("http://127.0.0.1:5000/favourites/remove", { params: { userID: favProduct.userID, market_link: favProduct.market_link } });
  }

  static async editFavouritesTag(favProduct: IFavProduct, newTag: string) {
    return await axios.put("http://127.0.0.1:5000/favourites/edit_tag", { favProduct, newTag });
  }

  static async fetchUserFavourites(userID: string) {
    return await axios.get("http://127.0.0.1:5000/favourites/fetch", { params: { userID } });
  }
}
