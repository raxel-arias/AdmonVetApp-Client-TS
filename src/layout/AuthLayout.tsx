import { Outlet } from "react-router-dom";
import HeaderLogo from './../components/HeaderLogo';

const AuthLayout = (): JSX.Element => {
    return (
        <>
        <HeaderLogo />

        <main className="container mx-auto md:grid grid-cols-2 gap-2.5 items-center">
            <Outlet />
        </main>
        </>
    );
}

export default AuthLayout;