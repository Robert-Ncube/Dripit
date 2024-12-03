import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./components/admin/layout";
import Dashboard from "./pages/admin/Dashboard";
import OrdersView from "./pages/admin/OrdersView";
import Products from "./pages/admin/Products";
import ShoppingLayout from "./components/shopping/layout";
import Account from "./pages/shopping/Account";
import Listing from "./pages/shopping/Listing";
import Home from "./pages/shopping/Home";
import Checkout from "./pages/shopping/Checkout";
import CheckAuth from "./components/common/checkAuth";
import { Toaster } from "react-hot-toast";
import HomeComponent from "./pages/HomeComponent";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/authSlice";
import { useEffect } from "react";
import { Skeleton } from "./components/ui/skeleton";
import { LuLoader2 } from "react-icons/lu";
import PaypalReturn from "./pages/shopping/PaypalReturn";
import PaymentSuccess from "./pages/shopping/PaymentSuccess";
import Search from "./pages/shopping/Search";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is authenticated on page load

    const token = JSON.parse(sessionStorage.getItem("token"));

    dispatch(checkAuth(token));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-4 justify-center text-center w-screen h-full">
        <LuLoader2 size={40} className="animate-spin" />
        <h2 className="text-xl text-gray-800">Loading...</h2>
        <Skeleton className="w-[600px] h-[60px]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<OrdersView />} />
          <Route path="products" element={<Products />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="account" element={<Account />} />
          <Route path="listing" element={<Listing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="search" element={<Search />} />
          <Route path="paypal-return" element={<PaypalReturn />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
        </Route>

        <Route
          path="*"
          element={
            <div className="flex mx-auto bg-slate-400 w-screen text-lg text-gray-800">
              <h1>404 - Not Found!</h1>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
