import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../app/routes";
import { NHlPlayerSearchModel } from "../../models/player";

import sharedStyles from "../shared/shared.module.css";
import styles from "./playersSearchList.module.css";

const PlayersSearchList: React.FC<{ players: NHlPlayerSearchModel[] }> = ({ players }) => {

    const navigate = useNavigate();

    const onImgLoadError = (ev: SyntheticEvent<HTMLImageElement, Event>) => {
        ev.currentTarget.src = `/player.png`;
    }

    const onRowClick = (playerId: number) => {
        navigate(AppRoutes.resolvePath("playerDetails", { playerId: playerId }))
    }

    const getBirthPlace = (player: NHlPlayerSearchModel) => {
        const segments = [];
        if (player.birthCity) segments.push(player.birthCity);
        if (player.birthStateProvince) segments.push(player.birthStateProvince);
        if (player.birthCountry) segments.push(player.birthCountry);
        return segments.join(', ');
    }

    return (
        <table data-table-type="plain" className={`${sharedStyles.table} ${styles.table}`}>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Position</th>
                    <th>Team</th>
                    <th>Number</th>
                    <th>Status</th>
                    <th>Height</th>
                    <th>Weight</th>
                    <th>Birthplace</th>
                </tr>
            </thead>
            <tbody>
                {
                    players.map(player => (
                        <tr onClick={() => onRowClick(player.playerId)}>
                            <td className={styles.playerImgColumn}>
                                <img className={sharedStyles["player-img"]} style={{ width: "32px", height: "32px", backgroundImage: 'url("/player-loading.png")' }}
                                    loading="lazy" src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${player.playerId}.jpg`}
                                    alt="" onError={onImgLoadError} />
                                {`${player.name}`}
                            </td>
                            <td>{player.positionCode ?? "--"}</td>
                            <td>{player.lastTeamAbbrev ?? "--"}</td>
                            <td>{player.sweaterNumber ?? "--"}</td>
                            <td>{player.active ? "Active" : "Inactive"}</td>
                            <td>{player.height  ?? "--"}</td>
                            <td>{player.weightInPounds ?  `${player.weightInPounds} lbs` : "--"}</td>
                            <td>{getBirthPlace(player)}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}

export default PlayersSearchList;