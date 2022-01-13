import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NHLScheduleModel } from '../../models/schedule';
import ScheduleGames from './scheduleGames';
import { Splide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';
import styles from "./schedule.module.css";
import throttle from 'lodash.throttle';

type Props = {
    dates: NHLScheduleModel[],
    loading?: boolean,
    startIndex?: number;
}

const ScheduleGamesMemo = React.memo(ScheduleGames);

const Schedule: React.FC<Props> = ({ dates, loading, startIndex }) => {

    const slider = useRef<any>(null);
    const [options, setOptions] = useState<any>({
        height: "180px",
        gap: "15px",
        padding: 5,
        pagination: false,
        perPage: Math.floor(window.innerWidth / 250),
        perMove: 4
    })

    useEffect(() => {
        const handler = throttle(() => {
            if (slider.current) {
                const { splide } = slider.current;
                const occ = Math.floor(window.innerWidth / 250);
                if (splide.options.perPage !== occ) {
                    splide.options.perPage = occ;
                    setOptions({ ...options, perPage: occ });
                }
            }
        }, 200);
        window.addEventListener("resize", handler);
        return function cleanup(): void {
            window.removeEventListener("resize", handler);
        }
    }, [])

    useLayoutEffect(() => {
        if (slider.current) {
            if (typeof (startIndex) !== "undefined" && slider.current.splide.index !== startIndex) {
                setOptions({ ...options, start: startIndex });
                slider.current.splide.options.start = startIndex;
                slider.current.remount();
            }
        }
    }, [startIndex]);

    return loading ? <div className={styles["loader-container"]}><div className={styles.loader}></div></div> : (
        <div className={styles["slider-container"]}>
            <Splide className={styles.slider} ref={slider} options={options}>
                {dates?.map(d => {
                    return (
                        <ScheduleGamesMemo games={d.games} />
                    )
                })}
            </Splide>
        </div>
    );
}

export default React.memo(Schedule);