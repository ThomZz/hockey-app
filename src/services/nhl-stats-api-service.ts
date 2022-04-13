import { inject, singleton } from "tsyringe";
import axios from 'axios';

import Logger from "./logger";
import { NHLTeamsDto } from "../models/dtos/team";
import { NHLPeopleDto } from "../models/dtos/player";
import { StatsDto } from "../models/dtos/stats";
import { StatsSplitModel } from "../models/stats";
import { NHLPlayerModel } from "../models/player";
import { NHLTeamModel } from "../models/team";
import { NHLScheduleGroupModel } from "../models/schedule";
import { NHLScheduleGroupDto } from "../models/dtos/schedule";
import { NHLLiveFeedDto } from "../models/dtos/live-feed";
import { NHLLiveFeedModel } from "../models/live-feed";

@singleton()
export default class NHLStatsApiService {

  constructor(@inject(Logger) private _logger?: Logger) {  }

  async getTeams(): Promise<NHLTeamModel[]> {
    this._logger?.info("gettingTeams");
    const result = await axios.get<NHLTeamsDto>(`https://statsapi.web.nhl.com/api/v1/teams`);
    return [...NHLTeamModel.fromDtos(result.data.teams)];
  }

  async getTeamDetails(teamId: number): Promise<NHLTeamModel> {
    this._logger?.info(`getting team ${teamId} details`);
    const result = await axios.get<NHLTeamsDto>(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}?expand=team.roster`);
    const [team] = result.data.teams;
    return NHLTeamModel.fromDto(team);
  }

  async getSchedule(startDate: string, endDate: string, teamId?: number, ): Promise<NHLScheduleGroupModel> {
    const result = await axios.get<NHLScheduleGroupDto>(`https://statsapi.web.nhl.com/api/v1/schedule?${teamId ? `teamId=${teamId}&` : ""}startDate=${startDate}&endDate=${endDate}&expand=schedule.linescore`);
    return NHLScheduleGroupModel.fromDto(result.data);
  }

  async getGameDetails(gameId: string): Promise<NHLLiveFeedModel> {
    const result = await axios.get<NHLLiveFeedDto>(`https://statsapi.web.nhl.com/api/v1/game/${gameId}/feed/live`);
    return NHLLiveFeedModel.fromDto(result.data);
  }

  async getPlayerDetails(playerId: number): Promise<NHLPlayerModel> {
    const result = await axios.get<NHLPeopleDto>(`https://statsapi.web.nhl.com/api/v1/people/${playerId}`);
    const [player] = result.data.people;
    return NHLPlayerModel.fromDto(player);
  }

  async getPlayerStats(playerId: number): Promise<StatsSplitModel> {
    const result = await axios.get<StatsDto>(`https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=yearByYear`);
    const [stats] = result.data.stats;
    return StatsSplitModel.fromDto(stats);
  }
}
