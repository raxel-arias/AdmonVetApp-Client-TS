import { createContext, useEffect, useState } from "react";
import AxiosClient from "../config/axios.config";
import { IPaciente } from "../interfaces/paciente.interface";
import useAuth from './../hooks/useAuth';

interface IPacienteContext {
    pacientes: IPaciente[],
    setPacientes: React.Dispatch<React.SetStateAction<IPaciente[]>>,
    nuevoPaciente: (paciente: IPaciente) => Promise<any>
}

const pacientesContextDefault: IPacienteContext = {
    pacientes: [],
    setPacientes: pacientes => {},
    nuevoPaciente: async () => {}
}

const PacientesContext = createContext(pacientesContextDefault);

export const PacientesProvider: React.FC<React.ReactNode> = ({children}) => {
    const {auth} = useAuth();

    const [pacientes, setPacientes] = useState<IPaciente[]>(pacientesContextDefault.pacientes);

    const nuevoPaciente = (paciente: IPaciente): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
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

    return (
        <PacientesContext.Provider
            value={
                {
                    pacientes,
                    setPacientes,
                    nuevoPaciente
                }
            }
        >
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext;