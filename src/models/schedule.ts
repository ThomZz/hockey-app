import { DateHelper } from "../utils/date";
import { NHLGameDto, NHLGameResultDto, NHLGameStatusDto, NHLScheduleDto, NHLScheduleGroupDto } from "./dtos/schedule";
import { LinkedResourceModel } from "./stats";

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

    export function FindNearestGameIndex({ dates }: NHLScheduleGroupModel): number {
        const today = DateHelper.today();
        const dts = dates.map(d => new Date(`${d.date}:`));
        if (dts?.length) {
            const closest = DateHelper.closest(today, dts);
            if (closest) {
                const dateStr = DateHelper.toString(closest);
                let idx = 0;
                dates.every((s) => {
                    if (s.date === dateStr) return false;
                    else {
                        idx += s.games?.length ?? 0;
                        return true;
                    }
                });
                return idx;
            }
        }
        return 0;
    }
}

export type NHLScheduleModel = {
    readonly date: string;
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
    readonly venue: LinkedResourceModel;
}

export namespace NHLGameModel {
    export function fromDto(dto: NHLGameDto): NHLGameModel {
        return {
            ...dto,
            status: NHLGameStatusModel.fromDto(dto.status),
            results: NHLGameResultModel.fromDto(dto.teams),
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
    readonly odedGameState: string;
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