import { GoalieStatDetailsDto, PlayerStatDetailsDto, StatsSplitDetailsDto, StatsSplitDto } from "./dtos/stats";

export interface LinkedResourceModel {
    name: string;
    link: string;
}

export type StatDetailsModel = PlayerStatDetailsModel | GoalieStatDetailsModel;

export namespace StatDetailsModel {
    export function fromDto(dto: PlayerStatDetailsDto | GoalieStatDetailsDto): StatDetailsModel {
        return { ...dto };
    }
}

export type StatsModel = {
    readonly stats: StatsSplitModel[];
}

export type StatsSplitModel<TStatType = StatDetailsModel> = {
    readonly splits: StatsSplitDetailsModel<TStatType>[];
    readonly summary: TStatType;
}

export namespace StatsSplitModel {
    export function SummarizeStats<TStatType = StatDetailsModel>(stats: StatsSplitDetailsModel<TStatType>[], filter?: (split: StatsSplitDetailsModel<TStatType>) => boolean): TStatType {
        return stats?.reduce((prev, curr) => {
            if (filter && !filter(curr)) return prev;
            for (const key in curr.stat) {
                const k = key as keyof TStatType;
                const source = curr.stat[k] ?? 0;
                const dest = prev[k] ?? 0
                if (typeof source === "number" && typeof dest === "number") {
                    Object.assign(prev, { [key]: dest + source })
                }
            }
            return prev;
        }, {} as TStatType);
    }

    export function fromDto(dto: StatsSplitDto): StatsSplitModel {
        const splits = [...StatsSplitDetailsModel.fromDtos(dto.splits)];
        return {
            splits: splits?.sort((a, b) => +a.season - +b.season),
            summary: SummarizeStats(splits, ({ league }) => league.name === "National Hockey League")
        }
    }
}

export type StatsSplitDetailsModel<TStatType = StatDetailsModel> = {
    readonly season: string;
    readonly stat: TStatType;
    readonly team: LinkedResourceModel;
    readonly league: LinkedResourceModel;
    readonly isNHL?: boolean;
}

export namespace StatsSplitDetailsModel {
    export function fromDto({ season, stat, team, league }: StatsSplitDetailsDto): StatsSplitDetailsModel {
        return {
            team,
            league,
            season: `${season.slice(0, 4)} - ${season.slice(4)}`,
            stat: StatDetailsModel.fromDto(stat),
            isNHL: league.name === "National Hockey League"
        }
    }

    export function* fromDtos(dtos: StatsSplitDetailsDto[]): Iterable<StatsSplitDetailsModel> {
        for (const dto of dtos) {
            yield fromDto(dto);
        }
    }
}

export type PlayerStatDetailsModel = {
    readonly blocked: number
    readonly evenTimeOnIce: string
    readonly faceOffPct: number
    readonly games: number
    readonly gameWinningGoals: number
    readonly goals: number
    readonly assists: number
    readonly hits: number
    readonly overTimeGoals: number
    readonly pim: number
    readonly plusMinus: number
    readonly points: number
    readonly powerPlayGoals: number
    readonly powerPlayPoints: number
    readonly powerPlayTimeOnIce: string
    readonly shifts: number
    readonly shortHandedGoals: number
    readonly shortHandedPoints: number
    readonly shortHandedTimeOnIce: string
    readonly shotPct: number
    readonly shots: number
    readonly timeOnIce: string
}

export type GoalieStatDetailsModel = {
    readonly evenSaves: number;
    readonly evenShots: number;
    readonly evenStrengthSavePercentage: number;
    readonly games: number;
    readonly gamesStarted: number;
    readonly goalAgainstAverage: number;
    readonly goalsAgainst: number;
    readonly wins: number;
    readonly losses: number;
    readonly ot: number;
    readonly powerPlaySavePercentage: number;
    readonly powerPlaySaves: number;
    readonly powerPlayShots: number;
    readonly savePercentage: number;
    readonly saves: number;
    readonly shortHandedSavePercentage: number;
    readonly shortHandedSaves: number;
    readonly shortHandedShots: number;
    readonly shotsAgainst: number;
    readonly shutouts: number;
    readonly ties: number;
    readonly timeOnIce: string;
}