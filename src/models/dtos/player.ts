import { NHLTeamDto } from "./team"

export type NHLPeopleDto = {
    readonly people: NHLPlayerDto[];
}

export type NHLPlayerDto = {
    readonly id: number;
    readonly fullName: string;
    readonly link: string;
    readonly firstName: string,
    readonly lastName: string,
    readonly primaryNumber: string,
    readonly birthDate: string,
    readonly currentAge: string,
    readonly birthCity: string,
    readonly birthStateProvince: string,
    readonly birthCountry: string,
    readonly nationality: string,
    readonly height: string,
    readonly weight: number,
    readonly active: boolean,
    readonly alternateCaptain: boolean,
    readonly captain: boolean,
    readonly rookie: boolean,
    readonly shootsCatches: string,
    readonly rosterStatus: string,
    readonly primaryPosition: NHLPlayerPositionDto;
    readonly currentTeam: Pick<NHLTeamDto, "name" | "id" | 'abbreviation'>
}

export type NHLPlayerPositionDto = {
    readonly abbreviation: string,
    readonly code: string,
    readonly name: string
    readonly type: string
}

export type NHlPlayerSearchDto = {
    readonly id: number;
    readonly lastName: string,
    readonly firstName: string,
    readonly isActive: boolean,
    readonly unknownFlag: boolean,
    readonly height: string,
    readonly weight: number,
    readonly birthPlace: string,
    readonly birthStateProvince: string,
    readonly birthCountry: string,
    readonly birthDate: string,
    readonly currentTeamAbb: string,
    readonly primaryPosition: string,
    readonly primaryNumber: number,
    readonly playerSlug: string;
}
