import Evento from "../interfaces/evento.interface";

const URL_EVENTO = 'https://otre-backend.herokuapp.com/eventos';

const eventoService = {
    listarEventos: async (idProdutor: string): Promise<Evento[]> => {
        try {
            
            const eventos = await fetch(`${URL_EVENTO}/${idProdutor}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(resposta => resposta.json())
            .then((eventos: Evento[]) => {

                return eventos;
            });

            return eventos;
        } catch (erro: any) {
            throw new Error(erro);
        }
    },
    listarEvento: async (idProdutor: string, idEvento: string): Promise<Evento> => {
        try {
            
            const corpo = {
                idProdutor,
                idEvento
            };

            const evento = await fetch(`${URL_EVENTO}/buscar`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(corpo)
            })
            .then(resposta => resposta.json())
            .then((eventos: Evento) => {

                return eventos;
            });

            return evento;
        } catch (erro: any) {
            throw new Error(erro);
        }
    },
    alterarStatusEvento: async (idEvento: string, status: boolean) => {
        
    },
    cadastrarEvento: async (evento: Evento) => {
        let corpo = { ...evento };

        await fetch(URL_EVENTO, {
            method: 'POST',
            body: JSON.stringify(corpo),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
};

export default eventoService;
