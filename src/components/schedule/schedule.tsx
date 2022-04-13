import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NHLScheduleModel } from '../../models/schedule';
import ScheduleGames from './scheduleGames';
import { Splide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';
import styles from "./schedule.module.css";
import sharedStyles from "../shared/shared.module.css";
import throttle from 'lodash.throttle';

type Props = {
    dates: NHLScheduleModel[],
    loading?: boolean,
    startIndex?: number;
    onMoved?: (splide: any,  newIndex: number) => void
}

const ScheduleGamesMemo = React.memo(ScheduleGames);

const Schedule: React.FC<Props> = ({ dates, loading, startIndex, onMoved }) => {

    const getSplideCount = () => Math.floor(window.innerWidth / 250);
    const slider = useRef<any>(null);
    const [options, setOptions] = useState<any>({
        height: "180px",
        gap: "15px",
        padding: 5,
        pagination: false,
        perPage: getSplideCount(),
        perMove: getSplideCount()
    })

    useEffect(() => {
        const handler = throttle(() => {
            if (slider.current) {
                const { splide } = slider.current;
                const occ = getSplideCount();
                if (splide.options.perPage !== occ) {
                    splide.options.perPage = occ;
                    splide.options.perMove = occ;
                    setOptions({ ...options, perPage: occ, perMove: occ });
                }
            }
        }, 200);
        window.addEventListener("resize", handler);
        return function cleanup(): void {
            window.removeEventListener("resize", handler);
        }
    }, [getSplideCount])

    useLayoutEffect(() => {
        if (slider.current) {
            if (typeof (startIndex) !== "undefined" && slider.current.splide.index !== startIndex) {
                setOptions({ ...options, start: startIndex });
                slider.current.splide.options.start = startIndex;
                slider.current.remount();
            }
        }
    }, [startIndex]);

    return loading ? <div className={styles["loader-container"]}><div className={sharedStyles.loader}></div></div> : (
        <div className={styles["slider-container"]}>
            <Splide className={styles.slider} ref={slider} options={options} onMoved={onMoved}>
                {dates?.map((d, idx) => {
                    return (
                        <ScheduleGamesMemo key={`${d.date}-${idx}`} games={d.games} />
                    )
                })}
            </Splide>
        </div>
    );
}

export default React.memo(Schedule);