import React from 'react';
import styles from "./periodSummary.module.css";
import { NHLLiveFeedModel, NHLLiveFeedPlayModel } from '../../models/live-feed';
import ScoringPlayCard from './scoringPlayCard';

type Props = {
    liveFeed: NHLLiveFeedModel;
    period: string;
    periodPlays: NHLLiveFeedPlayModel[];
}
const PeriodSummary: React.FC<Props> = ({ periodPlays, period, liveFeed }) => {

    return (
        <div className={styles["period-summary"]}>
            <div className={styles["period-summary-header"]}>{period} period</div>
            <div className={styles["period-summary-plays"]}>
                {
                    periodPlays.map(p => {
                        return (<ScoringPlayCard key={`${p.about.eventId}-${p.about.period}`}  liveFeed={liveFeed} play={p} />)
                    })
                }
            </div>
        </div>
    )
}

export default PeriodSummary;