import { createBrowserRouter} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { redirectIfUnauthenticated, redirectIfAuthenticated } from "./middlewares/authentication";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CashierPage from "./pages/CashierPage";
const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        loader: redirectIfUnauthenticated,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/cashier',
                element: <CashierPage />
            }
        ]
    },
    {
        path: '/login',
        element: <LoginPage />,
        loader: redirectIfAuthenticated
    }
])

export default router;