import createDataContext from './createDataContext';

import AsyncStorage from "@react-native-async-storage/async-storage";

const saveFeeds = async (feeds) => {
    try {
        await AsyncStorage.setItem('feeds', JSON.stringify(feeds));
    }
    catch(err) {
        console.log(err);
    }
}

const clearStorage = async () => {
    try {
        await AsyncStorage.removeItem('feeds');
        alert('Limpou os feeds salvos');
    }
    catch(e) {
        alert('Falha ao limpar feeds');
    }
}

const feedListReducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case 'add_feed':

            // id do novo feed
            let id = state.length + 1;

            // criando um novo estado (lista de feeds) com o novo feed adicionado utilizando o spread operator para copiar o estado atual
            newState = [...state,
                {
                    titulo: action.payload.titulo,
                    urlFeed: action.payload.urlFeed,
                    id: id

                }
            ];
            saveFeeds(newState);
            return newState;

        case 'delete_feed':

        //remover o feed da lista de feeds
            newState = state.filter((item) => item.id !== action.payload);
        // retornando a nova lista de feeds (sem o feed que foi removido)
            saveFeeds(newState);
            return newState;

        case 'restore_state':
            // n entendi o que é pra fazer aqui
            return newState;

        case 'delete_all':
            // retornar uma lista vazia (sem feeds)
            clearStorage();
            return [];

        case 'recuperar_feeds':
            return action.payload; // retornando a lista de feeds recuperada do AsyncStorage
        default:
            return state;
    }
};



const addFeed = dispatch => {
    return (titulo, urlFeed, callback) => {

        dispatch({ type: 'add_feed', payload: { titulo, urlFeed} }); //

    };
};

const deleteFeed = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_feed', payload: id });
    };
};

const restoreState = dispatch => async () => {
    return () => {
        dispatch({ type: 'restore_state' });
    }
}

const deleteAll = dispatch => {
    return () => {
        dispatch({ type: 'delete_all' });

    }
}

const getAllFeeds = dispatch => async () => {
    try {
        const savedFeeds = await AsyncStorage.getItem('feeds');
        if (!savedFeeds) {
            console.log('nada foi salvo ainda...');
        }
        else {
            dispatch({type:'recuperar_feeds', payload:JSON.parse(savedFeeds)});
        }
    }
    catch(e) {
        console.log(e);
    }
  };


const rssFeeds = [
    {
        id: 1,
        titulo: 'G1 - Todas as notícias',
        urlFeed: 'https://g1.globo.com/rss/g1/',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    },
    {   id: 2,
        titulo: 'G1 - Brasil',
        urlFeed: 'https://g1.globo.com/rss/g1/brasil/',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    },
    {
        id: 3,
        titulo: 'G1 - Tecnologia e Games',
        urlFeed: 'https://g1.globo.com/rss/g1/tecnologia/',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    },
    {
        id: 4,
        titulo: 'Jovem Nerd',
        urlFeed: 'http://jovemnerd.com.br/rss',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    }

];

export const { Context, Provider } = createDataContext(
    feedListReducer,
    { addFeed, deleteFeed, restoreState, deleteAll, getAllFeeds },
    [ ]
);
