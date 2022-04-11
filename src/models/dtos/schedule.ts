import { LinkedResourceDto } from "./stats";
import { NHLTeamDto } from "./team";

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
    readonly linescore: NHLGameLineScoreDto;
    readonly venue: LinkedResourceDto;
}

export type NHLGameStatusDto = {
    readonly abstractGameState: string;
    readonly codedGameState: string;
    readonly detailedState: string;
    readonly statusCode: string;
    readonly startTimeTBD: boolean;
}

export type NHLGameResultDto = {
    readonly away: any;
    readonly home: any;
}

export type NHLGameLineScoreResultDto = {
    readonly away: NHLGameLineScoreResultDetailsDto;
    readonly home: NHLGameLineScoreResultDetailsDto;
}

export type NHLGameLineScoreResultDetailsDto = {
    readonly goaliePulled: boolean;
    readonly goals: number;
    readonly numSkaters: number;
    readonly powerPlay: boolean;
    readonly shotsOnGoal: number;
    readonly team: NHLTeamDto;
}

export type NHLGameLineScoreDto = {
    readonly currentPeriod:  number;
    readonly currentPeriodOrdinal:  string;
    readonly currentPeriodTimeRemaining: string;
    readonly hasShootout: boolean;
    readonly teams: NHLGameLineScoreResultDto;
}