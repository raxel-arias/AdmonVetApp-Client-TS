import { Link } from "react-router-dom";

const HeaderLogo = (): JSX.Element => {
    return (
        <header className="my-5 flex justify-center">
            <Link to="/" id="header-logo" className="hover:cursor-pointer">
                <p className="font-bold text-3xl text-gray-400">
                Admon<span className="text-rose-600">Vet</span>
                </p>
            </Link>
        </header>
    )
}

export default HeaderLogo;