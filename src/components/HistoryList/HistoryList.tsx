import { HistoryDate } from '../../types';
import './HistoryList.scss';

interface HistoryListProps {
  HISTORICDATES: HistoryDate[];
  loadThis: (index: number) => void;
  currentEvent: number;
}

export const HistoryList = ({
  HISTORICDATES,
  currentEvent,
  loadThis,
}: HistoryListProps) => {
  return (
    <div className='events__control-buttons'>
      {HISTORICDATES.map((item, index) => {
        return (
          <button
            className={
              'events__button ' +
              (currentEvent === index ? 'events__button_active' : '')
            }
            key={item.title}
            onClick={() => loadThis(index)}></button>
        );
      })}
    </div>
  );
};
