import debounce from 'lodash.debounce';
import React, { useRef, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../app/routes';
import sharedStyles from "../shared/shared.module.css";

const PlayersSearch: React.FC<{}> = () => {
    const navigate = useNavigate();
    const [filterInputValue, setFilterInputValue] = useState("");

    const searchInput = useRef<HTMLInputElement>(null);

    const search = debounce(async (e: MouseEvent) => {
        if (searchInput.current?.value) {
            navigate(AppRoutes.resolvePath("playersSearch", { nameLike: encodeURIComponent(searchInput.current.value) }));
        }
    }, 200);

    const onInput = () => {
        setFilterInputValue(searchInput.current?.value ?? "");
    }

    return (
        <>
            <input placeholder="Search for any players" onInput={onInput} className={sharedStyles.input} ref={searchInput} type="text" />
            <button disabled={ !!!filterInputValue || filterInputValue.length < 4 } className={sharedStyles["icon-button"]} onClick={search}> Search </button>
        </>
    );
}

export default PlayersSearch;
