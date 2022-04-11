import { useEffect, useState } from "react";
import styles from "./tabs.module.css";

type TabsProps = {
    titles: string[],
    onTabActivated: (tabIndex: number) => void,
    selectedIndex?: number
}

const Tabs: React.FC<TabsProps> = ({ titles, onTabActivated, selectedIndex }) => {

    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        setActiveIdx(selectedIndex ?? 0);
        onTabActivated(selectedIndex ?? 0);
    }, [selectedIndex, setActiveIdx]);

    const onTabClickedHandler = (idx: number) => {
        setActiveIdx(idx);
        onTabActivated(idx);
    }

    return (
        <div className={styles.container}>
            {titles?.map((title, idx) => (
                <div className={`${styles.tab} ${activeIdx === idx ? styles.selected : ""}`} key={`${title}-${idx}`} onClick={() => onTabClickedHandler(idx)}>{title}</div>
            ))}
        </div>
    );
}

export default Tabs;