import { NHLPlayerDto, NHLPlayerPositionDto } from "./dtos/player"
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

export namespace NHlPlayerSearchModel {
    
    export function* fromRawData(rawData: string[]): Iterable<NHlPlayerSearchModel> {
        for (const data of rawData) {
            yield fromDataLine(data)
        }
    }

    export function fromDataLine(rawData: string): NHlPlayerSearchModel {
        const properties = rawData.split('|');
        return {
            id: Number(properties[0]),
            lastName: properties[1],
            firstName: properties[2],
            isActive: !!Number(properties[3]),
            unknownFlag: !!Number(properties[4]),
            height: properties[5],
            weight: Number(properties[6]),
            birthPlace: properties[7],
            birthStateProvince: properties[8],
            birthCountry: properties[9],
            birthDate: properties[10],
            currentTeamAbb: properties[11],
            primaryPosition: properties[12],
            primaryNumber: Number(properties[13]),
            playerSlug: properties[14]
        }
    }
}
