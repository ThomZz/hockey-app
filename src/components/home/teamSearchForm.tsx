
import debounce from 'lodash.debounce';
import React, { FormEvent, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateFilter } from '../../features/team/slice';
import styles from "./teamSearchForm.module.css";

const TeamSearchForm: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const { filter } = useAppSelector(state => state.team);

    const handleChange = debounce((e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        dispatch(updateFilter((e.target as HTMLInputElement).value))
    }, 200);

    useLayoutEffect(() => {
        document.getElementById("search")?.focus();
    })

    return (
        <form>
            <input id="search" className={styles.input} onChange={handleChange} defaultValue={filter} type="text"/>
        </form>
    );
}

export default TeamSearchForm;