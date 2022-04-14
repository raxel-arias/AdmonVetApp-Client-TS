import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
import usePacientes from "../../../hooks/usePacientes";
import { IPaciente } from "../../../interfaces/paciente.interface";
import { formatearFecha } from "../../../utils/helpers";
import Alert, { IAlert } from "../../Alert";

const Paciente = (paciente: IPaciente): JSX.Element => {
    const {_id, nombre, sintomas, propietario, fechaAlta} = paciente;
    const {__v, pendiente, ...pacienteEditar} = paciente;
    
    const [alerta, setAlerta] = useState<IAlert>();

    const {pacienteEdicion, setPacienteEdicion, actualizarEstadoPaciente, eliminarPaciente} = usePacientes();

    const eliminar= async (id: string) => {
        try {
            const res = await Swal.fire({
                title: 'Eliminar Paciente',
                text: '¿Desea eliminar el paciente?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'No'
            });

            if (!res.isConfirmed) return;

            setPacienteEdicion({
                nombre: '',
                sintomas: '',
                _id: '',
                fechaAlta: '',
                propietario: {
                    nombre: '',
                    apellido: '',
                    email: ''
                }
            });

            const {data: {msg}} = await eliminarPaciente(id);
            
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
        } finally {
            setTimeout(() => {
                setAlerta({
                    type: '', messageList: []
                });
            }, 2000);
        }
    }

    return (
        <>
        {alerta?.type ? <Alert {...alerta} /> : ''}
        <div className="my-2 mx-5 p-4 shadow-lg">
            <p className="uppercase">Nombre: <span className="font-bold">{nombre}</span></p>
            <p className="uppercase">Cita: <span className="font-bold text-rose-500">{formatearFecha(fechaAlta)}</span></p>
            <p className="uppercase">Propietario: <span className="font-bold">{propietario.nombre + ' ' + propietario.apellido}</span></p>
        
            <div className="flex justify-evenly my-2">
                <button 
                    type="button" 
                    className="py-2 px-6 bg-yellow-500 hover:bg-yellow-600 text-white uppercase rounded-xl"
                    onClick={() => {setPacienteEdicion(pacienteEditar)}}>
                    Editar
                </button>
                <button 
                    type="button" 
                    className="py-2 px-6 bg-red-500 hover:bg-red-600 text-white uppercase rounded-xl"
                    onClick={() => {eliminar(_id!)}}>
                    Eliminar
                </button>
                <button
                    type="button"
                    className={`py-2 px-6 ${paciente.pendiente ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'} text-white uppercase rounded-xl`}
                    onClick={() => {actualizarEstadoPaciente(_id!)}}
                >
                    {paciente.pendiente ? 'Pendiente' : 'Finalizado'}
                </button>
            </div>
        </div>
        </>
    )
}

export default Paciente;