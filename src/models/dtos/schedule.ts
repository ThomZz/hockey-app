import { LinkedResourceDto } from "./stats";

export type NHLScheduleGroupDto = {
    readonly dates: NHLScheduleDto[];
    readonly totalEvents: number;
    readonly totalGames: number;
    readonly totalItems: number;
    readonly totalMatches: number;
}

export type NHLScheduleDto = {
    readonly date: string;
    readonly games: NHLGameDto[];
    readonly totalEvents: number;
    readonly totalGames: number;
    readonly totalItems: number;
    readonly totalMatches: number;
}

export type NHLGameDto = {
    readonly gameDate: string;
    readonly gamePk: number;
    readonly gameType: string;
    readonly link: string;
    readonly season: string;
    readonly status: NHLGameStatusDto;
    readonly teams: NHLGameResultDto;
    readonly venue: LinkedResourceDto;
}

export type NHLGameStatusDto = {
    readonly abstractGameState: string;
    readonly odedGameState: string;
    readonly detailedState: string;
    readonly statusCode: string;
    readonly startTimeTBD: boolean;
}

export type NHLGameResultDto = {
    readonly away: any;
    readonly home: any;
}