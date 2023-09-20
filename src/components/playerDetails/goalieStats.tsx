import React from 'react';
import { GoalieStatDetailsModel, StatsSplitDetailsModel } from '../../models/stats';

import styles from "./playerStats.module.css";
import sharedStyles from "../shared/shared.module.css";

const GoalieStats: React.FC<{ splits: StatsSplitDetailsModel<GoalieStatDetailsModel>[], summary: GoalieStatDetailsModel }> = ({ splits, summary }) => {

    const Summary = () => {
        return !summary ? null : (
             <tr className={styles.summary}>
                <td>NHL Totals</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>{summary.games}</td>
                <td>{summary.gamesStarted}</td>
                <td className={styles["points-column"]}>{summary.wins}</td>
                <td>{summary.losses}</td>
                <td>{summary.ties}</td>
                <td>{summary.ot}</td>
                <td>{summary.shotsAgainst}</td>
                <td>{summary.goalsAgainst}</td>
                <td>{summary.goalsAgainst && summary.games ? (summary.goalsAgainst / summary.games).toPrecision(3) : ""}</td>
                <td>{summary.saves}</td>
                <td>{summary.saves && summary.shotsAgainst ? (summary.saves / summary.shotsAgainst).toPrecision(3) : ""}</td>
                <td>{summary.shutouts}</td>
                <td>&nbsp;</td>
            </tr>
        )
    }

    return (
        <table style={{ textAlign: "center" }} className={`${sharedStyles.table} ${styles.table}`} cellSpacing="0" cellPadding="0">
            <thead>
                <tr>
                    <th>Season</th>
                    <th>Team</th>
                    <th>League</th>
                    <th>GP</th>
                    <th>GS</th>
                    <th className={styles["points-column"]}>W</th>
                    <th>L</th>
                    <th>T</th>
                    <th>OT</th>
                    <th>SA</th>
                    <th>GA</th>
                    <th>GAA</th>
                    <th>S</th>
                    <th>SV%</th>
                    <th>SO</th>
                    <th>MIN</th>
                </tr>
            </thead>
            <tbody>
                {splits?.map(({ season, league, team, stat, isNHL }) => {
                    return (
                        <tr className={isNHL ? styles["nhl-row"] : ""} key={`${league.name}-${season}`}>
                            <td>{season}</td>
                            <td>{team.name}</td>
                            <td>{league.name}</td>
                            <td>{stat.games ?? "-"}</td>
                            <td>{stat.gamesStarted ?? "-"}</td>
                            <td className={styles["points-column"]}>{stat.wins ?? "-"}</td>
                            <td>{stat.losses ?? "-"}</td>
                            <td>{stat.ties ?? "-"}</td>
                            <td>{stat.ot ?? "-"}</td>
                            <td>{stat.shotsAgainst ?? "-"}</td>
                            <td>{stat.goalsAgainst ?? "-"}</td>
                            <td>{stat.goalAgainstAverage ?? "-"}</td>
                            <td>{stat.saves ?? "-"}</td>
                            <td>{stat.savePercentage ?? "-"}</td>
                            <td>{stat.shutouts ?? "-"}</td>
                            <td>{stat.timeOnIce ?? "-"}</td>
                        </tr>
                    )
                })}
                <Summary />
            </tbody>
        </table>
    );
}

export default GoalieStats;