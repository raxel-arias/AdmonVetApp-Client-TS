export interface IPaciente {
    nombre: string,
    propietario: IPropietario,
    sintomas: string,
    fechaAlta: string
}

export interface PacienteNuevo {
    nombre: string,
    propietario: IPropietario,
    sintomas: string,
    fechaAlta: string
}

export interface IPropietario {
    nombre: string,
    apellido: string,
    email: string
}