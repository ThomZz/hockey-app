import React, { useEffect, useLayoutEffect, useCallback, useRef, useState } from 'react';
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
const  SLIDER_LOW_TRANSITION_SPEED = 1500;
const  SLIDER_HIGH_TRANSITION_SPEED = 200;

const ScheduleGamesMemo = React.memo(ScheduleGames);

const Schedule: React.FC<Props> = ({ dates, loading, startIndex, onMoved }) => {

    const getSplideCount = () => Math.floor(window.innerWidth / 250);
    const slider = useRef<any>(null);
    const [options, setOptions] = useState<any>({
        height: "180px",
        gap: "2px",
        speed: getSplideCount() <= SLIDER_HIGH_SPEED_OCC_NUMBER_THRESHOLD ? 
            SLIDER_HIGH_TRANSITION_SPEED : SLIDER_LOW_TRANSITION_SPEED,
        waitForTransition: false,
        autoWidth: true,
        drag:  true,
        padding: { left: 2, right: 2 },
        pagination: false,
        trimSpace: false,
        perPage: getSplideCount(),
        perMove: getSplideCount()
    })

    const resetSliderSpeed =  useCallback(debounce(() => {
        if (slider.current) {
            const occ = getSplideCount();
            const { splide } = slider.current;
            splide.options.speed = occ <= SLIDER_HIGH_SPEED_OCC_NUMBER_THRESHOLD ? 
            SLIDER_HIGH_TRANSITION_SPEED : SLIDER_LOW_TRANSITION_SPEED;
            setOptions({ ...options, speed: splide.options.speed });
        }
    }, SLIDER_HIGH_TRANSITION_SPEED, { leading: false, trailing: true }), []);

    useEffect(() => {
        const handler = throttle(() => {
            if (slider.current) {
                const { splide } = slider.current;
                const occ = getSplideCount();
                if (splide.options.perPage !== occ) {
                    splide.options.perPage = occ;
                    splide.options.perMove = occ;
                    splide.options.speed = occ <= SLIDER_HIGH_SPEED_OCC_NUMBER_THRESHOLD ? 
                    SLIDER_HIGH_TRANSITION_SPEED : SLIDER_LOW_TRANSITION_SPEED;
                    setOptions({ ...options, perPage: occ, perMove: occ, speed: splide.options.speed });
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
                slider.current.splide.refresh();
            }
        }
    }, [startIndex]);

    const onDragEnd = () => resetSliderSpeed();

    const onDragStart = () => {
        const { splide } = slider.current;
        if (splide.options.speed !== SLIDER_HIGH_TRANSITION_SPEED && slider.current) {
            splide.options.speed = SLIDER_HIGH_TRANSITION_SPEED;
            setOptions({ ...options, speed: splide.options.speed });
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