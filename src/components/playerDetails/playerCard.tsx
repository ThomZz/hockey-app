import React, { SyntheticEvent } from 'react';
import styles from "./playerCard.module.css";
import sharedStyles from "../shared/shared.module.css";
import { NHLPlayerModel } from '../../models/player';

const PlayerCard: React.FC<{ player: NHLPlayerModel }> = ({ player }) => {

    const onImgLoadError = (ev: SyntheticEvent<HTMLImageElement, Event>) => {
        ev.currentTarget.src = `/player.png`;
    }

    return (
        <div className={styles.card}>
            <div>
                <img className={sharedStyles["player-img"]} style={{ width: "168px", height: "168px", backgroundImage: 'url("/player-loading.png")' }}
                    loading="lazy" src={`http://nhl.bamcontent.com/images/headshots/current/168x168/${player.id}.jpg`}
                    alt={player.fullName} onError={onImgLoadError} />
                <h2>{player.primaryNumber} {player.fullName}</h2>
            </div>
            <table className={styles["card-infos"]} cellSpacing="0" cellPadding="0">
                <tbody>
                    <tr>
                        <td>Position</td>
                        <td>{player.primaryPosition?.type}, {player.primaryPosition?.abbreviation}</td>
                    </tr>
                    <tr>
                        <td>Birth Date</td>
                        <td>{player.birthDate} ({player.currentAge} years old)</td>
                    </tr>
                    <tr>
                        <td>Birth Place</td>
                        <td>{player.birthCity}, {player.birthCountry}</td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td>{player.height}</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>{player.weight} lbs</td>
                    </tr>
                    <tr>
                        <td>Rookie</td>
                        <td>{player.rookie ? "Yes" : "No"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default PlayerCard;