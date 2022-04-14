import { useState } from 'react';

import useAuth from './../../hooks/useAuth';

import Alert, { IAlert } from '../../components/Alert';
import PersonalInfo from '../../components/auth/PersonalInfo';
import EmailChange from './../../components/auth/EmailChange';
import PasswordChange from '../../components/auth/PasswordChange';

const Profile = (): JSX.Element => {
    const {auth: {user}} = useAuth();
    const [usuario, setUsuario] = useState();

    const [alerta, setAlerta] = useState<IAlert>({
        type: '',
        messageList: []
    });

    const [mostrarModal, setMostrarModal] = useState<Boolean>(false);

    const [modalType, setModalType] = useState<string>('');

    return (
        <>
            <h1 className="text-rose-600 mt-2.5 font-bold uppercase text-4xl text-center">Mi Perfil</h1>

            {alerta.type ? <Alert {...alerta} /> : ''}

            {
                mostrarModal 
                ? 
                    (() => {
                        switch (modalType) {
                            case 'info':
                                return <PersonalInfo {...{mostrarModal, setMostrarModal, setAlerta}} />
                            case 'email':
                                return <EmailChange {...{mostrarModal, setMostrarModal, setAlerta}} />
                            case 'password':
                                return <PasswordChange {...{mostrarModal, setMostrarModal, setAlerta}} />
                        }
                    })()
                : 
                    ''
            }

            <div className='p-10 rounded-xl md:shadow-xl md:w-3/4 md:px-32 mx-auto'>
                <h3 className='text-center uppercase text-gray-600 mb-2.5 text-2xl'>Información Personal</h3>
                <button 
                    className='block mx-auto w-full md:w-1/2 uppercase px-8 py-4 bg-green-500 hover:bg-green-600 rounded-xl text-white'
                    onClick={() => {setMostrarModal(true); setModalType('info');}}
                    >
                    Editar información Personal
                </button>
            </div>

            <div className='p-10 rounded-xl md:shadow-xl md:w-3/4 md:px-32 mx-auto'>
                <h3 className='text-center uppercase text-gray-600 mb-2.5 text-2xl'>Seguridad</h3>
                <div className='md:flex gap-2'>
                    <button 
                        className='block mx-auto w-full uppercase px-8 py-4 bg-yellow-500 hover:bg-yellow-600 rounded-xl text-white'
                        onClick={() => {setMostrarModal(true), setModalType('email');}}
                        >
                        Cambiar Correo Electrónico
                    </button>
                    <button 
                        className='block mx-auto w-full uppercase px-8 py-4 bg-yellow-500 hover:bg-yellow-600 rounded-xl text-white mt-2.5 md:mt-0'
                        onClick={() => {setMostrarModal(true), setModalType('password');}}
                        >
                        Cambiar Contraseña
                    </button>
                </div>
            </div>
        </>
    )
}

export default Profile;