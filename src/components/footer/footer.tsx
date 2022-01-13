import React from 'react';
import styles from "./footer.module.css";

const Footer: React.FC<{}> = () => {

    return (
        <div className={styles.footer}>
            @{new Date().getFullYear()}
        </div>
    );
}

export default Footer;