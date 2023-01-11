import axios from "axios";
import { singleton, inject } from "tsyringe";
import { NHlPlayerSearchModel } from "../models/player";
import Logger from "./logger";

@singleton()
export default class NHLSuggestApiService {

  constructor(@inject(Logger) private _logger?: Logger) {  }

  async getMatchingPlayers(nameFragment: string): Promise<NHlPlayerSearchModel[]> {
    this._logger?.info("gettingPlayerSuggestions");
    const result = await axios.get<any>(`https://thomzz.free.mockoapp.net/svc/suggest/v1/minplayers/${nameFragment}/500`);
    return [...NHlPlayerSearchModel.fromRawData(result.data.suggestions)];
  }
}