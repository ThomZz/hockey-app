import debounce from 'lodash.debounce';
import React, { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../app/routes';
import styles from "./playersSearch.module.css";
import sharedStyles from "../shared/shared.module.css";

const PlayersSearch: React.FC<{}> = () => {
    const navigate = useNavigate();
    const [filterInputValue, setFilterInputValue] = useState("");

    const searchInput = useRef<HTMLInputElement>(null);

    const search = debounce((e: FormEvent) => {
        e.preventDefault();
        if (searchInput.current?.value) {
            navigate(AppRoutes.resolvePath("playersSearch", { nameLike: encodeURIComponent(searchInput.current.value) }));
        }
    }, 500, { leading: true });

    const onInput = () => {
        setFilterInputValue(searchInput.current?.value ?? "");
    }

    return (
        <form className={styles.form} onSubmit={search}>
            <input  placeholder="Search for any players" onInput={onInput} className={sharedStyles.input} ref={searchInput} type="text" />
            <button type="submit" disabled={ !!!filterInputValue || filterInputValue.length < 4 } className={sharedStyles["icon-button"]}> Search </button>
        </form>
    );
}

export default PlayersSearch;
