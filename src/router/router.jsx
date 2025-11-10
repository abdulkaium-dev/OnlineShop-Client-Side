import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Component/Home";
import Login from "../Component/Login";
import Register from "../Component/Register";
import UpcomingProducts from "../Component/UpcomingProducts";
import JoinUs from "../Component/JoinUs";
import Dashboard from "../Component/Dashboard";
import MyReviews from "../Component/MyReviews";
import AddProducts from "../Component/AddProduct";
import AllReviews from "../Component/AllReviews";
import ServeProducts from "../Component/ServeProducts";
import Products from "../Component/Products";
import RequestedProducts from "../Component/RequestedProducts";
import ProductDetails from "../Component/ProductDetails";
import CheckoutPage from "../Component/CheckoutPage";
import MyProfile from "../Component/MyProfile";
import EditReview from "../Component/EditReview";
import AllProducts from "../Component/AllProducts";
import Unauthorized from "../Component/Unauthorized";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../Component/ManageUsers";
import ViewProducts from "../Component/ViewProducts";
import { AdminProfile } from "../Component/AdminProfile";
import UpcomingProductsAdmin from "../Component/UpcomingProductsAdmin";
import ErrorPage from "../Component/Error";
import Newsletter from "../Component/Newsletter";
import UpdateProduct from "../Component/UpdateProduct";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // Public Meals routes
      { path: "products", element: <Products /> },
      { path: "product/:id", element: <ProductDetails />},
      { path: "upcoming-products", element: <UpcomingProducts /> },
      { path: "join-us", element: <JoinUs /> },
      { path: "checkout/:packageName", element: <CheckoutPage /> },
      { path: "unauthorized", element: <Unauthorized /> },
      { path: "newsletter", element: <Newsletter /> },

      // Dashboard routes - Protected
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [

          // User Routes
          {
            path: "my-profile",
            element: (
              <UserRoute>
                <MyProfile />
              </UserRoute>
            ),
          },
          {
            path: "requested-products",
            element: (
              <UserRoute>
                <RequestedProducts />
              </UserRoute>
            ),
          },
          {
            path: "my-reviews",
            element: (
              <UserRoute>
                <MyReviews />
              </UserRoute>
            ),
          },
          // {
          //   path: "payment-history",
          //   element: (
          //     <UserRoute>
          //       <PaymentHistory />
          //     </UserRoute>
          //   ),
          // },
          {
            path: "edit-review/:id",
            element: (
              <UserRoute>
                <EditReview />
              </UserRoute>
            ),
          },

          // Admin Routes
          {
            path: "admin-profile",
            element: (
              <AdminRoute>
                <AdminProfile />
              </AdminRoute>
            ),
          },
          {
            path: "manage-users",
            element: (
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            ),
          },
          {
            path: "add-product",
            element: (
              <AdminRoute>
                <AddProducts />
              </AdminRoute>
            ),
          },
          {
            path: "all-products",
            element: (
              <AdminRoute>
                <AllProducts />
              </AdminRoute>
            ),
          },
          {
            path: "products/update/:id",
            element: (
              <AdminRoute>
                <UpdateProduct />
              </AdminRoute>
            ),
          },
          {
            path: "view-product/:id",
            element: (
              <AdminRoute>
                <ViewProducts />
              </AdminRoute>
            ),
          },
          {
            path: "all-reviews",
            element: (
              <AdminRoute>
                <AllReviews />
              </AdminRoute>
            ),
          },
          {
            path: "serve-products",
            element: (
              <AdminRoute>
                <ServeProducts />
              </AdminRoute>
            ),
          },
          {
            path: "upcoming-products",
            element: (
              <AdminRoute>
                <UpcomingProductsAdmin />
              </AdminRoute>
            ),
          },
        ],
      },

      // Catch-all for unknown routes
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);
