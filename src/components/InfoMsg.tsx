import { Link } from 'react-router-dom';
import { IMensajeAlerta } from '../interfaces/alertas.interface';

const InfoMsg = ({tipo, titulo, razon, links}: IMensajeAlerta): JSX.Element => {
    const errorClasses: string = 'border-b-rose-700';
    const infoClasses: string = 'border-b-green-500';

    let Links: JSX.Element[] = []; 
    links.forEach((link, index) => {
        Links.push(<Link to={link.url} key={index} className="hover:text-rose-700 hover:underline">{link.descripcion}</Link>);
        if (index < links.length-1) {
            Links.push(<p className='text-center'>ó</p>)
        }
    });
    
    return (
        <>
        <div className="mt-5 md:mt-2.5 text-center">
            <p className='text-center uppercase font-bold text-2xl'>{titulo}</p>
            <p className={`text-center font-bold text-xl mb-2 border-b-2 ${tipo === 'error' ? errorClasses : infoClasses}`}>{razon}</p>
            {Links}
        </div>
        </>
    )
}

export default InfoMsg;