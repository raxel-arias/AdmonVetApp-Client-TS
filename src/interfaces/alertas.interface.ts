export interface IMensajeAlerta {
    tipo: string,
    titulo: string,
    razon: string,
    links: ILinkInfo[]
}

interface ILinkInfo {
    url: string,
    descripcion: string
}