export interface IPaciente {
    _id?: string,
    nombre: string,
    propietario: IPropietario,
    sintomas: string,
    fechaAlta: any,
    pendiente?: boolean,
    readonly __v?: any
}

export interface IPropietario {
    nombre: string,
    apellido: string,
    email: string
}