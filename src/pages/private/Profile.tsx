import useAuth from './../../hooks/useAuth';
import { useState } from 'react';

const Profile = (): JSX.Element => {
    const {auth: {user}} = useAuth();
    const [usuario, setUsuario] = useState();

    const handleSubmit = async (ev: React.FormEvent): Promise<void> => {
        ev.preventDefault();
    }

    return (
        <>
            <h1 className="text-rose-600 mt-2.5 font-bold uppercase text-4xl text-center">Mi Perfil</h1>

            <form className="p-5 md:w-3/4 lg:w-1/2 mx-auto md:shadow-2xl rounded-2xl"
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
                        value={user.email}
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
                        value={user.nombre}
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
                        value={user.apellido}
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
                        value=''
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
                        value=''
                    />
                    <div className="inputs-border-bottom"></div>
                </div>

                <input 
                    className="button my-5 px-6 py-4 w-full md:w-auto rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase" 
                    type="submit" 
                    value="Actualizar Información"/>
            </form>
            <div className='md:shadow-xl rounded-2xl'>

            </div>
        </>
    )
}

export default Profile;