import React from 'react';
import { PlayerStatDetailsModel, StatsSplitDetailsModel } from '../../models/stats';

import styles from "./playerStats.module.css";

const RegularStats: React.FC<{ splits: StatsSplitDetailsModel<PlayerStatDetailsModel>[], summary: PlayerStatDetailsModel }> = ({ splits, summary }) => {

    const Summary = () => {
        if (!summary) return (<></>);
        return (
            <tr>
                <td>NHL Totals</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>{summary.games}</td>
                <td>{summary.goals}</td>
                <td>{summary.assists}</td>
                <td>{summary.points}</td>
                <td>{summary.plusMinus}</td>
                <td>{summary.pim}</td>
            </tr>
        )
    }

    return (
        <table style={{ textAlign: "center" }} className={styles.table} cellSpacing="0" cellPadding="0">
            <thead>
                <tr>
                    <th>Season</th>
                    <th>Team</th>
                    <th>League</th>
                    <th>GP</th>
                    <th>G</th>
                    <th>A</th>
                    <th>Pts</th>
                    <th>+/-</th>
                    <th>PIM</th>
                </tr>
            </thead>
            <tbody>
                {splits?.map(({ league, team, season, stat, isNHL }) => {
                    return (
                        <tr key={`${league.name}-${season}-${team.name}`}>
                            <td className={isNHL ? styles["nhl-row"] : ""}>{season}</td>
                            <td>{team.name}</td>
                            <td>{league.name}</td>
                            <td>{stat.games ?? "-"}</td>
                            <td>{stat.goals ?? "-"}</td>
                            <td>{stat.assists ?? "-"}</td>
                            <td>{stat.points ?? "-"}</td>
                            <td>{stat.plusMinus ?? "-"}</td>
                            <td>{stat.pim ?? "-"}</td>
                        </tr>
                    )
                })}
                <Summary/>
            </tbody>
        </table>
    );
}

export default RegularStats;