const Alert = ({type, messageList}: IAlert): JSX.Element => {

    const alertClasses: string = `
        z-30
        fixed top-5 left-0 right-0 text-center 
        bg-gradient-to-r 
        w-3/4 md:w-1/2 mx-auto 
        uppercase text-white font-bold 
        p-3
        ${'fade'}
    `;

    const errorTypeClasses: string = `from-red-400 to-red-600`;
    const infoTypeClasses: string = `from-green-500 to-green-600`;

    const alertMessages: JSX.Element[] = messageList.map((msg:string, index: number) => <p key={index.toString()}>{msg}</p>);
    return( 
        <div key="uniqueAlert1" className={`${alertClasses} ${type === 'error' ? errorTypeClasses : infoTypeClasses}`}>
            {alertMessages}
        </div>
    );
}

export interface IAlert {
    type: string,
    messageList: string[]
}

export default Alert;