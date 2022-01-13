export interface LinkedResourceDto {
    name: string;
    link: string;
}

export type StatsSplitDetailsDto = {
    readonly season: string;
    readonly stat: PlayerStatDetailsDto | GoalieStatDetailsDto;
    readonly team: LinkedResourceDto;
    readonly league: LinkedResourceDto;
}

export type StatsSplitDto = {
    readonly splits: StatsSplitDetailsDto[]
}

export type StatsDto = {
    readonly stats: StatsSplitDto[];
}

export type PlayerStatDetailsDto = {
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

export type GoalieStatDetailsDto = {
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