import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  copyToClipboard,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import OrderItem from '../order/OrderItem';
import Button from '../../ui/Button';
import { useEffect, useState } from 'react';
import UpdateOrder from './UpdateOrder';
import Countdown from '../../ui/Countdown';

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') {
      fetcher.load('/menu');
    }
  }, [fetcher]);

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const { id, status, priority, priorityPrice, orderPrice, cart } = order;

  const [isCopied, setIsCopied] = useState(false);
  async function handleClick() {
    const { success } = await copyToClipboard(window.location.href);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  }

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">
          Order #
          {
            <span className="cursor-pointer rounded-md bg-slate-200 px-2 transition-colors hover:bg-slate-300 active:bg-slate-200">
              <Button onClick={() => copyToClipboard(id)}>{id}</Button>
            </span>
          }{' '}
          status
        </h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="px rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <Countdown />

      <ul className="divider-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      <div className="flex justify-between">
        <Button onClick={handleClick} type="secondary">
          {!isCopied ? 'Copy link' : 'Copied!'}
        </Button>
        {!priority && <UpdateOrder order={order} />}
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
