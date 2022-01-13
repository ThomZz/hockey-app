import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { container } from 'tsyringe';
import { NHLTeamModel } from '../../models/team';
import NHLStatsApiService from '../../services/nhl-stats-api-service';

export type TeamState = {
    teams: NHLTeamModel[],
    filter?: string;
}

const initialState: TeamState = {
    teams: []
};

export const listTeams = createAsyncThunk(
    'team/list',
    async () => {
        const svc = container.resolve(NHLStatsApiService);
        return await svc.getTeams();
    }
);

export const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        updateFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(listTeams.fulfilled, (state, action) => {
            state.teams = action.payload;
        })
    }
});

export const { updateFilter } = teamSlice.actions;

export default teamSlice.reducer;