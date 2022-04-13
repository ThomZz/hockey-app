import React, { SyntheticEvent } from 'react';
import sharedStyles from "../shared/shared.module.css";
import styles from "./scoringPlayCard.module.css";
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../app/routes';
import { NHLLiveFeedModel, NHLLiveFeedPlayModel, NHLLiveFeedPlayPlayerModel } from '../../models/live-feed';

type Props = {
    play: NHLLiveFeedPlayModel;
    liveFeed: NHLLiveFeedModel
}

const ScoringPlayCard: React.FC<Props> = ({ play, liveFeed }) => {

    const scorer = play.players.find(p => p.playerType === "Scorer");
    const assists = play.players.filter(p => p.playerType === "Assist");
    const scorerTeam = liveFeed.gameData.players[`ID${scorer!.player.id}`].currentTeam;
    const homeTeam = liveFeed.liveData.boxscore.teams.home.team;
    const awayTeam = liveFeed.liveData.boxscore.teams.away.team;
    const isScorerHome = homeTeam.id === scorerTeam.id ? true : false;

    const renderGoalPlay = (scorer: NHLLiveFeedPlayPlayerModel, playerTeamId: number) => {
        return (
            <>
                <Link style={{ fontSize: "16px" }} to={AppRoutes.resolvePath(AppRoutes.routes.playerDetails, { id: playerTeamId, playerId: scorer.player.id })}>
                    {scorer.player.fullName} ({scorer.seasonTotal})
                </Link>
            </>
        )
    }

    const renderAssistPlay = (assists: NHLLiveFeedPlayPlayerModel[]) => {
        return (<div style={{ fontSize: "12px" }}>
            {assists.map((player, idx) => {
                const playerTeamId = liveFeed.gameData.players[`ID${player.player.id}`].currentTeam.id;
                return (<Link key={idx} to={AppRoutes.resolvePath(AppRoutes.routes.playerDetails, { id: playerTeamId, playerId: player.player.id })}>
                    <span>{player.player.fullName} ({player.seasonTotal}){idx < assists.length - 1 ? "," : ""}</span>
                </Link>)
            })}
        </div>)
    }

    const onPlayerImgLoadError = (ev: SyntheticEvent<HTMLImageElement, Event>) => {
        ev.currentTarget.src = `/player.png`;
    }

    return (
        <div className={styles["scoring-summary"]}>
            <div className={styles["scoring-summary-card"]}>
                <Link style={{ fontSize: "16px" }} to={AppRoutes.resolvePath(AppRoutes.routes.playerDetails, { id: scorerTeam.id, playerId: scorer!.player.id })}>
                    <img className={sharedStyles["player-img"]} style={{ width: "68px", height: "68px", backgroundImage: 'url("/player-loading.png")' }}
                        loading="lazy" src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${scorer!.player.id}.jpg`} alt={scorer!.player.fullName} onError={onPlayerImgLoadError} />
                </Link>
                <div className={styles["scoring-summary-play"]}>
                    {renderGoalPlay(scorer!, scorerTeam.id)}
                    {renderAssistPlay(assists)}
                    <div style={{ borderColor: isScorerHome ? `var(--team-${homeTeam.id}-color)` : `var(--team-${awayTeam.id}-color)` }} className={styles["scoring-summary-play-details"]}>
                        <div>{play.about.periodTime} / {play.about.ordinalNum}</div>
                        <div style={{ background: isScorerHome ? `var(--team-${homeTeam.id}-color)` : `var(--team-${awayTeam.id}-color)` }} className={styles["scoring-summary-play-details-score"]}>
                            <span style={{ fontWeight: isScorerHome ? "normal" : "bold" }}> {awayTeam.abbreviation} {play.about.goals.away}</span> ,&nbsp;
                            <span style={{ fontWeight: isScorerHome ? "bold" : "normal" }}>{homeTeam.abbreviation} {play.about.goals.home}</span>
                        </div>
                        {play.result.strength.code !== "EVEN" ? <div>{play.result.strength.code}</div> : null}
                    </div>
                </div>
            </div>
        </div>)
}

export default ScoringPlayCard;