import { useLocation } from 'react-router-dom';

import usePacientes from './../../../hooks/usePacientes';
import Paciente from './Paciente';

const ListadoPacientes = ({length}: any): JSX.Element => {
    const {pacientes} = usePacientes();
    const location = useLocation();
    
    return (
        pacientes.length === 0 ? (
            <h2 className='text-center mt-2.5 uppercase text-2xl text-gray-500'>Comience agregando una nueva cita</h2>
        ) : (
            <div className={location.pathname === '/me' ? `md:px-32`: ''}>
                <h2 className='text-center mt-2.5 uppercase text-4xl font-bold text-rose-600'>{location.pathname === '/me' ? 'Citas Recientes' : 'Citas'}</h2>
            
                {
                    pacientes
                    .sort((a, b) => {
                        const dateA = new Date(a.fechaAlta).getTime();
                        const dateB= new Date(b.fechaAlta).getTime();

                        return dateA > dateB ? 1 : -1;
                    })
                    .map((paciente, index) => {
                        if (index > length-1) return;
                        return <Paciente key={paciente._id} {...paciente} />
                    })
                }
            </div>
        )
    )
}

export default ListadoPacientes;