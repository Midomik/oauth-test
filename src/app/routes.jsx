import { Route, Routes } from 'react-router-dom';
import App from './App';
import {
  AllCustomers,
  AllProducts,
  AllSuppliers,
  Dashboard,
  Login,
  NotFound,
  UserFriends,
} from '../pages';
import { PrivateRoute } from '../app/providers/PrivateRoute';
import { PublicRoute } from '../app/providers/PublicRoute';
import { AllOrders } from '../pages/AllOrders';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<PrivateRoute component={<Dashboard />} />} />
        <Route
          path="orders"
          element={<PrivateRoute component={<AllOrders />} />}
        />
        <Route
          path="customers"
          element={<PrivateRoute component={<AllCustomers />} />}
        />
        <Route
          path="products"
          element={<PrivateRoute component={<AllProducts />} />}
        />
        <Route
          path="suppliers"
          element={<PrivateRoute component={<AllSuppliers />} />}
        />
        <Route
          path="user-friends"
          element={<PrivateRoute component={<UserFriends />} />}
        />
      </Route>

      <Route path="login" element={<PublicRoute component={<Login />} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
