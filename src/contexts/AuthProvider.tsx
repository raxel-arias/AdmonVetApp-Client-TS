import { useState, useEffect, createContext } from "react";
import AxiosClient from "../config/axios.config";
import { UsuarioProfile } from "../interfaces/usuario.interface";

interface IAuth {
    jwt: string,
    user: UsuarioProfile
}

interface IAuthContext {
    auth: IAuth,
    setAuth: React.Dispatch<React.SetStateAction<IAuth>>,
    isCargando: boolean,
    setIsCargando: React.Dispatch<React.SetStateAction<boolean>>,
    cerrarSesion: () => void
}

const authContextDefault: IAuthContext = {
    auth: {
        jwt: '',
        user: {
            id: '',
            nombre: '',
            apellido: '',
            telefono: '',
            email: ''
        }
    },
    setAuth: auth => {},
    isCargando: true,
    setIsCargando: flag => {},
    cerrarSesion: () => {}
}

const AuthContext = createContext(authContextDefault);

export const AuthProvider: React.FC<React.ReactNode> = ({children}) => {
    const [auth, setAuth] = useState<IAuth>(authContextDefault.auth);
    const [isCargando, setIsCargando] = useState<boolean>(authContextDefault.isCargando);
    
    useEffect(() => {
        authentication();
    }, []); 
    
    const authentication = async (): Promise<void> => {
        console.log('llamando al authentication');
        const jwt: string | null = localStorage.getItem('admonvetapp_jwt');

        if (!jwt) {
            setIsCargando(false);
            return;
        }

        try {
            const {data: {data: {usuario}}} = await AxiosClient.get('/user/', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            });
            
            setAuth({
                jwt,
                user: {
                    id: usuario._id,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    email: usuario.email,
                    ...(usuario.telefono && {telefono: usuario.telefono})
                }
            });
        } catch (error: any) {
            setAuth(authContextDefault.auth);
        }
        setIsCargando(false);
    }

    const cerrarSesion = (): void => {
        localStorage.removeItem('admonvetapp_jwt')
        setAuth(authContextDefault.auth);
    }


    return (
        <AuthContext.Provider
            value={
                {
                    auth,
                    setAuth,
                    isCargando,
                    setIsCargando,
                    cerrarSesion
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;