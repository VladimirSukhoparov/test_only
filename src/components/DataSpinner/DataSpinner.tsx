import { HistoryDate } from '../../types';
import './DataSpinner.scss';

interface DataSpinnerProps {
  HISTORICDATES: HistoryDate[];
  currentEvent: number;
  loadThis: (index: number) => void;
}
export const DataSpinner = ({
  HISTORICDATES,
  currentEvent,
  loadThis,
}: DataSpinnerProps) => {
  return (
    <>
      {HISTORICDATES.map((item, index) => {
        const { title } = item;
        const idx = index + 1;
        return (
          <div
            key={index}
            className={
              'spinner__shoulder ' +
              (currentEvent === index ? 'spinner__shoulder_active' : '')
            }
            style={{ '--i': idx } as React.CSSProperties}
            onClick={() => loadThis(index)}>
            <div className='spinner__circle-area'>
              <p className='spinner__circle'>
                {idx}
                <span className='spinner__title'>{title}</span>
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};
