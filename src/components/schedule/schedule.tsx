import React, { useEffect, useCallback, useRef, useState } from 'react';
import { NHLScheduleModel } from '../../models/schedule';
import ScheduleGames from './scheduleGames';
import { Splide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';
import styles from "./schedule.module.css";
import sharedStyles from "../shared/shared.module.css";
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';

type Props = {
    dates: NHLScheduleModel[],
    loading?: boolean,
    startIndex?: number;
    onMoved?: (splide: any, newIndex: number) => void
}

const SLIDER_HIGH_SPEED_OCC_NUMBER_THRESHOLD = 2;
const SLIDER_LOW_TRANSITION_SPEED = 1500;
const SLIDER_HIGH_TRANSITION_SPEED = 200;

const ScheduleGamesMemo = React.memo(ScheduleGames);

const Schedule: React.FC<Props> = ({ dates, loading, startIndex, onMoved }) => {

    const getSplideCount = () => Math.floor(window.innerWidth / 250);
    const slider = useRef<any>(null);
    const [options] = useState<any>({
        height: "180px",
        start: startIndex ?? 0,
        rewind: true,
        rewindSpeed: SLIDER_HIGH_TRANSITION_SPEED,
        drag: true,
        gap: "2px",
        waitForTransition: false,
        autoWidth: true,
        padding: { left: 2, right: 2 },
        pagination: false,
        trimSpace: true,
        perPage: getSplideCount(),
        perMove: getSplideCount()
    })

    const setSliderSpeed = useCallback(debounce(() => {
        if (slider.current) {
            const { splide } = slider.current;
            const occ = getSplideCount();
            splide.options.speed = occ <= SLIDER_HIGH_SPEED_OCC_NUMBER_THRESHOLD ?
                SLIDER_HIGH_TRANSITION_SPEED : SLIDER_LOW_TRANSITION_SPEED;
        }
        }, SLIDER_HIGH_TRANSITION_SPEED, { leading: false, trailing: true }), []);

    const onWindowResize = useCallback(throttle(() => {
        setSliderSpeed();
        if (slider.current) {
            const { splide } = slider.current;
            const occ = getSplideCount();
            if (splide.options.perPage !== occ) {
                splide.options.perPage = occ;
                splide.options.perMove = occ;
            }
        }
    }, 200), []);

    useEffect(() => {
        setSliderSpeed();
        window.addEventListener("resize", onWindowResize);
        return function cleanup(): void {
            window.removeEventListener("resize", onWindowResize);
        }
    }, [])

    useEffect(() => {
        if (slider.current) {
            const { splide } = slider.current;
            if (typeof (startIndex) !== "undefined" && slider.current.splide.index !== startIndex) {
                // always reset speed option, and set only once startIndex is set, and splide has been navigated to, to prevent transition delay.
                splide.options.start = startIndex;
                splide.options.speed = 0;
                slider.current.splide.go(startIndex);
                setSliderSpeed();
            }
        }
    }, [startIndex]);

    const onDragEnd = () => setSliderSpeed();

    const onDragStart = () => {
        const { splide } = slider.current;
        if (splide.options.speed !== SLIDER_HIGH_TRANSITION_SPEED && slider.current) {
            splide.options.speed = SLIDER_HIGH_TRANSITION_SPEED;
        }
    };

    return loading ? <div className={styles["loader-container"]}><div className={sharedStyles.loader}></div></div> : (
        <div className={styles["slider-container"]}>
            <Splide className={styles.slider} ref={slider} options={options} onMoved={onMoved} onDragged={onDragEnd} onDrag={onDragStart} >
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