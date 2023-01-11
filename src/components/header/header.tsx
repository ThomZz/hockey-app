import React, { FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../app/routes';
import PlayersSearch from '../playersSearch/playersSearch';
import styles from "./header.module.css";

const Header: React.FC<{}> = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogoClick = (ev: FormEvent<HTMLElement>) => {
        ev.preventDefault();
        const homePath = AppRoutes.resolvePath("home");
        if (location.pathname !== homePath) {
            navigate(homePath);
        }
    }

    return (
        <div className={styles.header}>
            <div>
                <img onClick={handleLogoClick} alt="" width="52px" height="52px" src="/logo.png" />
                <h2 className={styles["app-title"]} onClick={handleLogoClick}>ThomZz Hockey App</h2>
            </div>
            <div>
                <PlayersSearch />
            </div>
        </div>
    );
}

export default Header;
