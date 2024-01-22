import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store.ts";
import App from "./App.tsx";
import Login from "./Pages/LoginPage/Login.tsx";
import ProductDetail from "./Pages/ProductDetail/ProductDetail.tsx";
import Payment from "./Pages/Payment/Payment.tsx";
import OrderReceipt from "./Pages/Payment/OrderReceipt.tsx";
import Register from "./Pages/RegisterPage/Register.tsx";
import UserPage from "./Pages/UserPage/UserPage.tsx";
import "./Styles/Responsive/Responsive.css";
import "../src/Styles/index.css";
import Auth from "./components/Auth/index.tsx";
import NoAuth from "./components/NoAuth/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
  },
  {
    path: "/signin",
    element: (
      <Provider store={store}>
        <NoAuth>
          <Login />
        </NoAuth>
      </Provider>
    ),
  },
  {
    path: "/signup",
    element: (
      <Provider store={store}>
        <Register />
      </Provider>
    ),
  },
  {
    path: "/game/:id",
    element: (
      <Provider store={store}>
        <Auth>
          <ProductDetail />
        </Auth>
      </Provider>
    ),
  },
  {
    path: "/payment/:id/:amount/:category/:name/:priceName/:priceValue",
    element: (
      <Provider store={store}>
        <Auth>
          <Payment />
        </Auth>
      </Provider>
    ),
  },
  {
    path: "/receipt/:order_id",
    element: (
      <Provider store={store}>
        <Auth>
          <OrderReceipt />
        </Auth>
      </Provider>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Provider store={store}>
        <Auth>
          <UserPage />
        </Auth>
      </Provider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
