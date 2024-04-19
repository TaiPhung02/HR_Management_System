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
    
    if (user) {
        return <>{children}</>;
    } else {
        return <Navigate to="/login" />;
    }
}
