import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AxiosClient from "../config/axios.config";

import PageTitle from "../components/auth/PageTitle";
import InfoMsg from "../components/InfoMsg";
import Alert from "./../components/Alert";
import { IAlert } from './../components/Alert';

const ResetPassword = (): JSX.Element => {
    const {token} = useParams();

    const [alerta, setAlerta] = useState<IAlert>({type: '', messageList: []});
    const [password, setPassword] = useState('');
    const [isCargando, setIsCargando] = useState(true);
    const [isValidado, setIsValidado] = useState(false);
    const [isActualizado, setIsActualizado] = useState(false);

    useEffect((): void => {
        const validarTokenReseteo = async (): Promise<void> => {
            try {
                const {data: {msg}} = await AxiosClient.get(`/auth/reset-password/${token}`);

                setIsValidado(true);
                setAlerta({
                    type: 'info',
                    messageList: [msg]
                });
            } catch (error: any) {
                const {response: {data: {msg}}} = error;
                setAlerta({
                    type: 'error',
                    messageList: [msg]
                });
            }

            setIsCargando(false);
        }
        validarTokenReseteo();
    }, []);

    const resetearPassword = async (ev: React.FormEvent): Promise<void> => {
        ev.preventDefault();

        if (!password) {
            setAlerta({
                type: 'error',
                messageList: ['La contraseña no puede estar vacía']
            });
            return;
        }

        if (password.length < 8) {
            setAlerta({
                type: 'error',
                messageList: ['La contraseña debe tener al menos 8 caracteres']
            });
            return;
        }
        
        setIsCargando(true);
        try {
            const {data: {msg}} = await AxiosClient.post(`/auth/reset-password/${token}`, {password});
            console.log(token);
            setIsActualizado(true);

            setAlerta({
                type: 'info',
                messageList: [msg]
            });
        } catch (error: any) {
            const {response: {data: {msg}}} = error;
            setAlerta({
                type: 'error',
                messageList: [msg]
            });
        }

        setIsCargando(false);
    }
 
    const FormularioReseteo: JSX.Element = (
        <>
        {(alerta.type === 'error' && isValidado)? <Alert {...alerta}/> : ''}
        {!isActualizado 
            ? 
                <form className="" onSubmit={resetearPassword}>
                    <div>
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Ingrese su nueva contraseña
                        </label>
                        <input 
                            className="inputs border w-full p-3 mt-3 bg-gray-200" 
                            type="password" 
                            placeholder="Tu contraseña"
                            value={password}
                            onChange={ev => setPassword(ev.target.value)}
                        />
                        <div className="inputs-border-bottom"></div>
                    </div>

                    <input className="button mt-5  
                        px-6 py-4 w-full md:w-auto rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase" 
                        type="submit" value="Obtener Código"/>
                </form>
            : 
                InfoMsg({
                    tipo: 'info',
                    titulo: 'Recuperación Exitosa',
                    razon: alerta.messageList[0],
                    links: [
                        {
                            url: '/',
                            descripcion: 'Ya puede iniciar sesión'
                        }
                ]
            }) 
        }
        </>
    );

    return (
        <>
        <div className={`text-center md:text-left p-2 fade`}>
            <PageTitle title={'Resetear Password'} />
        </div>
        <div className="mt-5 md:mt-0 p-4 md:shadow-xl rounded-2xl">
            {!isCargando && 
                (isValidado
                    ? FormularioReseteo
                    : InfoMsg({
                        tipo: 'error',
                        titulo: 'Recuperación Fallida',
                        razon: alerta.messageList[0],
                        links: [
                            {
                                url: '/signup',
                                descripcion: 'Puede regresar a crear una cuenta'
                            },
                            {
                                url: '/',
                                descripcion: 'Inicie Sesión'
                            }
                        ]
                    })
                )
            }
        </div>            
        </>
    );
}

export default ResetPassword;