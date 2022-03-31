import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";
import useAuth from "../hooks/useAuth";

const AuthLayout = (): JSX.Element => {
    const {isCargando, auth} = useAuth();

    if (isCargando) return <Spinner />

    return (
        <>
        {auth.jwt ? <Navigate to='/me' replace /> :
            <main className="container mx-auto md:grid grid-cols-2 gap-2.5 items-center">
                <Outlet />
            </main>            
        }
        </>
    );
}

export default AuthLayout;