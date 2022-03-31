import { Link } from "react-router-dom";

const Footer = (): JSX.Element => {
    return (
        <footer className="text-center">
            <p>©Raxel Arias {new Date().getFullYear()}</p>
        </footer>
    )
}

export default Footer;