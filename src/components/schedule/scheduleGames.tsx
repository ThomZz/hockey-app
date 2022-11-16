import React from 'react';
import { NHLGameLineScoreModel, NHLGameLineScoreResultDetailsModel, NHLGameModel, NHLGameStatusModel } from '../../models/schedule';
import { DateHelper } from '../../utils/date';
import styles from "./scheduleGames.module.css";
import { SplideSlide } from '@splidejs/react-splide';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../app/routes';

const ScheduleGame: React.FC<{ games: NHLGameModel[] }> = ({ games }) => {

    const renderTeamSituation = (isPowerplay: boolean, isGoaliePulled: boolean) => {
        return (
            <>
                {isPowerplay ? (<span className={styles["team-situation"]}>PP</span>) : void 0}
                {isGoaliePulled ? (<span className={styles["team-situation"]}>EN</span>) : void 0}
            </>
        )
    }

    const renderScore = (right: any, left: any, rightLinescore: NHLGameLineScoreResultDetailsModel, game: NHLGameModel) => {
        return (
            <div className={right?.score > left?.score ? styles.emphasis : styles.discrete}>
                <img height="50" width="50" alt="" src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${right?.team.id}.svg`} />
                <div className={styles["team-infos"]}>
                    <span>{right?.team.name}</span>
                    <span className={styles["team-record"]}>({right?.leagueRecord.wins} - {right?.leagueRecord.losses} - {right?.leagueRecord.ot})</span>
                </div>
                <div>
                    {game.status.statusCode === "3" ? renderTeamSituation(rightLinescore?.powerPlay, rightLinescore?.goaliePulled) : void 0}
                </div>
                <span>{right?.score}</span>
            </div>
        )
    }

    const dateHeader = (previousDate: string, currentDate: string) => {
        const previous = DateHelper.toAbbrevShortString(new Date(previousDate));
        const current = DateHelper.toAbbrevShortString(new Date(currentDate));
        if (previous !== current) {
            return (
                <SplideSlide  key={current}>
                    <div className={styles["date-card"]}>
                        {current}
                    </div>
                </SplideSlide>
            )
        }
        return;
    }

    const gameState = (status: NHLGameStatusModel, linescore: NHLGameLineScoreModel) => {
        return (
            <span className={styles.state}>
                {status.statusCode !== "3" ? status.detailedState :
                    linescore.hasShootout ? "Shootout" : `${linescore.currentPeriodOrdinal} - ${linescore.currentPeriodTimeRemaining}`}
            </span>
        )
    }

    return (
        <>
            {games?.map((game, idx, allGames) => {
                return (
                    <>
                        {dateHeader(allGames[idx - 1]?.gameDate, game.gameDate)}
                        <SplideSlide key={`${game.gameDate}-${idx}`}>
                            <div className={styles.container}>
                                <Link className={styles.card} to={AppRoutes.resolvePath(AppRoutes.routes.gameDetails, { gameId: game.gamePk })}>
                                    <span className={styles.date}>{DateHelper.toString(new Date(game.gameDate), true)}</span>
                                    <hr className={styles.separator}></hr>
                                    {gameState(game.status, game.linescore)}
                                    {renderScore(game.results?.home, game.results?.away, game.linescore?.results?.home, game)}
                                    {renderScore(game.results?.away, game.results?.home, game.linescore?.results?.away, game)}
                                </Link>
                            </div>
                        </SplideSlide>
                    </>
                )
            })}
        </>
    );
}

export default React.memo(ScheduleGame);