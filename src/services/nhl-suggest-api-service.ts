import axios from "axios";
import { singleton, inject } from "tsyringe";
import { NHlPlayerSearchDto } from "../models/dtos/player";
import { NHlPlayerSearchModel } from "../models/player";
import Logger from "./logger";

@singleton()
export default class NHLSuggestApiService {

  constructor(@inject(Logger) private _logger?: Logger) {  }

  async getMatchingPlayers(nameFragment: string): Promise<NHlPlayerSearchModel[]> {
    this._logger?.info("gettingPlayerSuggestions");
    const result = await axios.get<NHlPlayerSearchDto[]>(`https://search.d3.nhle.com/api/v1/search/player?culture=en-us&limit=500&q=${nameFragment}`);
    return [...NHlPlayerSearchModel.fromDtos(result.data)];
  }
}