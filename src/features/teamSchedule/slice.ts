import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { container } from 'tsyringe';
import { NHLScheduleGroupModel } from '../../models/schedule';

import NHLStatsApiService from '../../services/nhl-stats-api-service';
import { ScheduleState } from '../schedule/slice';

const initialState: ScheduleState = {
    schedules: {} as NHLScheduleGroupModel,
    loading: false
}

export const getTeamSchedule = createAsyncThunk(
    'schedules/team',
    async ({ id, startDate, endDate }: { id: number, startDate: string, endDate: string }) => {
        const { getSchedule } = container.resolve(NHLStatsApiService);
        return await getSchedule(startDate, endDate, id);
    }
);

export const teamScheduleSlice = createSlice({
    name: 'teamsSchedules',
    initialState,
    reducers: {
        updateCurrentScheduleIndex: (state, action: PayloadAction<number>) => {
            state.currentScheduleIndex = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(getTeamSchedule.fulfilled, (state, action) => {
            state.schedules = action.payload;
            state.loading = false;
        })
        builder.addCase(getTeamSchedule.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getTeamSchedule.rejected, (state) => {
            state.loading = false;
        })
    }
});
export const { updateCurrentScheduleIndex } = teamScheduleSlice.actions;
export default teamScheduleSlice.reducer;