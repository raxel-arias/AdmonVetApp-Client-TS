import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import AxiosClient from '../config/axios.config';
import PageTitle from "../components/auth/PageTitle";
import Alert, { IAlert } from './../components/Alert';
import InfoMsg from '../components/InfoMsg';

const Confirm = (): JSX.Element => {
    const [alerta, setAlerta] = useState<IAlert>({
        messageList: [],
        type: ''
    });

    const [cuentaActivada, setCuentaActivada] = useState(false);

    const [cargando, setCargando] = useState(true);

    const {token} = useParams();

    useEffect(() => {
        const activarCuenta = async (): Promise<void> => {
            try {
                const {data: {msg}} = await AxiosClient.get(`/auth/confirm/${token}`);

                setCuentaActivada(true);

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

            setCargando(false);
        }
        activarCuenta();
    }, []);

    return (
        <>
        <div className={`text-center md:text-left p-2 fade`}>
            <PageTitle title={'Confirmando Cuenta...'} />
        </div>
        <div className="mt-5 md:mt-0 p-4 md:shadow-xl rounded-2xl">
            
            {!cargando && 
                (cuentaActivada 
                    ? InfoMsg({tipo: 'info', titulo: 'Activación Exitosa', razon: alerta.messageList[0], links: [
                        {
                            url: '/',
                            descripcion: 'Inicie Sesión Aquí'
                        }
                    ]}) 
                    
                    : InfoMsg({tipo: 'error', titulo: 'Activación Fallida', razon: alerta.messageList[0], links: [
                        {
                            url: '/signup',
                            descripcion: 'Puede regresar a crear una cuenta'
                        },
                        {
                            url: '/',
                            descripcion: 'Inicie Sesión'
                        }
                    ]})
                )
            }
        </div>
       </> 
    );
}

export default Confirm;