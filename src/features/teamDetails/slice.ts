import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { container } from 'tsyringe';
import { NHLRosterMemberModel } from '../../models/roster';

import NHLStatsApiService from '../../services/nhl-stats-api-service';

export interface TeamDetailsState {
    id: number;
    name: string;
    abbreviation: string;
    roster: NHLRosterMemberModel[];
}

const initialState: TeamDetailsState = {
    id: 0,
    name: "",
    abbreviation: "",
    roster: []
}

export const getTeamsDetails = createAsyncThunk(
    'team/details',
    async (id: number) => {
        const svc = container.resolve(NHLStatsApiService);
        return await svc.getTeamDetails(id);
    }
);

export const teamDetailsSlice = createSlice({
    name: 'teamDetails',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getTeamsDetails.fulfilled, (state, action) => {
            Object.assign(state, {...action.payload}, { roster: action.payload.roster?.roster });
        })
    }
});
export default teamDetailsSlice.reducer;