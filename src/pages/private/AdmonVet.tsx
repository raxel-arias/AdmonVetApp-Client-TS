import useAuth from "../../hooks/useAuth";

import ListadoPacientes from "../../components/private/admin/ListadoPacientes";
import FormularioPacientes from './../../components/private/admin/FormularioPacientes';

const AdmonVet = (): JSX.Element => {
    const {auth} = useAuth();

    return (
        <>
            <p className="text-gray-600 uppercase font-bold text-center md:text-left">Bienvenido, {auth.user.nombre}</p>
            <h1 className="text-rose-600 mt-2.5 font-bold uppercase text-4xl text-center">Citas Recientes</h1>
        
        </>
    )
}

export default AdmonVet;