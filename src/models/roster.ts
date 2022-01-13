import { NHLRosterDto, NHLRosterMemberDto } from "./dtos/roster";
import { NHLPlayerModel, NHLPlayerPositionModel } from "./player"

export type NHLRosterModel = {
    readonly link: string;
    readonly roster: NHLRosterMemberModel[]
}

export namespace NHLRosterModel {
    export function fromDto(dto: NHLRosterDto): NHLRosterModel {
        return { 
            ...dto, 
            roster: [...NHLRosterMemberModel.fromDtos(dto.roster)]
                .sort((a, b) => a.position.type.localeCompare(b.position.type)
                || a.position.code.localeCompare(b.position.code))
        };
    }
}

export type NHLRosterMemberModel = {
    readonly jerseyNumber: string;
    readonly person: NHLPlayerModel;
    readonly position: NHLPlayerPositionModel;
}

export namespace NHLRosterMemberModel {
    export function fromDto({ jerseyNumber, person, position }: NHLRosterMemberDto): NHLRosterMemberModel {
        return {
            jerseyNumber,
            person: NHLPlayerModel.fromDto(person),
            position: NHLPlayerPositionModel.fromDto(position)
        };
    }

    export function* fromDtos(dtos: NHLRosterMemberDto[]): Iterable<NHLRosterMemberModel> {
        for (const dto of dtos) {
            yield fromDto(dto);
        }
    }
}