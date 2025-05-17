export interface IProduct {
    market_link: string;
    title: string;
    img_link: string
}

export interface IFavProduct extends IProduct {
    userID: string
    tag?: Tag
}

export interface IUserIdeaProperties {
    interests: string[];
    price_range: number[];
}

export type Interest = string;
export type Tag = string;
