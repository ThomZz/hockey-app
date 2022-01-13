import React from 'react';
import { NHLGameModel } from '../../models/schedule';
import { DateHelper } from '../../utils/date';
import styles from "./scheduleGames.module.css";
import { SplideSlide } from '@splidejs/react-splide';

const ScheduleGame: React.FC<{ games: NHLGameModel[] }> = ({ games }) => {

    const renderScore = (right: any, left: any) => {
        return (
            <div className={right?.score > left?.score ? styles.emphasis : styles.discrete}>
                <img height="50" width="50" alt="" src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${right?.team.id}.svg`} />
                <div className={styles["team-infos"]}>
                    <span>{right?.team.name}</span>
                    <span className={styles["team-record"]}>({right?.leagueRecord.wins} - {right?.leagueRecord.losses} - {right?.leagueRecord.ot})</span>
                </div>
                <span>{right?.score}</span>
            </div>
        )
    }

    const dateHeader = (previousDate: string, currentDate: string) => {
        const today = DateHelper.toShortString(DateHelper.today());
        const previous = DateHelper.toShortString(new Date(previousDate));
        const current = DateHelper.toShortString(new Date(currentDate));
        if (previous !== current) {
            const isToday = current === today;
            return (
                <div className={isToday ? styles["today-header"] : styles["date-header"]}>
                    {isToday ? `${current} (today)` : current}
                </div>
            )
        }
        return (<div></div>);
    }

    return (
        <>
            {games?.map((game, idx, allGames) => {
                return (
                    <SplideSlide>
                        <div className={styles.container}>
                            {dateHeader(allGames[idx - 1]?.gameDate, game.gameDate)}
                            <div className={styles.card}>
                                <span className={styles.date}>{DateHelper.toString(new Date(game.gameDate), true)}</span>
                                <hr className={styles.separator}></hr>
                                <span className={styles.state}>{game.status?.detailedState}</span>
                                {renderScore(game.results?.home, game.results?.away)}
                                {renderScore(game.results?.away, game.results?.home)}
                            </div>
                        </div>
                    </SplideSlide>
                )

            })}
        </>
    );
}

export default React.memo(ScheduleGame);