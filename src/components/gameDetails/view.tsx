import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector, useDocumentTitle } from '../../app/hooks';
import sharedStyles from "../shared/shared.module.css";
import styles from "./view.module.css";
import { getGameDetails } from '../../features/gameDetails/slice';
import { useParams } from 'react-router-dom';
import Tabs from '../tabs/tabs';
import { NHLLiveFeedModel } from '../../models/live-feed';
import GameSummary from './gameSummary';
import GameTeamBoxscore from './gameTeamBoxscore';
import GameTeamsDetails from './gameTeamsDetails';

const GameDetailsView: React.FC<{ title: string }> = ({ title }) => {
    useDocumentTitle(title);

    const [titles, setTitles] = useState([] as string[]);
    const [activeTab, setActiveTab] = useState(0);

    const dispatch = useAppDispatch();
    const { liveFeed, loading } = useAppSelector(state => state.gameDetails);
    const { gameId } = useParams<{ gameId: string }>();

    useEffect(() => {
        const fetch = async () => {
            const { payload } = await dispatch(getGameDetails(String(gameId)));
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
                return (<GameSummary liveFeed={liveFeed} />)
            case 1:
                return <GameTeamBoxscore  boxscore={liveFeed.liveData.boxscore.teams.away} />;
            case 2:
                return <GameTeamBoxscore  boxscore={liveFeed.liveData.boxscore.teams.home} />;
        }
    }

    return loading ? <div className={styles["loader-container"]}><div className={sharedStyles.loader}></div></div> : liveFeed.gameData ?
        <main className={styles.container}>
            <header className={sharedStyles.header} style={{ flexDirection: "column" }}>
                <GameTeamsDetails gameData={liveFeed.gameData} liveData={liveFeed.liveData}/>
            </header>
            <div className={styles["main-content"]}>
                {renderContent()}
            </div>
        </main> : <></>
}

export default GameDetailsView;
