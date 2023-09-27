import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sharedStyles from "../shared/shared.module.css";
import PlayerStats from './playerStats';
import PlayerCard from './playerCard';
import { useAppDispatch, useAppSelector, useDocumentTitle } from '../../app/hooks';
import styles from "./view.module.css";
import { getPlayerDetails, getPlayerStats } from '../../features/playerDetails/slice';
import { NHLPlayerModel } from '../../models/player';
import { teamLogoUrl } from '../../settings';

const PlayerDetailsView: React.FC<{ title: string }> = () => {
    const { player, stats } = useAppSelector(state => state.playerDetails);
    useDocumentTitle(player.fullName);

    const { playerId } = useParams<any>();
    const [playerTeamId, setPlayerTeamId] = useState(player ? player.currentTeam?.id : undefined);

    const pId = parseInt(String(playerId));

    const dispatch = useAppDispatch();
    const shouldFetch = !player?.id || pId !== player.id;

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetch = async () => {
            const { payload } = await dispatch(getPlayerDetails(pId));
            setPlayerTeamId((payload as NHLPlayerModel).currentTeam?.id)
            dispatch(getPlayerStats(pId));
        }
        if (shouldFetch) fetch();
    }, [dispatch, shouldFetch]);

    const renderBackground = (teamId?: number) => {
        if (teamId) {
            return (
                <div style={{
                    backgroundImage: `url("${teamLogoUrl(player.currentTeam.abbreviation)}"`,
                }} className={sharedStyles.background}></div>
            )
        }
        return;
    }

    return shouldFetch ? null : (
        <>
            {renderBackground(playerTeamId)}
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