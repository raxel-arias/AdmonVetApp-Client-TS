interface IPageTitle {
    title: string
}

const PageTitle = ({title}: IPageTitle): JSX.Element => {
    return (
        <>
            <h1 className="text-rose-600 font-black text-5xl md:text-6xl">{title}</h1>
            <p className="text-gray-500 font-bold text-2xl md:text-3xl">Administrador de Pacientes</p>
        </>
    );
}

export default PageTitle