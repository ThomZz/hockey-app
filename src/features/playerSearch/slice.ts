import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { container } from 'tsyringe';
import { NHlPlayerSearchModel } from '../../models/player';
import NHLSuggestApiService from '../../services/nhl-suggest-api-service';

export type PlayerSearchState = {
    players: NHlPlayerSearchModel[],
    lastSearch?: string;
    loading?: boolean;
}

const initialState: PlayerSearchState = {
    players: [],
};

export const listPlayers = createAsyncThunk(
    'player/list',
    async (nameFragment: string) => {
        const svc = container.resolve(NHLSuggestApiService);
        return await svc.getMatchingPlayers(nameFragment);
    }
);

export const playerSearchSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        updateLastSearch: (state, action: PayloadAction<string>) => {
            state.lastSearch = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(listPlayers.fulfilled, (state, action) => {
            state.players = action.payload;
            state.loading = false;
        })
        builder.addCase(listPlayers.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(listPlayers.rejected, (state) => {
            state.loading = false;
        })
    }
});

export const { updateLastSearch } = playerSearchSlice.actions;

export default playerSearchSlice.reducer;