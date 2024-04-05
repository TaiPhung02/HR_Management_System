import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";

interface PrivateRouterProps {
    children: ReactNode;
}

export default function PrivateRouter({ children }: PrivateRouterProps) {
    // const token = localStorage.getItem("token");
    const user = useSelector((state: RootState) => state.auth.user);

    return user?.token ? <>{children}</> : <Navigate to="/login" replace />;
}
