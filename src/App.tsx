import Main from "./components/Main";
import AuthForm from "./features/customers/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";

const routes = [
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <AuthForm defaultIsLogin={true} /> },
  { path: "/register", element: <AuthForm defaultIsLogin={false} /> },
  { path: "/main", element: <Main /> },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
