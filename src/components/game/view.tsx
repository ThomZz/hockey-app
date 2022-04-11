import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector, useDocumentTitle } from '../../app/hooks';
import sharedStyles from "../shared/shared.module.css";
import styles from "./game.module.css";
import { getLiveFeedDetails } from '../../features/live-feed/slice';
import { Link, useParams } from 'react-router-dom';
import { DateHelper } from '../../utils/date';
import Tabs from '../tabs/tabs';
import groupBy from 'lodash.groupby';
import { NHLLiveFeedBoxscorePlayerModel, NHLLiveFeedBoxscoreTeamModel, NHLLiveFeedModel, NHLLiveFeedPlayModel, NHLLiveFeedPlayPlayerModel } from '../../models/live-feed';
import { AppRoutes } from '../../app/routes';

const GameLiveFeedView: React.FC<{ title: string }> = ({ title }) => {
    useDocumentTitle(title);

    const [titles, setTitles] = useState([] as string[]);
    const [activeTab, setActiveTab] = useState(0);

    const dispatch = useAppDispatch();
    const { liveFeed, loading } = useAppSelector(state => state.liveFeed);
    const { gameId } = useParams<{ gameId: string }>();

    useEffect(() => {
        const fetch = async () => {
            const { payload } = await dispatch(getLiveFeedDetails(gameId));
            const { gameData: { teams } } = payload as NHLLiveFeedModel;
            setTitles(["Summary", teams.away.name, teams.home.name]);
        }
        if (liveFeed !== {} as any) fetch();
    }, []);

    const onTabActivated = (tabIdx: number) => {
        setActiveTab(tabIdx);
    }

    const renderContent = () => {
        if (+liveFeed.gameData.status.statusCode < 3) {
            return renderNoGameData();
        }
        return renderTabs();
    }

    const renderNoGameData = () => {
        return (
            <div className={styles["no-game-data"]}>
                <span>No game data available.</span>
            </div>
        );
    }

    const renderTabs = () => {
        return (
            <div className={styles.tabs}>
                <Tabs titles={titles} onTabActivated={onTabActivated} />
                <div className={`${styles.content} ${activeTab !== 0 ? styles["tab-content"] : ""}`}>
                    {renderTabContent()}
                </div>
            </div>
        );
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 0:
                return renderSummary();
            case 1:
                return renderBoxscore(liveFeed.liveData.boxscore.teams.away);
            case 2:
                return renderBoxscore(liveFeed.liveData.boxscore.teams.home);
        }
    }

    const renderSummary = () => {
        const { plays } = liveFeed.liveData;
        const scoringPlays = plays.scoringPlays.reduce<NHLLiveFeedPlayModel[]>((prev, curr) => {
            const play = plays.allPlays[curr];
            prev.push(play);
            return prev;
        }, []);
        return (<div className={styles.summary}>
            {scoringPlays.map((p) => {
                const scorer = p.players.find(p => p.playerType === "Scorer");
                const assists = p.players.filter(p => p.playerType === "Assist");
                const scorerTeam = liveFeed.gameData.players[`ID${scorer!.player.id}`].currentTeam;
                const homeTeam = liveFeed.liveData.boxscore.teams.home.team;
                const awayTeam = liveFeed.liveData.boxscore.teams.away.team;
                const isScorerHome = homeTeam.id === scorerTeam.id ? true : false;
                return (<div className={styles["scoring-summary"]}>
                    <div className={styles["scoring-summary-card"]}>
                        <Link style={{ fontSize: "16px" }} to={AppRoutes.resolvePath(AppRoutes.routes.playerDetails, { id: scorerTeam.id, playerId: scorer!.player.id })}>
                            <img className={sharedStyles["player-img"]} style={{ width: "68px", height: "68px", backgroundImage: 'url("/player-loading.png")' }}
                                loading="lazy" src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${scorer!.player.id}.jpg`} alt={scorer!.player.fullName} />
                        </Link>
                        <div className={styles["scoring-summary-play"]}>
                            {renderGoalPlay(scorer!, scorerTeam.id)}
                            {renderAssistPlay(assists)}
                            <div style={{ borderColor: isScorerHome ? `var(--team-${homeTeam.id}-color)` : `var(--team-${awayTeam.id}-color)` }} className={styles["scoring-summary-play-details"]}>
                                <div>{p.about.periodTime} / {p.about.ordinalNum}</div>
                                <div style={{ background: isScorerHome ? `var(--team-${homeTeam.id}-color)` : `var(--team-${awayTeam.id}-color)` }} className={styles["scoring-summary-play-details-score"]}>
                                    <span style={{ fontWeight: isScorerHome ? "normal" : "bold" }}> {awayTeam.abbreviation} {p.about.goals.away}</span> ,&nbsp;
                                    <span style={{ fontWeight: isScorerHome ? "bold" : "normal" }}>{homeTeam.abbreviation} {p.about.goals.home}</span>
                                </div>
                                {p.result.strength.code !== "EVEN" ? <div>{p.result.strength.code}</div> : null}
                            </div>
                        </div>
                    </div>
                </div>)
            })}
        </div>);
    }

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
            {assists.map((player, idx)=> {
                const playerTeamId = liveFeed.gameData.players[`ID${player.player.id}`].currentTeam.id;
                return (<Link to={AppRoutes.resolvePath(AppRoutes.routes.playerDetails, { id: playerTeamId, playerId: player.player.id })}>
                    <span>{player.player.fullName} ({player.seasonTotal}){idx < assists.length - 1 ? "," : ""}</span>
                </Link>)
            })}
        </div>)
    }

    const renderBoxscore = (boxscore: NHLLiveFeedBoxscoreTeamModel) => {
        const players = Object.entries(boxscore.players).flatMap(([_, player]) => player)
        const grouped = groupBy(players, (p) => p.position.type);
        return (<>
            {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([position, players]) => {
                return (<table className={`${sharedStyles.table} ${styles.table}`}>
                    {position === "Goalie" ? renderBoxscoreGoalieStats(position, players) : position !== "Unknown" ? renderBoxscoreSkaterStats(position, players) : void 0}
                </table>)
            })}
        </>);
    }

    const renderBoxscoreGoalieStats = (position: string, goalies: NHLLiveFeedBoxscorePlayerModel[]) => {
        return (
            <>
                <thead>
                    <th style={{ width: "200px" }}>{position}</th>
                    <th>G</th>
                    <th>A</th>
                    <th>PP</th>
                    <th>SH</th>
                    <th>SAVES</th>
                    <th>SV%</th>
                    <th>PIM</th>
                    <th>TOI</th>
                </thead>
                <tbody>
                    {goalies.sort((a, b) => a.jerseyNumber - b.jerseyNumber).map((g) => {
                        return (
                            <tr>
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
                    <th style={{ width: "200px" }}>{position}</th>
                    <th>G</th>
                    <th>A</th>
                    <th>+/-</th>
                    <th>SOG</th>
                    <th>HITS</th>
                    <th>BLKS</th>
                    <th>PIM</th>
                    <th>TOI</th>
                </thead>
                <tbody>
                    {players.sort((a, b) => a.jerseyNumber - b.jerseyNumber).map((p) => {
                        return (
                            <tr>
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

    return loading ? <div className={styles["loader-container"]}><div className={sharedStyles.loader}></div></div> : liveFeed.gameData ?
        <>
            <header className={sharedStyles.header} style={{ flexDirection: "column" }}>
                <h3>{DateHelper.toString(new Date(liveFeed.gameData.datetime.dateTime), true)}</h3>
                <div className={styles.header}>
                    <Link to={AppRoutes.resolvePath(AppRoutes.routes.teamDetails, { id: liveFeed.gameData.teams.away.id })}>
                        <img height="100" width="100" alt={liveFeed.gameData.teams.away.name} src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${liveFeed.gameData.teams.away.id}.svg`} />
                        <h3>{liveFeed.gameData.teams.away.name}</h3>
                    </Link>
                    <h1>VS</h1>
                    <Link to={AppRoutes.resolvePath(AppRoutes.routes.teamDetails, { id: liveFeed.gameData.teams.home.id })}>
                        <img height="100" width="100" alt={liveFeed.gameData.teams.home.name} src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${liveFeed.gameData.teams.home.id}.svg`} />
                        <h3>{liveFeed.gameData.teams.home.name}</h3>
                    </Link>
                </div>
            </header>
            <div className={styles.container}>
                {renderContent()}
            </div>
        </> : <></>
}

export default GameLiveFeedView;
