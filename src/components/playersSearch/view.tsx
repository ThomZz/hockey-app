import React, { useEffect } from 'react';
import styles from "./view.module.css"
import { useAppDispatch, useAppSelector, useDocumentTitle } from '../../app/hooks';
import sharedStyles from "../shared/shared.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import { listPlayers, updateLastSearch } from '../../features/playerSearch/slice';
import { AppRoutes } from '../../app/routes';
import { NHlPlayerSearchModel } from '../../models/player';
import PlayersSearchList from './playersSearchList';

const PlayersSearchView: React.FC<{ title: string }> = ({ title }) => {
    useDocumentTitle(title);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { lastSearch, players, loading } = useAppSelector(state => state.playerSearch);
    const { nameLike } = useParams<{ nameLike: string }>();

    const checkForDirectNavigation = (players: NHlPlayerSearchModel[]) => {
        if (players.length === 1) {
            const [player] = players;
            navigate(AppRoutes.resolvePath("playerDetails", { playerId: player.playerId }), { replace: true });
        }
    }

    useEffect(() => {
        const run = async () => {
            if (nameLike && nameLike !== lastSearch) {
                const { payload: playerSuggestions } = await dispatch(listPlayers(nameLike)) as { payload: NHlPlayerSearchModel[] };
                dispatch(updateLastSearch(nameLike))
                checkForDirectNavigation(playerSuggestions);
            }
            else {
                checkForDirectNavigation(players);
            }
        };
        run();
    }, [nameLike]);

    return (
        <>
            <div style={{ backgroundSize: "contain", backgroundImage: "url('/nhl-logo.png')" }} className={sharedStyles.background}></div>
            <div className={styles.container}>{
                loading ?
                    <div className={sharedStyles.loader}></div> : (
                        players.length ? 
                        <PlayersSearchList players={players} /> : (
                            <div className={sharedStyles["no-results"]}>No NHL  players found</div>
                        )
                    )}</div>
        </>
    )
}

export default PlayersSearchView;
