import React from 'react';
import styles from "./gameSummary.module.css"
import { NHLLiveFeedModel, NHLLiveFeedPlayModel } from '../../models/live-feed';
import groupBy from 'lodash.groupby';
import PeriodSummary from './periodSummary';

type Props = {
    liveFeed: NHLLiveFeedModel
}
const GameSummary: React.FC<Props> = ({ liveFeed  }) => {
    const { plays } = liveFeed.liveData;
    const scoringPlays = plays.scoringPlays.reduce<NHLLiveFeedPlayModel[]>((prev, curr) => {
        const play = plays.allPlays[curr];
        prev.push(play);
        return prev;
    }, []);
    const scoringPlaysByPeriod = groupBy<NHLLiveFeedPlayModel>(scoringPlays, (p) => p.about.ordinalNum);
    return (<div className={styles.summary}>
        {Object.entries(scoringPlaysByPeriod).sort(([a], [b]) => +a - +b).map(([period, plays], idx) => { 
            return (<PeriodSummary key={idx}  periodPlays={plays} period={period} liveFeed={liveFeed} />)
        })}
        </div>)
}

export default GameSummary;