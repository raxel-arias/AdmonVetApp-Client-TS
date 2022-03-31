import { createContext, useEffect, useState } from "react";
import AxiosClient from "../config/axios.config";
import { IPaciente } from "../interfaces/paciente.interface";

interface IPacienteContext {
    pacientes: IPaciente[],
    setPacientes: React.Dispatch<React.SetStateAction<IPaciente[]>>
}

const pacientesContextDefault: IPacienteContext = {
    pacientes: [],
    setPacientes: pacientes => {}
}

const PacientesContext = createContext(pacientesContextDefault);

export const PacientesProvider: React.FC<React.ReactNode> = ({children}) => {
    const [pacientes, setPacientes] = useState<IPaciente[]>(pacientesContextDefault.pacientes)

    return (
        <PacientesContext.Provider
            value={
                {
                    pacientes,
                    setPacientes
                }
            }
        >
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext;