import FormularioPacientes from "../../components/private/admin/FormularioPacientes";
import ListadoPacientes from "../../components/private/admin/ListadoPacientes";
import usePacientes from './../../hooks/usePacientes';

const Citas = (): JSX.Element => {

    return (
        <>
        <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 lg:w-2/5">
                    <FormularioPacientes />
            </div>

            <div className="md:w-1/2 lg:w-3/5">
                    <ListadoPacientes />
            </div>
        </div>
        </>
    )
}

export default Citas;