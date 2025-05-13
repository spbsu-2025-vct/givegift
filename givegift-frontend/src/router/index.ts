/*
    There are two types of routes:
    1. Public routes - routes that are accessible to everyone, regardless of authentication status 
    (there are no public routes in this app, but can be extended to it).
    2. Private routes - routes that are only accessible to authenticated users.
    TODO: избранное тоже должно быть приватным
*/

import React from "react";
import { Main } from "../pages/Main/Main";

export interface IRoute {
    path: string;
    component: React.ComponentType;
}

export enum RouteNames {
    AUTH = '/auth',
    MAIN = '/'
}

export const privateRoutes: IRoute[] = [
    { path: RouteNames.MAIN, component: Main }
]