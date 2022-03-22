import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from './../components/auth/PageTitle';

const Login = (): JSX.Element => {

    return(
       <>
        <div className={`text-center md:text-left p-2 fade`}>
            <PageTitle title={'Iniciar Sesión'} />
        </div>
        <div className="mt-5 md:mt-0 p-4 md:shadow-xl rounded-2xl">
            <form className="">
                <div>
                    <label className="uppercase text-gray-600 block text-xl font-bold">
                        Email
                    </label>
                    <input className="inputs border w-full p-3 mt-3 bg-gray-200" type="email" placeholder="Tu Email"/>
                    <div className="inputs-border-bottom"></div>
                </div>
                <div>
                    <label className="uppercase text-gray-600 block text-xl font-bold mt-2.5">
                        Contraseña
                    </label>
                    <input className="inputs border w-full p-3 mt-3 bg-gray-200" type="password" placeholder="Tu contraseña"/>
                    <div className="inputs-border-bottom"></div>
                </div>

                <input className="button mt-5  
                    px-6 py-4 w-full md:w-auto rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase" 
                type="submit" value="Acceder"/>
            </form>

            <div className="mt-5 md:mt-2.5">
                <nav className="text-gray-500 flex justify-around">
                    <Link to="/signup" className="hover:text-rose-700 hover:underline">Crear una cuenta</Link>
                    <Link to="/recover-account" className="hover:text-rose-700 hover:underline">¿Contraseña olvidada?</Link>
                </nav>
            </div>
        </div>
       </> 
    );
}

export default Login;