export interface UsuarioProfile {
    id: string,
    nombre: string,
    apellido: string,
    telefono?: string,
    email: string
}

export interface UsuarioSignUp {
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    confirmarPassword: string,
}

export interface UsuarioLogin {
    email: string,
    password: string
}