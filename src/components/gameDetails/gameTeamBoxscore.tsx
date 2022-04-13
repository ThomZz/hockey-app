import React from 'react';
import styles from "./gameTeamBoxscore.module.css"
import sharedStyles from "../shared/shared.module.css";
import groupBy from 'lodash.groupby';
import { NHLLiveFeedBoxscorePlayerModel, NHLLiveFeedBoxscoreTeamModel } from '../../models/live-feed';

type Props = {
    boxscore: NHLLiveFeedBoxscoreTeamModel
}
const GameTeamBoxscore: React.FC<Props> = ({ boxscore }) => {

    const players = Object.entries(boxscore.players).flatMap(([_, player]) => player)
    const grouped = groupBy(players, (p) => p.position.type);

    const renderBoxscoreGoalieStats = (position: string, goalies: NHLLiveFeedBoxscorePlayerModel[]) => {
        return (
            <>
                <thead>
                    <tr>
                        <th style={{ width: "200px" }}>{position}</th>
                        <th>G</th>
                        <th>A</th>
                        <th>PP</th>
                        <th>SH</th>
                        <th>SAVES</th>
                        <th>SV%</th>
                        <th>PIM</th>
                        <th>TOI</th>
                    </tr>
                </thead>
                <tbody>
                    {goalies.sort((a, b) => a.jerseyNumber - b.jerseyNumber).map((g, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{g.jerseyNumber}&nbsp;&nbsp;{g.person.fullName}</td>
                                <td>{g.stats.goalieStats.goals}</td>
                                <td>{g.stats.goalieStats.assists}</td>
                                <td>{g.stats.goalieStats.powerPlaySaves}</td>
                                <td>{g.stats.goalieStats.shortHandedSaves}</td>
                                <td>{g.stats.goalieStats.saves}</td>
                                <td>{((g.stats.goalieStats.savePercentage ?? 0) / 100).toFixed(3).substr(1)}</td>
                                <td>{g.stats.goalieStats.pim}</td>
                                <td>{g.stats.goalieStats.timeOnIce}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </>
        )
    }

    const renderBoxscoreSkaterStats = (position: string, players: NHLLiveFeedBoxscorePlayerModel[]) => {
        return (
            <>
                <thead>
                    <tr>
                        <th style={{ width: "200px" }}>{position}</th>
                        <th>G</th>
                        <th>A</th>
                        <th>+/-</th>
                        <th>SOG</th>
                        <th>HITS</th>
                        <th>BLKS</th>
                        <th>PIM</th>
                        <th>TOI</th>
                    </tr>
                </thead>
                <tbody>
                    {players.sort((a, b) => a.jerseyNumber - b.jerseyNumber).map((p, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{p.jerseyNumber}&nbsp;&nbsp;{p.person.fullName}</td>
                                <td>{p.stats.skaterStats?.goals}</td>
                                <td>{p.stats.skaterStats?.assists}</td>
                                <td>{p.stats.skaterStats?.plusMinus}</td>
                                <td>{p.stats.skaterStats?.shots}</td>
                                <td>{p.stats.skaterStats?.hits}</td>
                                <td>{p.stats.skaterStats?.blocked}</td>
                                <td>{p.stats.skaterStats?.penaltyMinutes}</td>
                                <td>{p.stats.skaterStats?.timeOnIce}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </>
        )
    }

    return (<>
        {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([position, players], idx) => {
            return (<table key={idx} className={`${sharedStyles.table} ${styles.table}`}>
                {position === "Goalie" ? renderBoxscoreGoalieStats(position, players) : position !== "Unknown" ? renderBoxscoreSkaterStats(position, players) : void 0}
            </table>)
        })}
    </>);
}

export default GameTeamBoxscore;