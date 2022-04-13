import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useDocumentTitle } from '../../app/hooks';
import { getTeamsDetails } from '../../features/teamDetails/slice';
import styles from "./view.module.css";
import sharedStyles from "../shared/shared.module.css";
import TeamMemberCard from './teamMemberCard';

import { getTeamSchedule, updateCurrentScheduleIndex } from '../../features/teamSchedule/slice';
import Schedule from '../schedule/schedule';
import { DateHelper } from '../../utils/date';
import { NHLScheduleGroupModel } from '../../models/schedule';

const TeamDetailsView: React.FC<{ title: string }> = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const tId = parseInt(id);
    const { roster, name: teamName, id: teamId } = useAppSelector(state => state.teamDetails);
    const { schedules, currentScheduleIndex, loading } = useAppSelector(state => state.teamSchedule);

    useDocumentTitle(teamName);
    const shouldFetch = tId !== teamId;

    useEffect(() => {
        const fetch = async () => {
            dispatch(getTeamsDetails(tId));
            const today = new Date();
            const to = DateHelper.addDays(today, 7);
            const from = DateHelper.since(today, 21);
            const { payload } = await dispatch(getTeamSchedule({
                id: tId,
                startDate: DateHelper.toString(from),
                endDate: DateHelper.toString(to)
            }));
            dispatch(updateCurrentScheduleIndex(NHLScheduleGroupModel.FindNearestGameIndex(payload as NHLScheduleGroupModel)));
        }
        if (shouldFetch) fetch();
    }, []);

    const onSchedulesMoved =(_: any , newIndex: number) => {
        dispatch(updateCurrentScheduleIndex(newIndex));
    }

    return shouldFetch ? null : (
        <div className={styles.container}>
            <div style={{
                backgroundImage: `url("https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${id}.svg")`,
            }} className={sharedStyles.background}>
            </div>
            <header className={sharedStyles.header}>
                <img height="100" width="100" alt={teamName} src={`https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${id}.svg`} />
                <h3>{teamName}</h3>
            </header>
            <div className={sharedStyles.main}>
                <Schedule startIndex={currentScheduleIndex} loading={loading} dates={schedules.dates} onMoved={onSchedulesMoved}/>
            </div>
            <div className={styles["roster-container"]}>
                {roster?.map((rosterMember) => (
                    <TeamMemberCard key={rosterMember.person.id} member={rosterMember} teamId={tId} />
                ))}
            </div>
        </div>
    );
}

export default TeamDetailsView;