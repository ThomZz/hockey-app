import React from 'react';
import styles from "./gameTeamsDetails.module.css"
import { NHLLiveFeedGameDataModel, NHLLiveFeedLiveDataModel } from '../../models/live-feed';
import { DateHelper } from '../../utils/date';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../app/routes';
import { teamLogoUrl } from '../../settings';

type Props = {
    gameData: NHLLiveFeedGameDataModel,
    liveData: NHLLiveFeedLiveDataModel
}
const GameTeamsDetails: React.FC<Props> = ({ gameData, liveData }) => {
    return (
        <>
            <h3>{DateHelper.toString(new Date(gameData.datetime.dateTime), true)}</h3>
            <div className={styles.container}>
                <Link to={AppRoutes.resolvePath(AppRoutes.routes.teamDetails, { id: gameData.teams.away.id })}>
                    <img height="100" width="100" alt={gameData.teams.away.name} src={teamLogoUrl(gameData.teams.away.abbreviation)}/>
                    <h3>{gameData.teams.away.name}</h3>
                </Link>
                <h1>VS</h1>
                <Link to={AppRoutes.resolvePath(AppRoutes.routes.teamDetails, { id: gameData.teams.home.id })}>
                    <img height="100" width="100" alt={gameData.teams.home.name} src={teamLogoUrl(gameData.teams.home.abbreviation)} />
                    <h3>{gameData.teams.home.name}</h3>
                </Link>
            </div>
        </>)
}

export default GameTeamsDetails;