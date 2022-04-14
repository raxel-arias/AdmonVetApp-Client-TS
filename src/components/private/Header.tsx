import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';

import HeaderLogo from "./HeaderLogo";
import useAuth from './../../hooks/useAuth';

const Header = (): JSX.Element => {
    const {auth, setAuth, cerrarSesion} = useAuth();
    const location = useLocation();
    
    const salir = (): void => {
        Swal.fire({
            title: "Cerrar Sesión",
            text: "¿Desea Salir?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "Cancelar",
        })
        .then(resultado => {
            if (resultado.value) {
                cerrarSesion();
            }
        });
    }

    return (
        <>
            <header className="md:flex md:justify-between bg-gray-400">
                <HeaderLogo />
                <nav className="z-10 fixed bottom-0 left-0 right-0 md:static bg-rose-500 md:bg-inherit flex justify-evenly text-center text-white leading-4 uppercase">
                    <Link to="/me/citas" className="w-1/2 py-4 md:px-8 border-r-white border-r-2 hover:bg-rose-600 flex flex-col justify-center">Citas</Link>
                    {
                        location.pathname !== '/me/profile' 
                        ?
                            <Link to="/me/profile" className="w-1/2 py-4 md:px-8 hover:bg-rose-600 flex flex-col justify-center">Perfil</Link>
                        :
                            <button 
                                type="button" 
                                className="w-1/2 py-4 md:px-8 hover:bg-rose-600 uppercase leading-4"
                                onClick={salir}
                            >
                                Cerrar Sesión
                            </button>
                    }
                </nav>
            </header>
        </>
    )
}

export default Header;