import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import sharedStyles from "../shared/shared.module.css";
import PlayerStats from './playerStats';
import PlayerCard from './playerCard';
import { useAppDispatch, useAppSelector, useDocumentTitle } from '../../app/hooks';
import styles from "./view.module.css";
import { getPlayerDetails, getPlayerStats } from '../../features/playerDetails/slice';

const PlayerDetailsView: React.FC<{ title: string }> = () => {
    const { player, stats } = useAppSelector(state => state.playerDetails);
    useDocumentTitle(player.fullName);

    const { playerId, id: teamId } = useParams<any>();
    const pId = parseInt(playerId);

    const dispatch = useAppDispatch();
    const shouldFetch = !player?.id || pId !== player.id;

    useEffect(() => {
        window.scrollTo(0, 0);
        if (shouldFetch) {
            dispatch(getPlayerDetails(playerId));
            dispatch(getPlayerStats(playerId));
        }
    }, [dispatch, shouldFetch, playerId]);

    return shouldFetch ? null : (
        <>
            <div style={{
                backgroundImage: `url("https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${teamId}.svg")`,
            }} className={sharedStyles.background}>
            </div>
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