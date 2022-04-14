export const formatearFecha = (fecha: string) => {
    const nuevaFecha = new Date(fecha);

    return new Intl.DateTimeFormat('ex-MX', {dateStyle: 'long'}).format(nuevaFecha);
}