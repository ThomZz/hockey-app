import { DateHelper } from "../utils/date";
import { NHLGameDto, NHLGameLineScoreDto, NHLGameLineScoreResultDetailsDto, NHLGameLineScoreResultDto, NHLGameResultDto, NHLGameStatusDto, NHLScheduleDto, NHLScheduleGroupDto } from "./dtos/schedule";
import { LinkedResourceModel } from "./stats";
import { NHLTeamModel } from "./team";

export type NHLScheduleGroupModel = {
    readonly dates: NHLScheduleModel[];
    readonly totalEvents: number;
    readonly totalGames: number;
    readonly totalItems: number;
    readonly totalMatches: number;
}

export namespace NHLScheduleGroupModel {
    export function fromDto(dto: NHLScheduleGroupDto): NHLScheduleGroupModel {
        return {
            ...dto,
            dates: [...NHLScheduleModel.fromDtos(dto.dates)]
        }
    }

    export function FindNearestGameIndex({ dates: schedules  }: NHLScheduleGroupModel): number {
        if (schedules?.length) {
                const today = DateHelper.today();
                const closest =  DateHelper.closest(today,  schedules, (i) => new Date(i.timestamp));
                return schedules.reduce((prev, curr) => {
                    return curr.timestamp < closest.getTime() ? prev += (curr.games?.length ?? 0)  + 1 : prev;
                }, 0);
        }
        return 0;
    }
}

export type NHLScheduleModel = {
    readonly date: string;
    readonly timestamp: number;
    readonly games: NHLGameModel[];
    readonly totalEvents: number;
    readonly totalGames: number;
    readonly totalItems: number;
    readonly totalMatches: number;
}

export namespace NHLScheduleModel {
    export function fromDto(dto: NHLScheduleDto): NHLScheduleModel {
        return {
            ...dto,
            timestamp: new Date(dto.date).getTime(),
            games: [...NHLGameModel.fromDtos(dto.games)]
        };
    }

    export function* fromDtos(dtos: NHLScheduleDto[]): Iterable<NHLScheduleModel> {
        for (const dto of dtos) {
            yield fromDto(dto);
        }
    }
}

export type NHLGameModel = {
    readonly gameDate: string;
    readonly gamePk: number;
    readonly gameType: string;
    readonly link: string;
    readonly season: string;
    readonly status: NHLGameStatusModel;
    readonly results: NHLGameResultModel;
    readonly linescore: NHLGameLineScoreModel;
    readonly venue: LinkedResourceModel;
}

export namespace NHLGameModel {
    export function fromDto(dto: NHLGameDto): NHLGameModel {
        return {
            ...dto,
            status: NHLGameStatusModel.fromDto(dto.status),
            results: NHLGameResultModel.fromDto(dto.teams),
            linescore: NHLGameLineScoreModel.fromDto(dto.linescore)
        };
    }

    export function* fromDtos(dtos: NHLGameDto[]): Iterable<NHLGameModel> {
        for (const dto of dtos) {
            yield fromDto(dto);
        }
    }
}

export type NHLGameStatusModel = {
    readonly abstractGameState: string;
    readonly codedGameState: string;
    readonly detailedState: string;
    readonly statusCode: string;
    readonly startTimeTBD: boolean;
}

export namespace NHLGameStatusModel {
    export function fromDto(dto: NHLGameStatusDto): NHLGameStatusModel {
        return { ...dto };
    }
}

export type NHLGameResultModel = {
    readonly away: any;
    readonly home: any;
}

export namespace NHLGameResultModel {
    export function fromDto(dto: NHLGameResultDto): NHLGameResultModel {
        return { ...dto };
    }
}

export type NHLGameLineScoreResultModel = {
    readonly away: NHLGameLineScoreResultDetailsModel;
    readonly home: NHLGameLineScoreResultDetailsModel;
}

export namespace NHLGameLineScoreResultModel {
    export function fromDto(dto: NHLGameLineScoreResultDto): NHLGameLineScoreResultModel {
        return {
            away: NHLGameLineScoreResultDetailsModel.fromDto(dto.away),
            home: NHLGameLineScoreResultDetailsModel.fromDto(dto.home)
        };
    }
}

export type NHLGameLineScoreResultDetailsModel = {
    readonly goaliePulled: boolean;
    readonly goals: number;
    readonly numSkaters: number;
    readonly powerPlay: boolean;
    readonly shotsOnGoal: number;
    readonly team: NHLTeamModel;
}

export namespace NHLGameLineScoreResultDetailsModel {
    export function fromDto(dto: NHLGameLineScoreResultDetailsDto): NHLGameLineScoreResultDetailsModel {
        return {
            ...dto,
            team: NHLTeamModel.fromDto(dto.team)
        };
    }
}

export type NHLGameLineScoreModel = {
    readonly currentPeriod: number;
    readonly currentPeriodOrdinal: string;
    readonly currentPeriodTimeRemaining: string;
    readonly hasShootout: boolean;
    readonly results: NHLGameLineScoreResultModel;
}

export namespace NHLGameLineScoreModel {
    export function fromDto(dto: NHLGameLineScoreDto): NHLGameLineScoreModel {
        return {
            ...dto,
            results: NHLGameLineScoreResultModel.fromDto(dto.teams)
        };
    }
}