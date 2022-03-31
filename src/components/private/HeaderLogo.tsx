import { Link } from "react-router-dom";

const HeaderLogo = (): JSX.Element => {
    return (
        <div className="flex justify-center text-center md:text-left">
            <Link to="/me" id="header-logo" className="hover:cursor-pointer ">
                <p className="font-bold text-3xl text-gray-300">
                Admon<span className="text-rose-600">Vet</span>
                </p>
                <p className="p-0 m-0 font-bold text-white text-xl">Administrador de Pacientes</p>
            </Link>
        </div>
    )
}

export default HeaderLogo;