import React from 'react';
import { useAppSelector } from "../../app/hooks";
import styles from "./teamList.module.css"
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../app/routes';
import { NHLTeamModel } from '../../models/team';

type Props = {
    teams: NHLTeamModel[]
}
const TeamsList: React.FC<Props> = ({ teams }) => {

    const { filter } = useAppSelector(state => state.team);

    return (
        <main className={styles.container}>
            {teams.filter(t => t.name.toLowerCase().includes(filter?.toLowerCase() ?? "")).map(team => (
                <Link className={styles.card} key={team.id} to={AppRoutes.resolvePath("teamDetails", { id: team.id })}>
                    <h4>{team.name}</h4>
                    <img   width="80px" height="80px" alt={team.name} src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${team.id}.svg`} />
                </Link>
            ))}
        </main>
    );
}

export default TeamsList;