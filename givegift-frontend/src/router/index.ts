import React from "react";
import { Main } from "../pages/Main/Main";
import { Favourites } from "../pages/Favourites/Favourites";

export interface IRoute {
    path: string;
    component: React.ComponentType;
}

export enum RouteNames {
    AUTH = '/auth',
    MAIN = '/',
    FAVOURITES = '/favourites'
}

// Accessed only to authorized users
export const privateRoutes: IRoute[] = [
    { path: RouteNames.MAIN, component: Main },
    { path: RouteNames.FAVOURITES, component: Favourites },
]