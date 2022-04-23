import React, { FormEvent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AppRoutes } from '../../app/routes';
import styles from "./header.module.css";

const Header: React.FC<{}> = () => {
    const history = useHistory();
    const location = useLocation();

    const handleLogoClick = (ev: FormEvent<HTMLElement>) => {
        ev.preventDefault();
        const homePath = AppRoutes.resolvePath("home");
        if (location.pathname !== homePath) {
            history.push(homePath);
        }
    }

    return (
        <div className={styles.header}>
            <img onClick={handleLogoClick} alt="" width="52px" height="52px" src="/logo.png" />
            <h2 onClick={handleLogoClick}>ThomZz Hockey App</h2>
        </div>
    );
}

export default Header;