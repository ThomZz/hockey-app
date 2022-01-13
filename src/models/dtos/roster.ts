import { NHLPlayerDto, NHLPlayerPositionDto } from "./player"

export type NHLRosterDto = {
    readonly link: string;
    readonly roster: NHLRosterMemberDto[]
}

export type NHLRosterMemberDto = {
    readonly jerseyNumber: string;
    readonly person: NHLPlayerDto;
    readonly position: NHLPlayerPositionDto;
}