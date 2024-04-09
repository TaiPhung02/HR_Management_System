import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import ForgotPassWord from "../pages/ForgotPassword/ForgotPassword";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import PrivateRouter from "../components/PrivateRouter/PrivateRouter";
import Employee from "../pages/Employee/Employee";
import NotFound from "../pages/NotFound/NotFound";
import AddNewEmployee from "../pages/AddNewEmployee/AddNewEmployee";
import EditEmployee from "../pages/EditEmployee/EditEmployee";
const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassWord />,
    },
    {
        path: "/",
        element: <AdminLayout />,
        children: [
            {
                path: "/",
                element: (
                    <PrivateRouter>
                        <HomePage />
                    </PrivateRouter>
                ),
            },
            {
                path: "/employee",
                element: (
                    <PrivateRouter>
                        <Employee />
                    </PrivateRouter>
                ),
            },
            {
                path: "/employee/create-or-update",
                element: (
                    <PrivateRouter>
                        <AddNewEmployee />
                    </PrivateRouter>
                ),
            },
            {
                path: `/employee/create-or-update/:id`,
                element: (
                    <PrivateRouter>
                        <AddNewEmployee />
                    </PrivateRouter>
                ),
            },
            {
                path: "/change-password",
                element: (
                    <PrivateRouter>
                        <ChangePassword />
                    </PrivateRouter>
                ),
            },
            {
                path: "/*",
                element: (
                    <PrivateRouter>
                        <NotFound />
                    </PrivateRouter>
                ),
            },
        ],
    },
]);
export default router;
