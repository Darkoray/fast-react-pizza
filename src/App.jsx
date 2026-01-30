import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { loader as menuLoader } from './features/menu/Menu';
import { action as createOrderAction } from './features/order/CreateOrder';
import { loader as orderLoader } from './features/order/Order';
import { action as updateOrderAction } from './features/order/UpdateOrder';

const Error = lazy(() => import('./ui/Error'));
const Loader = lazy(() => import('./ui/Loader'));
const AppLayout = lazy(() => import('./ui/AppLayout'));
const Home = lazy(() => import('./ui/Home'));
const Cart = lazy(() => import('./features/cart/Cart'));
const Menu = lazy(() => import('./features/menu/Menu'));
const CreateOrder = lazy(() => import('./features/order/CreateOrder'));
const Order = lazy(() => import('./features/order/Order'));

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        action: updateOrderAction,
        errorElement: <Error />,
      },
      {
        path: '*',
        element: <Error />,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
