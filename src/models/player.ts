import { NHLPlayerDto, NHLPlayerPositionDto, NHlPlayerSearchDto } from "./dtos/player"
import { NHLTeamModel } from "./team";

export type NHLPlayerModel = {
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
    readonly primaryPosition: NHLPlayerPositionModel;
    readonly currentTeam: Pick<NHLTeamModel, "name" | "id" | "abbreviation">;
}

export namespace NHLPlayerModel {
    export function fromDto(dto: NHLPlayerDto): NHLPlayerModel {
        return {
            ...dto,
            primaryPosition: NHLPlayerPositionModel.fromDto(dto.primaryPosition)
        };
    }
}

export type NHLPlayerPositionModel = {
    readonly abbreviation: string,
    readonly code: string,
    readonly name: string
    readonly type: string
}

export namespace NHLPlayerPositionModel {
    export function fromDto(dto: NHLPlayerPositionDto): NHLPlayerPositionModel {
        return { ...dto };
    }
}

export type NHlPlayerSearchModel = {
    readonly playerId: number,
    readonly name: string,
    readonly positionCode: string,
    readonly teamId?: number,
    readonly teamAbbrev?: string,
    readonly lastTeamId?: number,
    readonly lastTeamAbbrev?: string,
    readonly lastSeasonId?: number,
    readonly sweaterNumber?: number,
    readonly active: boolean,
    readonly height: string,
    readonly heightInCentimeters: number,
    readonly weightInPounds: number,
    readonly weightInKilograms: number,
    readonly birthCity: string,
    readonly birthStateProvince: string,
    readonly birthCountry: string
}

export namespace NHlPlayerSearchModel {
    
    export function* fromDtos(dtos: NHlPlayerSearchDto[]): Iterable<NHlPlayerSearchModel> {
        for (const data of dtos) {
            yield fromDto(data)
        }
    }

    export function fromDto(dto: NHlPlayerSearchDto): NHlPlayerSearchModel {
        return {
            ...dto,
            playerId: Number(dto.playerId),
            teamId: dto.teamId ? Number(dto.teamId) : undefined,
            lastTeamId: dto.lastTeamId ? Number(dto.lastTeamId) : undefined,
            lastSeasonId: dto.lastSeasonId ? Number(dto.lastSeasonId) : undefined
        }
    }
}
