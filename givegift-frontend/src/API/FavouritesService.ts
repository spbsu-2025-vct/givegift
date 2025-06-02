import axios from "axios";
import type { IFavProduct } from "../types";

export default class FavouritesService {
  static async addToFavourites(favProduct: IFavProduct) {
    return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/favourites/add`, favProduct);
  }

  static async removeFromFavourites(favProduct: IFavProduct) {
    return await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/favourites/remove`, { params: { userID: favProduct.userID, market_link: favProduct.market_link } });
  }

  static async editFavouritesTag(favProduct: IFavProduct, newTag: string) {
    return await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/favourites/edit_tag`,
      { tag: newTag },
      { params: { userID: favProduct.userID, market_link: favProduct.market_link } }
    );
  }

  static async fetchUserFavourites(userID: string) {
    return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/favourites/fetch`, { params: { userID } });
  }
}
