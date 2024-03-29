
import debounce from 'lodash.debounce';
import React, { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateFilter } from '../../features/team/slice';
import sharedStyles from "../shared/shared.module.css";

const TeamSearchForm: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const { filter } = useAppSelector(state => state.team);

    const handleChange = debounce((e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        dispatch(updateFilter((e.target as HTMLInputElement).value))
    }, 200);

    return (
        <form>
            <input placeholder="Filter teams ..." id="search" className={sharedStyles.input} onChange={handleChange} defaultValue={filter} type="text"/>
        </form>
    );
}

export default TeamSearchForm;