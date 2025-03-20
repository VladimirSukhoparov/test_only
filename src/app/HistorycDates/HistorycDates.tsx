import { CSSProperties, useEffect, useRef, useState } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HistorycDates.scss';
import gsap from 'gsap';
import { HISTORICDATES } from '../App.const';
import { HistoryList } from '../../components/HistoryList/HistoryList';
import { DataSwiper } from '../../components/DataSwiper/DataSwiper';
import { DataSpinner } from '../../components/DataSpinner/DataSpinner';
import { DataNavigation } from '../../components/DataNavigation/DataNavigation';
import { useMediaQuery } from 'react-responsive';

export function HistorycDates() {
  const isDesktop = useMediaQuery({ query: '(min-width: 1200px)' });
  const numberOfEvents = HISTORICDATES.length;
  const angleBetweenDots = 360 / numberOfEvents;
  const defaultTimeOfRotation = 300;

  const sliderRef = useRef<HTMLDivElement>(null);
  const mainCircleRef = useRef<HTMLDivElement>(null);
  const startDateRef = useRef<HTMLDivElement>(null);
  const endDateRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState<number>(angleBetweenDots);
  const [currentEvent, setCurrentEvent] = useState<number>(0);
  const [timeOfRotation, setTimeOfRotation] = useState<number>(
    defaultTimeOfRotation
  );
  const [startDate, setStartDate] = useState<number>(
    Number(HISTORICDATES[0].events[0].date)
  );
  const [endDate, setEndDate] = useState<number>(
    Number(HISTORICDATES[0].events[HISTORICDATES.length - 1].date)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      sliderRef.current?.classList.add('slider_show');
      clearTimeout(timer);
    }, 300);
  }, [currentEvent]);

  function getTotal(length: number, index: number): string {
    return `${String(index + 1).padStart(2, '0')}/${String(length).padStart(
      2,
      '0'
    )}`;
  }

  function fadeIt(fn: Function): void {
    sliderRef.current?.classList.remove('slider_show');
    const timer = setTimeout(() => {
      fn();
      clearTimeout(timer);
    }, 300);
  }

  function loadPrev(): void {
    loadThis(currentEvent - 1);
  }

  function loadNext(): void {
    loadThis(currentEvent + 1);
  }

  function animateDatesRange(index: number): void {
    const newStartDate = Number(HISTORICDATES[index].events[0].date);
    const startRange = newStartDate - startDate;
    const newEndDate = Number(
      HISTORICDATES[index].events[HISTORICDATES.length - 1].date
    );
    const endRange = newEndDate - endDate;
    const animationTime = (timeOfRotation + 300) / 1000;

    gsap.to(startDateRef.current, {
      duration: animationTime,
      textContent: `+=${startRange}`,
      roundProps: 'textContent',
      ease: 'none',
      onUpdate: () => setStartDate(newStartDate),
    });
    gsap.to(endDateRef.current, {
      duration: animationTime,
      textContent: `+=${endRange}`,
      roundProps: 'textContent',
      ease: 'none',
      onUpdate: () => setEndDate(newEndDate),
    });
  }

  function loadThis(index: number): void {
    animateDatesRange(index);

    mainCircleRef.current?.children[index].classList.add(
      'spinner__shoulder_active'
    );

    const angleOfRotation = angleBetweenDots - index * angleBetweenDots;
    setTimeOfRotation(Math.abs(currentEvent - index) * defaultTimeOfRotation);
    const timer = setTimeout(() => {
      setAngle(angleOfRotation);
      clearTimeout(timer);
    }, 300);

    fadeIt(() => setCurrentEvent(index));
  }

  return (
    <main className='main'>
      <section className='historic-dates'>
        <h1 className='historic-dates__heading'>Исторические даты</h1>
        <div className='historic-dates__range range'>
          <p className='range_start' ref={startDateRef}>
            {startDate}
          </p>
          <p className='range_end' ref={endDateRef}>
            {endDate}
          </p>
        </div>
        {isDesktop && (
          <div className='historic-dates__spinner spinner'>
            <div
              ref={mainCircleRef}
              className='spinner__main-circle'
              style={
                {
                  '--count': numberOfEvents,
                  '--angle': angle + 'deg',
                  '--time': timeOfRotation + 'ms',
                  '--delay': timeOfRotation + 300 + 'ms',
                } as CSSProperties
              }>
              <DataSpinner
                HISTORICDATES={HISTORICDATES}
                currentEvent={currentEvent}
                loadThis={loadThis}
              />
            </div>
          </div>
        )}
        {isDesktop ? (
          <DataNavigation
            numberOfEvents={numberOfEvents}
            currentEvent={currentEvent}
            loadPrev={loadPrev}
            loadNext={loadNext}
            getTotal={getTotal}
          />
        ) : (
          <hr className='historic-dates__divider' />
        )}
        <div ref={sliderRef} className='historic-dates__slider slider'>
          <DataSwiper
            HISTORICDATES={HISTORICDATES}
            currentEvent={currentEvent}
          />
        </div>
        {!isDesktop && (
          <DataNavigation
            numberOfEvents={numberOfEvents}
            currentEvent={currentEvent}
            loadPrev={loadPrev}
            loadNext={loadNext}
            getTotal={getTotal}
          />
        )}
        <HistoryList
          HISTORICDATES={HISTORICDATES}
          loadThis={loadThis}
          currentEvent={currentEvent}
        />
      </section>
    </main>
  );
}
