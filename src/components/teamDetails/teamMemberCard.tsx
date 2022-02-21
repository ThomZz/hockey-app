import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../app/routes';
import { NHLRosterMemberModel } from '../../models/roster';
import styles from "./teamMemberCard.module.css";
import sharedStyles from "../shared/shared.module.css";

const TeamMemberCard: React.FC<{ teamId: number, member: NHLRosterMemberModel }> = ({ teamId, member }) => {
    const { jerseyNumber, person, position } = member;
    
    const onImgLoadError = (ev: SyntheticEvent<HTMLImageElement, Event>) => {
        ev.currentTarget.src = "/player.png";
    }
    
    return (
        <Link className={styles.card} to={AppRoutes.resolvePath("playerDetails", { id: teamId, playerId: person.id })}>
            <h3>{person.fullName}</h3>
            <img className={sharedStyles["player-img"]} style={{ width: "100px", height: "100px", backgroundImage: 'url("/player-loading.png")'}} 
                loading="lazy" src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${person.id}.jpg`} 
                alt={person.fullName} onError={onImgLoadError}/>
            <table cellSpacing="0" cellPadding="10">
                <tbody>
                    <tr>
                        <td>Number</td>
                        <td>{jerseyNumber}</td>
                    </tr>
                    <tr>
                        <td>Position</td>
                        <td>{position.name} ({position.abbreviation})</td>
                    </tr>
                </tbody>
            </table>
        </Link>
    );
}

export default TeamMemberCard;