export type AppRouteParams = Record<string, string | number>

export interface AppRoute {
    readonly parent?: AppRoute;
    readonly path: string
}

type RouteName = "home" | "playersSearch" | "teamDetails" | "playerDetails" | "gameDetails";

export namespace AppRoutes {
    const home = { path: "/" };
    const playersSearch = { path: "/playersSearch/:nameLike"}
    const teamDetails = { path: "/teams/:id" };
    const playerDetails = { path: "/players/:playerId" };
    const gameDetails = { path: "/games/:gameId" };

    export const routes: Record<RouteName, AppRoute> = {
        home,
        playersSearch: playersSearch,
        teamDetails,
        playerDetails,
        gameDetails
    }

    function parseRoutePath(path: string, params?: AppRouteParams): string {
        for (const key in params) {
            path = path.replace(`:${key}`, params[key]?.toString());
        }
        return path;
    }

    function resolve(route: AppRoute, buffer: string, params?: AppRouteParams): string {
        if (route.parent) {
            buffer = parseRoutePath(route.parent.path, params) + buffer;
            resolve(route.parent, buffer, params);
        }
        return buffer;
    }

    export function resolvePath(route: RouteName | AppRoute, params?: AppRouteParams): string {
        route = typeof route === "string" ? routes[route] : route;
        const builtPath = parseRoutePath(route.path, params);
        return resolve(route, builtPath, params);
    }
}