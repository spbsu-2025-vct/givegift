import axios from "axios";
import type { IFavProduct } from "../types";

export default class FavouritesService {
  static async addToFavourites(favProduct: IFavProduct) {
    return await axios.post("http://127.0.0.1:5000/favourites/add", favProduct);
  }

  static async removeFromFavourites(favProduct: IFavProduct) {
    return await axios.post("http://127.0.0.1:5000/favourites/remove", favProduct);
  }

  static async editFavouritesTag(favProduct: IFavProduct, newTag: string) {
    return await axios.post("http://127.0.0.1:5000/favourites/edit_tag", { ...favProduct, newTag });
  }

  // TODO: подумай над тем чтобы это стало get с параметром userID
  static async fetchUserFavourites(userID: string) {
    return await axios.post("http://127.0.0.1:5000/favourites/fetch", { userID });
  }
}
