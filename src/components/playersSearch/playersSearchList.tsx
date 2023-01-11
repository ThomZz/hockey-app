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

    return (
        <table data-table-type="plain" className={`${sharedStyles.table} ${styles.table}`}>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Status</th>
                    <th>Birthdate</th>
                    <th>State/Prov</th>
                    <th>Country</th>
                    <th>Team</th>
                    <th>Number</th>
                    <th>Position</th>
                </tr>
            </thead>
            <tbody>
                {
                    players.map(player => (
                        <tr onClick={() => onRowClick(player.id)}>
                            <td className={styles.playerImgColumn}>
                                <img className={sharedStyles["player-img"]} style={{ width: "32px", height: "32px", backgroundImage: 'url("/player-loading.png")' }}
                                    loading="lazy" src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${player.id}.jpg`}
                                    alt="" onError={onImgLoadError} />
                                {`${player.firstName} ${player.lastName}`}
                            </td>
                            <td>{player.isActive ? "Active" : "Inactive"}</td>
                            <td>{player.birthDate}</td>
                            <td>{player.birthStateProvince || "N/A"}</td>
                            <td>{player.birthCountry}</td>
                            <td>{player.currentTeamAbb}</td>
                            <td>{player.primaryNumber}</td>
                            <td>{player.primaryPosition}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}

export default PlayersSearchList;