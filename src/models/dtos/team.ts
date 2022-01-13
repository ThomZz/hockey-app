import { NHLRosterDto } from "./roster"

export type NHLTeamDto = {
    readonly id: number;
    readonly name: string;
    readonly abbreviation: string;
    readonly locationName: string;
    readonly roster?: NHLRosterDto;
}

export type NHLTeamsDto = {
    readonly teams: NHLTeamDto[];
}