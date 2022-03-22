export interface UsuarioSignUp {
    nombre: string,
    apellido: string,
    email: string,
    password: string | undefined,
    confirmarPassword: string,
}