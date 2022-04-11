import { NHLLiveFeedBoxscoreDto, NHLLiveFeedBoxscoreGoalieStatsDto, NHLLiveFeedBoxscorePlayerDto, NHLLiveFeedBoxscorePlayerStatsDto, NHLLiveFeedBoxscoreSkaterStatsDto, NHLLiveFeedBoxscoreTeamDto, NHLLiveFeedBoxscoreTeamsDto, NHLLiveFeedDto, NHLLiveFeedGameDataDto, NHLLiveFeedLiveDataDto, NHLLiveFeedPlayDetailsDto, NHLLiveFeedPlayDto, NHLLiveFeedPlayersDto, NHLLiveFeedPlayPlayerDto, NHLLiveFeedPlayResultDto, NHLLiveFeedPlaysDto, NHLLiveFeedTeamsDto } from "./dtos/live-feed";
import { NHLPlayerModel, NHLPlayerPositionModel } from "./player";
import { NHLGameStatusModel } from "./schedule";
import { NHLTeamModel } from "./team";

export type NHLLiveFeedModel = {
    gameData: NHLLiveFeedGameDataModel,
    liveData: NHLLiveFeedLiveDataModel
}

export namespace NHLLiveFeedModel {
    export function fromDto(dto: NHLLiveFeedDto): NHLLiveFeedModel {
        return {
            gameData: NHLLiveFeedGameDataModel.fromDto(dto.gameData),
            liveData: dto.liveData
        }
    }
}

export type NHLLiveFeedGameDataModel = {
    datetime: { dateTime: string },
    status: NHLGameStatusModel
    teams: NHLLiveFeedTeamsModel,
    players: NHLLiveFeedPlayersModel
}

export namespace NHLLiveFeedGameDataModel {
    export function fromDto(dto: NHLLiveFeedGameDataDto): NHLLiveFeedGameDataModel {
        return {
            ...dto,
            status: NHLGameStatusModel.fromDto(dto.status),
            teams: NHLLiveFeedTeamsModel.fromDto(dto.teams),
            players: NHLLiveFeedPlayersModel.fromDto(dto.players)
        }
    }
}

export type NHLLiveFeedTeamsModel = {
    away: NHLTeamModel
    home: NHLTeamModel
}

export namespace NHLLiveFeedTeamsModel {
    export function fromDto(dto: NHLLiveFeedTeamsDto): NHLLiveFeedTeamsModel {
        return {
            away: NHLTeamModel.fromDto(dto.away),
            home: NHLTeamModel.fromDto(dto.home)
        }
    }
}

export interface NHLLiveFeedPlayersModel extends Record<string, NHLPlayerModel & { currentTeam: NHLTeamModel }> { }

export namespace NHLLiveFeedPlayersModel {
    export function fromDto(dto: NHLLiveFeedPlayersDto): NHLLiveFeedPlayersModel {
        let result: NHLLiveFeedPlayersModel = {};
        for (const key in dto) {
            result[key] = {
                ...NHLPlayerModel.fromDto(dto[key]),
                currentTeam: NHLTeamModel.fromDto(dto[key].currentTeam)
            }
        }
        return result;
    }
}

export type NHLLiveFeedLiveDataModel = {
    boxscore: NHLLiveFeedBoxscoreModel;
    linescore: NHLLiveFeedBoxscoreModel;
    plays: NHLLiveFeedPlaysModel;
}

export namespace NHLLiveFeedLiveDataModel {
    export function fromDto(dto: NHLLiveFeedLiveDataDto): NHLLiveFeedLiveDataModel {
        return {
            boxscore: NHLLiveFeedBoxscoreModel.fromDto(dto.boxscore),
            linescore: dto.linescore,
            plays: NHLLiveFeedPlaysModel.fromDto(dto.plays)
        }
    }
}

export type NHLLiveFeedBoxscoreModel = {
    teams: NHLLiveFeedBoxscoreTeamsModel,
    officials: any
}

export namespace NHLLiveFeedBoxscoreModel {
    export function fromDto(dto: NHLLiveFeedBoxscoreDto): NHLLiveFeedBoxscoreModel {
        return {
            teams: NHLLiveFeedBoxscoreTeamsModel.fromDto(dto.teams),
            officials: dto.officials
        }
    }
}

export type NHLLiveFeedBoxscoreTeamsModel = {
    away: NHLLiveFeedBoxscoreTeamModel
    home: NHLLiveFeedBoxscoreTeamModel
}

export namespace NHLLiveFeedBoxscoreTeamsModel {
    export function fromDto(dto: NHLLiveFeedBoxscoreTeamsDto): NHLLiveFeedBoxscoreTeamsModel {
        return {
            away: NHLLiveFeedBoxscoreTeamModel.fromDto(dto.away),
            home: NHLLiveFeedBoxscoreTeamModel.fromDto(dto.home)
        }
    }
}

export type NHLLiveFeedBoxscoreTeamModel = {
    team: NHLTeamModel,
    players: Record<string, NHLLiveFeedBoxscorePlayerModel>
}

export namespace NHLLiveFeedBoxscoreTeamModel {
    export function fromDto(dto: NHLLiveFeedBoxscoreTeamDto): NHLLiveFeedBoxscoreTeamModel {
        const players = {} as Record<string, NHLLiveFeedBoxscorePlayerModel>;
        for (const key in dto.players) {
            Object.assign(players[key], NHLLiveFeedBoxscorePlayerModel.fromDto(dto.players[key]))
        }
        return {
            team: NHLTeamModel.fromDto(dto.team),
            players
        }
    }
}

export type NHLLiveFeedBoxscorePlayerModel = {
    jerseyNumber: number;
    person: NHLPlayerModel
    position: NHLPlayerPositionModel,
    stats: NHLLiveFeedBoxscorePlayerStatsModel
}

export namespace NHLLiveFeedBoxscorePlayerModel {
    export function fromDto(dto: NHLLiveFeedBoxscorePlayerDto): NHLLiveFeedBoxscorePlayerModel {
        return {
            ...dto,
            person: NHLPlayerModel.fromDto(dto.person),
            position: NHLPlayerPositionModel.fromDto(dto.position),
            stats: NHLLiveFeedBoxscorePlayerStatsModel.fromDto(dto.stats)
        }
    }
}

export type NHLLiveFeedBoxscorePlayerStatsModel = {
    skaterStats: NHLLiveFeedBoxscoreSkaterStatsModel;
    goalieStats: NHLLiveFeedBoxscoreGoalieStatsModel;
}

export namespace NHLLiveFeedBoxscorePlayerStatsModel {
    export function fromDto(dto: NHLLiveFeedBoxscorePlayerStatsDto): NHLLiveFeedBoxscorePlayerStatsModel {
        return {
            skaterStats: NHLLiveFeedBoxscoreSkaterStatsModel.fromDto(dto.skaterStats),
            goalieStats: NHLLiveFeedBoxscoreGoalieStatsModel.fromDto(dto.goalieStats)
        }
    }
}

export type NHLLiveFeedBoxscoreSkaterStatsModel = {
    timeOnIce: string,
    assists: number,
    goals: number,
    shots: number,
    hits: number,
    powerPlayGoals: number,
    powerPlayAssists: number,
    penaltyMinutes: number,
    faceOffWins: number,
    faceoffTaken: number,
    takeaways: number,
    giveaways: number,
    shortHandedGoals: number,
    shortHandedAssists: number,
    blocked: number,
    plusMinus: number,
    evenTimeOnIce: string,
    powerPlayTimeOnIce: string,
    shortHandedTimeOnIce: string
}

export namespace NHLLiveFeedBoxscoreSkaterStatsModel {
    export function fromDto(dto: NHLLiveFeedBoxscoreSkaterStatsDto): NHLLiveFeedBoxscoreSkaterStatsModel {
        return {
            ...dto
        }
    }
}

export type NHLLiveFeedBoxscoreGoalieStatsModel = {
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

export namespace NHLLiveFeedBoxscoreGoalieStatsModel {
    export function fromDto(dto: NHLLiveFeedBoxscoreGoalieStatsDto): NHLLiveFeedBoxscoreGoalieStatsModel {
        return {
            ...dto
        }
    }
}

export type NHLLiveFeedPlaysModel = {
    allPlays: NHLLiveFeedPlayModel[];
    scoringPlays: number[];
}

export namespace NHLLiveFeedPlaysModel {
    export function fromDto(dto: NHLLiveFeedPlaysDto): NHLLiveFeedPlaysModel {
        return {
            scoringPlays: dto.scoringPlays,
            allPlays: [...NHLLiveFeedPlayModel.fromDtos(dto.allPlays)]
        }
    }
}

export type NHLLiveFeedPlayModel = {
    about: NHLLiveFeedPlayDetailsModel;
    result: NHLLiveFeedPlayResultModel;
    players: NHLLiveFeedPlayPlayerModel[];
}

export namespace NHLLiveFeedPlayModel {
    export function fromDto(dto: NHLLiveFeedPlayDto): NHLLiveFeedPlayModel {
        return {
            about: NHLLiveFeedPlayDetailsModel.fromDto(dto.about),
            result: NHLLiveFeedPlayResultModel.fromDto(dto.result),
            players: [...NHLLiveFeedPlayPlayerModel.fromDtos(dto.players)]
        }
    }

    export function* fromDtos(dtos: NHLLiveFeedPlayDto[]): Iterable<NHLLiveFeedPlayModel> {
        for (const dto of dtos) {
            yield fromDto(dto)
        }
    }
}

export type NHLLiveFeedPlayDetailsModel = {
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

export namespace NHLLiveFeedPlayDetailsModel {
    export function fromDto(dto: NHLLiveFeedPlayDetailsDto): NHLLiveFeedPlayDetailsModel {
        return {
            ...dto
        }
    }
}

export type NHLLiveFeedPlayResultModel = {
    description: string;
    emptyNet: false;
    event: string;
    eventCode: string;
    eventTypeId: string;
    gameWinningGoal: boolean;
    secondaryType: string;
    strength: { code: string, name: string };
}

export namespace NHLLiveFeedPlayResultModel {
    export function fromDto(dto: NHLLiveFeedPlayResultDto): NHLLiveFeedPlayResultModel {
        return {
            ...dto
        }
    }
}

export type NHLLiveFeedPlayPlayerModel = {
    player: { id: number, fullName: string, link: string }
    playerType: string;
    seasonTotal: string;
}

export namespace NHLLiveFeedPlayPlayerModel {
    export function fromDto(dto: NHLLiveFeedPlayPlayerDto): NHLLiveFeedPlayPlayerModel {
        return {
            ...dto
        }
    }

    export function* fromDtos(dtos: NHLLiveFeedPlayPlayerDto[]): Iterable<NHLLiveFeedPlayPlayerModel> {
        for (const dto of dtos) {
            yield fromDto(dto)
        }
    }
}

