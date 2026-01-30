import { useEffect, useState } from 'react';
import { calcMinutesLeft, formatDate } from '../utils/helpers';
import { useLoaderData } from 'react-router-dom';

function Countdown() {
  const { estimatedDelivery } = useLoaderData();

  const [minsLeft, setMinsLeft] = useState(calcMinutesLeft(estimatedDelivery));

  useEffect(() => {
    const countInterval = setInterval(() => {
      setMinsLeft(calcMinutesLeft(estimatedDelivery));
    }, 1000);

    return () => clearInterval(countInterval);
  }, [estimatedDelivery]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
      <p className="font-medium">
        {minsLeft >= 0
          ? `Only ${minsLeft} minutes left 😃`
          : 'Order should have arrived'}
      </p>
      <p className="text-xs text-stone-500">
        (Estimated delivery: {formatDate(estimatedDelivery)})
      </p>
    </div>
  );
}

export default Countdown;
