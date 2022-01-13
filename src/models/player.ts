import { NHLPlayerDto, NHLPlayerPositionDto } from "./dtos/player"

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
    readonly primaryPosition: NHLPlayerPositionModel
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