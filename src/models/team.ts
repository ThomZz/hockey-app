import { NHLTeamDto } from "./dtos/team";
import { NHLRosterModel } from "./roster"

export type NHLTeamModel = {
    readonly id: number;
    readonly name: string;
    readonly abbreviation: string;
    readonly locationName: string;
    readonly roster?: NHLRosterModel;
}

export namespace NHLTeamModel {
    export function fromDto(dto: NHLTeamDto): NHLTeamModel {
        return { ...dto, roster: dto.roster ? NHLRosterModel.fromDto(dto.roster!) : undefined };
    }

    export function* fromDtos(dtos: NHLTeamDto[]): Iterable<NHLTeamModel> {
        for (const dto of dtos) {
            yield fromDto(dto);
        }
    }
}
