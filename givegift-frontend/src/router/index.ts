import React from "react";
import { Main } from "../pages/Main/Main";
import { Favourite } from "../pages/Favourite/Favourite";

export interface IRoute {
    path: string;
    component: React.ComponentType;
}

export enum RouteNames {
    AUTH = '/auth',
    MAIN = '/',
    FAVOURITE = '/favourite'
}

// Accessed only to authorized users
export const privateRoutes: IRoute[] = [
    { path: RouteNames.MAIN, component: Main },
    { path: RouteNames.FAVOURITE, component: Favourite },
]