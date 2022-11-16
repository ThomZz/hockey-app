import { NHLPlayerDto, NHLPlayerPositionDto } from "./player";
import { NHLGameStatusDto } from "./schedule";
import { NHLTeamDto } from "./team";

export type NHLLiveFeedDto = {
    gameData: NHLLiveFeedGameDataDto;
    liveData: NHLLiveFeedLiveDataDto;
}

export type NHLLiveFeedGameDataDto = {
    datetime: { dateTime: string };
    status: NHLGameStatusDto,
    teams: NHLLiveFeedTeamsDto;
    players: NHLLiveFeedPlayersDto;
}

export type NHLLiveFeedTeamsDto = {
    away: NHLTeamDto;
    home: NHLTeamDto;
}

export interface NHLLiveFeedPlayersDto extends Record<string, NHLPlayerDto & { currentTeam: NHLTeamDto }> { }

export type NHLLiveFeedLiveDataDto = {
    boxscore: NHLLiveFeedBoxscoreDto;
    linescore: any;
    plays: NHLLiveFeedPlaysDto;
}

export type NHLLiveFeedBoxscoreDto = {
    teams: NHLLiveFeedBoxscoreTeamsDto;
    officials: any;
}

export type NHLLiveFeedBoxscoreTeamsDto = {
    away: NHLLiveFeedBoxscoreTeamDto;
    home: NHLLiveFeedBoxscoreTeamDto;
}

export type NHLLiveFeedBoxscoreTeamDto = {
    team: NHLTeamDto;
    players: Record<string, NHLLiveFeedBoxscorePlayerDto>;
}

export type NHLLiveFeedBoxscorePlayerDto = {
    jerseyNumber: number;
    person: NHLPlayerDto;
    position: NHLPlayerPositionDto;
    stats: NHLLiveFeedBoxscorePlayerStatsDto;
}

export type NHLLiveFeedBoxscorePlayerStatsDto = {
    skaterStats: NHLLiveFeedBoxscoreSkaterStatsDto;
    goalieStats: NHLLiveFeedBoxscoreGoalieStatsDto;
}

export type NHLLiveFeedBoxscoreSkaterStatsDto = {
    timeOnIce: string;
    assists: number;
    goals: number;
    shots: number;
    hits: number;
    powerPlayGoals: number;
    powerPlayAssists: number;
    penaltyMinutes: number;
    faceOffWins: number;
    faceoffTaken: number;
    takeaways: number;
    giveaways: number;
    shortHandedGoals: number;
    shortHandedAssists: number;
    blocked: number;
    plusMinus: number;
    evenTimeOnIce: string;
    powerPlayTimeOnIce: string;
    shortHandedTimeOnIce: string;
}

export type NHLLiveFeedBoxscoreGoalieStatsDto = {
    assists: number;
    decision: string;
    evenSaves: number;
    evenShotsAgainst: number;
    evenStrengthSavePercentage: number;
    goals: number;
    pim: number;
    powerPlaySavePercentage: number;
    powerPlaySaves: number;
    powerPlayShotsAgainst: number;
    savePercentage: number;
    saves: number;
    shortHandedSavePercentage: number;
    shortHandedSaves: number;
    shortHandedShotsAgainst: number;
    shots: number;
    timeOnIce: string;
}

export type NHLLiveFeedPlaysDto = {
    allPlays: NHLLiveFeedPlayDto[];
    scoringPlays: number[];
}

export type NHLLiveFeedPlayDto = {
    about: NHLLiveFeedPlayDetailsDto;
    result: NHLLiveFeedPlayResultDto;
    players: NHLLiveFeedPlayPlayerDto[];
}

export type NHLLiveFeedPlayDetailsDto = {
    dateTime: string;
    eventId: number;
    eventIdx: number;
    goals: { away: number, home: number };
    ordinalNum: string;
    period: string;
    periodTime: string;
    periodTimeRemaining: string;
    periodType: string;
}

export type NHLLiveFeedPlayResultDto = {
    description: string;
    emptyNet: false;
    event: string;
    eventCode: string;
    eventTypeId: string;
    gameWinningGoal: boolean;
    secondaryType: string;
    strength: { code: string, name: string };
}

export type NHLLiveFeedPlayPlayerDto = {
    player: { id: number, fullName: string, link: string }
    playerType: string;
    seasonTotal: string;
}

export type NHLLiveFeedLineScoreResultDetailsDto= {
    readonly goaliePulled: boolean;
    readonly goals: number;
    readonly numSkaters: number;
    readonly powerPlay: boolean;
    readonly shotsOnGoal: number;
    readonly team: NHLTeamDto;
}

export type NHLLiveFeedLineScoreResultDto = {
    readonly away: NHLLiveFeedLineScoreResultDetailsDto
    readonly home: NHLLiveFeedLineScoreResultDetailsDto;
}

export type NHLLiveFeedLineScoreDto = {
    readonly currentPeriod: number;
    readonly currentPeriodOrdinal: string;
    readonly currentPeriodTimeRemaining: string;
    readonly hasShootout: boolean;
    readonly teams: NHLLiveFeedLineScoreResultDto
}