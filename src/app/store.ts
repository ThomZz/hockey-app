import { configureStore } from '@reduxjs/toolkit';
import teamReducer from '../features/team/slice';
import teamDetailsReducer from '../features/teamDetails/slice';
import playerDetailsReducer from '../features/playerDetails/slice';
import teamScheduleReducer from '../features/teamSchedule/slice';
import scheduleReducer from '../features/schedule/slice';

const store = configureStore({
    reducer: {
        team: teamReducer,
        teamDetails: teamDetailsReducer,
        playerDetails: playerDetailsReducer,
        teamSchedule: teamScheduleReducer,
        schedule: scheduleReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;