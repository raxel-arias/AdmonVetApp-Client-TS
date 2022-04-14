import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import useAuth from './../hooks/useAuth';

import Header from "../components/private/Header";
import Footer from "../components/private/Footer";

import Spinner from "../components/spinner/Spinner";

const SessionLayout = (): JSX.Element => {
    const {auth, isCargando} = useAuth();
    
    if (isCargando) return <Spinner />
    
    if (!auth.user.id) return <Navigate to="/" replace />

    return (
        <>
            <Header />
            <main className={`fade`}>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default SessionLayout;