import React, { useEffect } from 'react';
import styles from "./view.module.css"
import TeamSearchForm from './teamSearchForm';
import TeamList from './teamList';
import { useAppDispatch, useAppSelector, useDocumentTitle } from '../../app/hooks';
import sharedStyles from "../shared/shared.module.css";
import { DateHelper } from '../../utils/date';
import { getSchedule, updateCurrentScheduleIndex } from '../../features/schedule/slice';
import { NHLScheduleGroupModel } from '../../models/schedule';
import Schedule from '../schedule/schedule';
import { listTeams } from '../../features/team/slice';

const TeamsView: React.FC<{ title: string }> = ({ title }) => {
    useDocumentTitle(title);

    const dispatch = useAppDispatch();
    const { schedules, loading, currentScheduleIndex } = useAppSelector(state => state.schedule);
    const { teams } = useAppSelector(state => state.team);

    useEffect(() => {
        const fetch = async () => {
            if (!teams?.length) dispatch(listTeams());
            const today = new Date();
            const to = DateHelper.addDays(today, 3);
            const from = DateHelper.since(today, 3);
            const { payload } = await dispatch(getSchedule({
                startDate: DateHelper.toString(from),
                endDate: DateHelper.toString(to)
            }))
            if (payload) {
                dispatch(updateCurrentScheduleIndex(NHLScheduleGroupModel.FindNearestGameIndex(payload as NHLScheduleGroupModel) + 2));
            }
        }
        if (!schedules?.dates?.length) fetch();
    }, []);

    const onSchedulesMoved =(_: any , newIndex: number) => {
        dispatch(updateCurrentScheduleIndex(newIndex));
    }

    return (
        <>
            <div style={{ backgroundSize: "contain", backgroundImage: "url('/nhl-logo.png')" }} className={sharedStyles.background}></div>
            <main className={styles.container}>
                <Schedule startIndex={currentScheduleIndex} dates={schedules.dates} loading={loading} onMoved={onSchedulesMoved}/>
                <TeamSearchForm></TeamSearchForm>
                <TeamList teams={teams}></TeamList>
            </main>
        </>
    )
}

export default TeamsView;
