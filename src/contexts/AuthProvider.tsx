import { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";
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
    cerrarSesion: () => void,
    actualizarInfo: (user: UsuarioProfile) => Promise<any>
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
    cerrarSesion: () => {},
    actualizarInfo: async () => {}
}

const AuthContext = createContext(authContextDefault);

export const AuthProvider: React.FC<React.ReactNode> = ({children}) => {
    const [auth, setAuth] = useState<IAuth>(authContextDefault.auth);
    const [isCargando, setIsCargando] = useState<boolean>(authContextDefault.isCargando);
    
    const location = useLocation();

    useEffect(() => {
        authentication();
    }, [location]); 
    
    const authentication = async (): Promise<void> => {
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
        } finally {
            setIsCargando(false);
        }
    }

    const cerrarSesion = (): void => {
        localStorage.removeItem('admonvetapp_jwt')
        setAuth(authContextDefault.auth);
    }
    
    const actualizarInfo = (user: UsuarioProfile): Promise<any> => {
        return new Promise (async (resolve, reject) => {
            const jwt: string | null = localStorage.getItem('admonvetapp_jwt');

            try {
                const response: any = await AxiosClient.put('/user/actualizar', user, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`
                    }
                });

                const {data: {data: {usuarioUpdated}}} = response;

                setAuth({
                    ...auth,
                    user: {
                        id: usuarioUpdated._id,
                        nombre: usuarioUpdated.nombre,
                        apellido: usuarioUpdated.apellido,
                        email: usuarioUpdated.email,
                        ...(usuarioUpdated.telefono && {telefono: usuarioUpdated.telefono})
                    }
                });

                resolve(response);
            } catch (error: any) {
                reject(error);
            }
        });
    }


    return (
        <AuthContext.Provider
            value={
                {
                    auth,
                    setAuth,
                    isCargando,
                    setIsCargando,
                    cerrarSesion,
                    actualizarInfo
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;