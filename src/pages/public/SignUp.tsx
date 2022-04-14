import { useState } from "react";
import { Link } from "react-router-dom";
import AxiosClient from "../../config/axios.config";
import { UsuarioSignUp } from '../../interfaces/usuario.interface';
import Alert, {IAlert} from '../../components/Alert';
import PageTitle from '../../components/auth/PageTitle';

const SignUp = (): JSX.Element => {
    const [usuario, setUsuario] = useState<UsuarioSignUp>({
        nombre: '', 
        apellido: '',
        email: '', 
        password: '', 
        confirmarPassword: ''
    });

    const [alerta, setAlerta] = useState<IAlert>({
        messageList: [], 
        type: ''
    });

    const handleSubmit = (ev: React.FormEvent): void => {
        ev.preventDefault();

        if (Object.values(usuario).some(value => !value)) {
            
            setAlerta({
                type: 'error',
                messageList: ['Campos Vacíos']
            });

            return;
        }

        if (usuario.password !== usuario.confirmarPassword) {
            
            setAlerta({
                type: 'error',
                messageList: ['Ambas contraseñas no coinciden']
            }); 

            return;
        }

        if (usuario.password!.length < 8) {
            
            setAlerta({
                type: 'error',
                messageList: ['La contraseña debe tener al menos 8 caracteres']
            });

            return;
        }

        let {confirmarPassword, ...usuarioRegistro} = usuario; 
    
        (async () => {
            try {
                const {data:{msg, data:{ alertaToken}}} = await AxiosClient.post(`/auth/signup`, usuarioRegistro);

                setUsuario({
                    nombre: '', 
                    apellido: '',
                    email: '', 
                    password: '', 
                    confirmarPassword: ''
                });

                setAlerta({
                    type: 'info',
                    messageList: [msg, (alertaToken && alertaToken)]
                });
            } catch (error: any){
                const {response: {data: {msg}}} = error;
                setAlerta({
                    type: 'error',
                    messageList: [msg]
                });
            }
        })();
    }

    return (
        <>
        <div className={`text-center md:text-left p-2 fade`}>
            <PageTitle title={'Crear una Cuenta'} />
        </div>
        <div className="mt-5 md:mt-0 p-4 md:shadow-xl rounded-2xl">

            {alerta.type ? <Alert {...alerta}/> : ''}

            <form className=""
                onSubmit={handleSubmit}
                >
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
                        Nombre
                    </label>
                    <input 
                        className="inputs border w-full p-3 mt-3 bg-gray-200"
                        type="text" 
                        placeholder="Tu nombre" 
                        value={usuario.nombre}
                        onChange={ev => setUsuario({...usuario, nombre: ev.target.value})}
                    />
                    <div className="inputs-border-bottom"></div>
                </div>
                <div>
                    <label className="uppercase text-gray-600 block text-xl font-bold mt-2.5">
                        Apellido
                    </label>
                    <input 
                        className="inputs border w-full p-3 mt-3 bg-gray-200" 
                        type="text" 
                        placeholder="Tu apellido" 
                        value={usuario.apellido}
                        onChange={ev => setUsuario({...usuario, apellido: ev.target.value})}
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
                <div>
                    <label className="uppercase text-gray-600 block text-xl font-bold mt-2.5">
                        Confirmar Contraseña
                    </label>
                    <input 
                        className="inputs border w-full p-3 mt-3 bg-gray-200" 
                        type="password" 
                        placeholder="Vuelve a introducir tu contraseña" 
                        value={usuario.confirmarPassword}
                        onChange={ev => setUsuario({...usuario, confirmarPassword: ev.target.value})}
                    />
                    <div className="inputs-border-bottom"></div>
                </div>

                <input 
                    className="button mt-5 px-6 py-4 w-full md:w-auto rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase" 
                    type="submit" 
                    value="Crear Cuenta"/>
            </form>

            <div className="mt-5 md:mt-2.5">
                <nav className="text-gray-500 flex justify-around">
                    <Link to="/" className="hover:text-rose-700 hover:underline">¿Ya tienes una cuenta?</Link>
                </nav>
            </div>
        </div>
        </>
    );
}

export default SignUp;