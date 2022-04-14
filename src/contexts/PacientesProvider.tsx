import { createContext, useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';

import moment from 'moment';

import AxiosClient from "../config/axios.config";
import { IPaciente } from "../interfaces/paciente.interface";
import useAuth from './../hooks/useAuth';

interface IPacienteContext {
    pacientes: IPaciente[],
    setPacientes: React.Dispatch<React.SetStateAction<IPaciente[]>>,
    pacienteEdicion: IPaciente
    setPacienteEdicion: React.Dispatch<React.SetStateAction<IPaciente>>,
    nuevoPaciente: (paciente: IPaciente) => Promise<any>
    actualizarPaciente: (paciente: IPaciente) => Promise<any>,
    actualizarEstadoPaciente: (id: string) => Promise<any>,
    eliminarPaciente: (id: string) => Promise<any>
}

const pacientesContextDefault: IPacienteContext = {
    pacientes: [],
    setPacientes: pacientes => {},
    setPacienteEdicion: paciente => {},
    pacienteEdicion: {
        nombre: '',
        sintomas: '',
        fechaAlta: '',
        propietario: {
            nombre: '',
            apellido: '',
            email: ''
        }
    },
    nuevoPaciente: async () => {},
    actualizarPaciente: async () => {},
    actualizarEstadoPaciente: async () => {},
    eliminarPaciente: async () => {}
}

const PacientesContext = createContext(pacientesContextDefault);

export const PacientesProvider: React.FC<React.ReactNode> = ({children}) => {
    const location = useLocation();

    const {auth} = useAuth();

    const [pacientes, setPacientes] = useState<IPaciente[]>(pacientesContextDefault.pacientes);
    const [pacienteEdicion, setPacienteEdicion] = useState<IPaciente>(pacientesContextDefault.pacienteEdicion);

    useEffect(() => {
        listadoPacientes();
    }, [location]);

    const nuevoPaciente = (paciente: IPaciente): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                const fechaHora = moment(paciente.fechaAlta).format('YYYY-MM-DD HH:mm:ss');
                paciente.fechaAlta = fechaHora;

                const response = await AxiosClient.post('/pacientes/nuevo', paciente, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.jwt}`
                    }
                });
                resolve(response);
            } catch (error: any) {
                reject(error);
            }
        });
    }

    const actualizarPaciente = (paciente: IPaciente): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await AxiosClient.put(`/pacientes/editar/${paciente._id}`, paciente, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.jwt}`
                    }
                });

                await listadoPacientes();
                resolve(response);
            } catch (error: any) {
                reject(error);
            }
        });
    }

    const actualizarEstadoPaciente = (id: string): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await AxiosClient.put(`/pacientes/actualizar-estado/${id}`, {}, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.jwt}`
                    }
                });
                await listadoPacientes();
                resolve(response);
            } catch (error: any) {
                reject(error);
            }
        });
    }

    const eliminarPaciente = (id: string): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await AxiosClient.delete(`/pacientes/eliminar/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.jwt}`
                    }
                });
                await listadoPacientes();
                resolve(response);
            } catch (error: any) {
                reject(error);
            }
        });
    }

    const listadoPacientes = async (): Promise<any> => {
        const jwtToken = localStorage.getItem('admonvetapp_jwt');
        try {
            const {data: {data: {listadoPacientes}}} = await AxiosClient.get('/pacientes', {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            setPacientes(listadoPacientes);
        } catch (error: any) {

        }
    }

    return (
        <PacientesContext.Provider
            value={
                {
                    pacientes,
                    setPacientes,
                    nuevoPaciente,
                    actualizarPaciente,
                    pacienteEdicion,
                    setPacienteEdicion,
                    actualizarEstadoPaciente,
                    eliminarPaciente
                }
            }
        >
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext;