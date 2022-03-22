import { useState } from "react";
import { Link } from "react-router-dom";
import AxiosClient from "../config/axios.config";
import PageTitle from "../components/auth/PageTitle";
import Alert, { IAlert } from './../components/Alert';

const RecoverAccount = (): JSX.Element => {
    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState<IAlert>({
        type: '',
        messageList: []
    });

    const recoverAccount = async (ev: React.FormEvent): Promise<void> => {
        ev.preventDefault();

        if (!email) {
            setAlerta({
                type: 'error',
                messageList: ['Ingrese un email']
            });
            return;
        }

        try {
            const {data: {msg, data:{expiracion}}} = await AxiosClient.post('/auth/recover-account', {email});
            
            setAlerta({
                type: 'info',
                messageList: [msg, `Caducidad: ${expiracion}`]
            });
        } catch (error: any){
            const {response: {data: {msg}}} = error;
            setAlerta({
                type: 'error',
                messageList: [msg]
            });
        }
    }

    return (
        <>
        <div className={`text-center md:text-left p-2 fade`}>
            <PageTitle title={'Recuperar Acceso'} />
        </div>
        <div className="mt-5 md:mt-0 p-4 md:shadow-xl rounded-2xl">
            
            {alerta.type ? <Alert {...alerta}/> : ''}
            
            <form className="" onSubmit={recoverAccount}>
                <div>
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Ingrese su email de acceso
                    </label>
                    <input 
                        className="inputs border w-full p-3 mt-3 bg-gray-200" 
                        type="email" 
                        placeholder="Tu Email"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <div className="inputs-border-bottom"></div>
                </div>

                <input className="button mt-5  
                    px-6 py-4 w-full md:w-auto rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase" 
                type="submit" value="Obtener Código"/>
            </form>

            <div className="mt-5 md:mt-2.5">
                <nav className="text-gray-500 flex justify-around">
                    <Link to="/" className="hover:text-rose-700 hover:underline">¿Ya tienes una cuenta?</Link>
                    <Link to="/signup" className="hover:text-rose-700 hover:underline">Crear una Cuenta</Link>
                </nav>
            </div>
        </div>
        </>
    );
}

export default RecoverAccount;