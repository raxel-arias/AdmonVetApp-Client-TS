import { useState, useEffect } from 'react';
import AxiosClient from '../../../config/axios.config';

import moment from 'moment';

import useAuth from './../../../hooks/useAuth';
import usePacientes from '../../../hooks/usePacientes';

import Alert, {IAlert} from '../../Alert';

import { IPaciente } from './../../../interfaces/paciente.interface';

const FormularioPacientes = (): JSX.Element => {
    const {auth: {user, jwt}} = useAuth();
    const {nuevoPaciente, pacientes, setPacientes, pacienteEdicion, setPacienteEdicion, actualizarPaciente} = usePacientes();
    const [alerta, setAlerta] = useState<IAlert>({
        type: '',
        messageList: []
    });
    const [isEditando, setIsEditando] = useState<boolean>(false);
    const [mostrar, setMostrar] = useState<boolean>(false);
    const [paciente, setPaciente] = useState<IPaciente>({
        nombre: '',
        sintomas: '',
        fechaAlta: '',
        propietario: {
            nombre: '',
            apellido: '',
            email: ''
        }
    });

    useEffect(() => {
        (() => {
            if (pacienteEdicion._id) {
                setMostrar(true);
                setPaciente(pacienteEdicion);
                setIsEditando(true);
            } else {
                setMostrar(false);
                setPaciente({
                    nombre: '',
                    sintomas: '',
                    fechaAlta: '',
                    propietario: {
                        nombre: '',
                        apellido: '',
                        email: ''
                    }
                });
                setIsEditando(false);
            }
        })();
    }, [pacienteEdicion]);

    const handleSubmit = async (ev: React.FormEvent): Promise<void> => {
        ev.preventDefault();

        if (Object.values(paciente).some(val => !val)) {
            setAlerta({
                type: 'error',
                messageList: ['Campos vacíos']
            });
            return;
        }

        if (Object.values(paciente['propietario']).some(val => !val)) {
            setAlerta({
                type: 'error',
                messageList: ['Campos del propietario vacíos']
            });
            return;
        }

        setAlerta({
            type: '',
            messageList: []
        });

        try {
            if (!isEditando) {
                const {data: {msg, data: {pacienteAgregado}}} = await nuevoPaciente(paciente);
                
                setAlerta({
                    type: 'info',
                    messageList: [msg]
                });
    
                setPaciente({
                    nombre: '',
                    sintomas: '',
                    fechaAlta: '',
                    propietario: {
                        nombre: '',
                        apellido: '',
                        email: ''
                    }
                });

                setPacientes([...pacientes, pacienteAgregado]);
                
                return;
            }

            const {data: {msg, data: {pacienteActualizado}}} = await actualizarPaciente(paciente);

            setAlerta({
                type: 'info',
                messageList: [msg]
            });

            setPacienteEdicion({
                nombre: '',
                sintomas: '',
                fechaAlta: '',
                propietario: {
                    nombre: '',
                    apellido: '',
                    email: ''
                }
            });
        } catch (error: any) {
            const {response: {data: {msg}}} = error;
            setAlerta({
                type: 'error',
                messageList: [msg]
            });
        }

        setTimeout(() => {
            setAlerta({type: '', messageList: []});
        }, 1500);
    }
    return (
        <>
            <div className='md:hidden'>
                <button 
                    className='fixed bottom-14 right-3 py-3 px-5 bg-green-400 hover:bg-green-600 text-white uppercase text-2xl rounded-full z-10 flex flex-col justify-center'
                    onClick={() => {mostrar ? setMostrar(false) : setMostrar(true)}}
                    >
                    {mostrar ? '-' : '+'}
                </button>
            </div>
            
            {alerta.type && <Alert {...alerta}/>}

            <form className={`${mostrar || pacienteEdicion._id ? 'block' : 'hidden'} md:block p-5 mx-auto md:shadow-2xl rounded-2xl fade`}
                onSubmit={handleSubmit}
                >
                <div>
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Nombre del paciente
                    </label>
                    <input 
                        className="inputs border w-full p-3 mt-3 bg-gray-200" 
                        type="text" 
                        placeholder="Paciente" 
                        value={paciente.nombre}
                        onChange={ev => setPaciente({...paciente, nombre: ev.target.value})}
                    />
                    <div className="inputs-border-bottom"></div>
                </div>
                <div>
                    <label className="uppercase text-gray-600 block text-xl font-bold mt-2.5">
                        Fecha y Hora de Alta
                    </label>
                    <input 
                        className="inputs border w-full p-3 mt-3 bg-gray-200"
                        type="datetime-local" 
                        placeholder="Fecha y Hora" 
                        value={moment(paciente.fechaAlta).format('YYYY-MM-DDTHH:mm:ss')}
                        onChange={ev => setPaciente({...paciente, fechaAlta: ev.target.value})}
                    />
                    <div className="inputs-border-bottom"></div>
                </div>
                <div>
                    <label className="uppercase text-gray-600 block text-xl font-bold mt-2.5">
                        Síntomas
                    </label>
                    <textarea
                        id="sintomas"
                        className="inputs border w-full p-3 mt-3 bg-gray-200" 
                        placeholder="Describir los síntomas" 
                        value={paciente.sintomas}
                        onChange={ev => setPaciente({...paciente, sintomas: ev.target.value})}
                    />
                    <div className="inputs-border-bottom"></div>
                </div>                
                <div className='mt-2.5'>
                    <p className='uppercase text-rose-500 font-bold text-2xl'>Datos del Propietario</p>
                    <div>
                        <label className="uppercase text-gray-600 block text-xl font-bold mt-2.5">
                            Nombre
                        </label>
                        <input 
                            className="inputs border w-full p-3 mt-3 bg-gray-200"
                            type="text" 
                            placeholder="Propietario" 
                            value={paciente.propietario.nombre}
                            onChange={ev => setPaciente({...paciente, propietario: {...paciente.propietario, nombre: ev.target.value}})}
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
                                placeholder="Apellido" 
                                value={paciente.propietario.apellido}
                                onChange={ev => setPaciente({...paciente, propietario: {...paciente.propietario, apellido: ev.target.value}})}
                            />
                        <div className="inputs-border-bottom"></div>
                    </div>
                    <div>
                        <label className="uppercase text-gray-600 block text-xl font-bold mt-2.5">
                            Email
                        </label>
                        <input 
                            className="inputs border w-full p-3 mt-3 bg-gray-200"
                            type="email" 
                            placeholder="Email" 
                            value={paciente.propietario.email}
                            onChange={ev => setPaciente({...paciente, propietario: {...paciente.propietario, email: ev.target.value}})}
                        />
                        
                        <div className="inputs-border-bottom"></div>
                    </div>
                </div>
                <div className='flex relative'>
                    <input 
                        className="button my-5 px-6 py-4 w-full rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase" 
                        type="submit" 
                        value={isEditando ? 'Actualizar' : 'Crear'}/>
                </div>
            </form>
        </>
    );
}

export default FormularioPacientes;