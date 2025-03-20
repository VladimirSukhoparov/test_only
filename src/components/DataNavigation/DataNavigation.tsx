import './DataNavigation.scss';

interface DataNavigationProps {
  numberOfEvents: number;
  currentEvent: number;
  loadPrev: () => void;
  loadNext: () => void;
  getTotal: (length: number, index: number) => string;
}
export const DataNavigation = ({
  numberOfEvents,
  currentEvent,
  loadPrev,
  loadNext,
  getTotal,
}: DataNavigationProps) => {
  return (
    <div className='historic-dates__navigation navigation'>
      <p className='navigation__total'>
        {getTotal(numberOfEvents, currentEvent)}
      </p>
      <div className='navigation__buttons control-buttons'>
        <button
          className='control-buttons__default control-buttons__prev'
          onClick={loadPrev}
          disabled={currentEvent === 0 ? true : false}></button>
        <button
          className='control-buttons__default control-buttons__next'
          onClick={loadNext}
          disabled={
            currentEvent === numberOfEvents - 1 ? true : false
          }></button>
      </div>
    </div>
  );
};
