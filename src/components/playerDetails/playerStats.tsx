import React from 'react';
import { NHLPlayerModel } from '../../models/player';
import { GoalieStatDetailsModel, PlayerStatDetailsModel, StatDetailsModel, StatsSplitDetailsModel, StatsSplitModel } from '../../models/stats';

import GoalieStats from './goalieStats';
import styles from "./playerStats.module.css";
import RegularStats from './regularStats';

const PlayerStats: React.FC<{ player: NHLPlayerModel, stats: StatsSplitModel<StatDetailsModel> }> = ({ player, stats }) => {

    const statsGrid = player?.primaryPosition?.code === "G" ?
        <GoalieStats summary={stats.summary as GoalieStatDetailsModel} splits={stats.splits as StatsSplitDetailsModel<GoalieStatDetailsModel>[]} /> :
        <RegularStats summary={stats.summary as PlayerStatDetailsModel} splits={stats.splits as StatsSplitDetailsModel<PlayerStatDetailsModel>[]} />

    return (
        <div className={styles.stats}>
            <h2>Stats</h2>
            <div className={styles.container}>
                {statsGrid}
            </div>
        </div>
    );
}

export default PlayerStats;