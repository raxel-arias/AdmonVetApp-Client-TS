import useAuth from "../../hooks/useAuth";

import ListadoPacientes from "../../components/private/admin/ListadoPacientes";
import FormularioPacientes from './../../components/private/admin/FormularioPacientes';

const AdmonVet = (): JSX.Element => {
    const {auth} = useAuth();

    return (
        <>
            <p className="text-gray-600 uppercase font-bold text-center md:text-left">Bienvenido, {auth.user.nombre}</p>
        
            <ListadoPacientes {...{length: 3}} />
        </>
    )
}

export default AdmonVet;