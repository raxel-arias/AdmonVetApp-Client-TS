import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

//Hook
import useAuth from "../../hooks/useAuth";

import Alert from "../../components/Alert";
import PageTitle from '../../components/auth/PageTitle';
import { IAlert } from '../../components/Alert';
import { UsuarioLogin } from "../../interfaces/usuario.interface";
import AxiosClient from "../../config/axios.config";
import Spinner from "../../components/spinner/Spinner";

const Login = (): JSX.Element => {
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        email: '',
        password: ''
    });
    const [alerta, setAlerta] = useState<IAlert>({
        messageList: [],
        type: ''
    });
    const navigate = useNavigate();
    const {auth, setAuth, isCargando} = useAuth();

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();

        if (!usuario.email || !usuario.password) {
            setAlerta({
                type: 'error',
                messageList: ['Campos Vacíos']
            });
            return;
        }

        try {
            const {data, data: {msg, data: {usuarioFound, jwtToken}}} = await AxiosClient.post('/auth/login', usuario);

            setAuth({
                ...auth,
                jwt: jwtToken,
                user: {
                    id: usuarioFound._id,
                    nombre: usuarioFound.nombre,
                    apellido: usuarioFound.apellido,
                    email: usuarioFound.email,
                    ...(usuarioFound.telefono && {telefono: usuarioFound.telefono})
                }
            });

            localStorage.setItem('admonvetapp_jwt', jwtToken);

            navigate('/me', {replace: true});
        } catch (error: any) {
            console.log(error);
            const {response: {data: {msg}}} = error;

            setAlerta({
                type: 'error',
                messageList: [msg]
            });
        }
    }

    return(
        <>
        <div className={`text-center md:text-left p-2 fade`}>
            <PageTitle title={'Iniciar Sesión'} />
        </div>
        <div className="mt-5 md:mt-0 p-4 md:shadow-xl rounded-2xl">

            {(alerta.type && <Alert {...alerta}></Alert>)}

            <form className="" onSubmit={handleSubmit}>
                <div>
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Email
                    </label>
                    <input 
                        className="inputs border w-full p-3 mt-3 bg-gray-200" 
                        type="email" 
                        placeholder="Tu Email"
                        value={usuario.email}
                        onChange={ev => setUsuario({...usuario, email: ev.target.value})}
                    />
                    <div className="inputs-border-bottom"></div>
                </div>
                <div>
                    <label className="uppercase text-gray-600 block text-xl font-bold mt-2.5">
                        Contraseña
                    </label>
                    <input 
                        className="inputs border w-full p-3 mt-3 bg-gray-200" 
                        type="password" 
                        placeholder="Tu contraseña"
                        value={usuario.password}
                        onChange={ev => setUsuario({...usuario, password: ev.target.value})}
                    />
                    <div className="inputs-border-bottom"></div>
                </div>

                <input className="button mt-5  
                    px-6 py-4 w-full md:w-auto rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase" 
                type="submit" value="Acceder"/>
            </form>

            <div className="mt-5 md:mt-2.5">
                <nav className="text-gray-500 flex justify-around">
                    <Link to="/signup" className="hover:text-rose-700 hover:underline">Crear una cuenta</Link>
                    <Link to="/recover-account" className="hover:text-rose-700 hover:underline">¿Contraseña olvidada?</Link>
                </nav>
            </div>
        </div>
        </>
    );
}

export default Login;