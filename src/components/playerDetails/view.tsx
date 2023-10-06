import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import sharedStyles from "../shared/shared.module.css";
import PlayerStats from './playerStats';
import PlayerCard from './playerCard';
import { useAppDispatch, useAppSelector, useDocumentTitle } from '../../app/hooks';
import styles from "./view.module.css";
import { getPlayerDetails, getPlayerStats } from '../../features/playerDetails/slice';
import { teamLogoUrl } from '../../settings';

const PlayerDetailsView: React.FC<{ title: string }> = () => {
    const { player, stats } = useAppSelector(state => state.playerDetails);
    useDocumentTitle(player.fullName);

    const { playerId } = useParams<any>();

    const pId = parseInt(String(playerId));

    const dispatch = useAppDispatch();
    const shouldFetch = !player?.id || pId !== player.id;

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetch = () => {
            dispatch(getPlayerDetails(pId));
            dispatch(getPlayerStats(pId));
        }
        if (shouldFetch) fetch();
    }, [dispatch, shouldFetch]);

    const renderBackground = () => {
        return (
            <div style={{
                backgroundImage: `url("${ player.currentTeam ? teamLogoUrl(player.currentTeam.abbreviation) : '/nhl-logo.png'}"`,
            }} className={sharedStyles.background}></div>
        )
    }

    return shouldFetch ? null : (
        <>
            {renderBackground()}
            <main className={sharedStyles.main}>
                <div className={styles.container}>
                    <PlayerCard player={player} />
                    <PlayerStats player={player} stats={stats} />
                </div>
            </main>
        </>
    );
}

export default PlayerDetailsView;