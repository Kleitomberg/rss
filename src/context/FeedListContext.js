import createDataContext from './createDataContext';

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Toast } from 'toastify-react-native';
import rssfeed from '../api/rssfeed';
import { XMLParser } from 'fast-xml-parser';


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

        let id = state.length + 1; // gerando um id para o novo feed

        /// criando um novo feed com os dados recebidos + o id gerado acima
        const feednovo = {
            titulo: action.payload.titulo,
            urlFeed: action.payload.urlFeed,
            id: id,
            descricao: action.payload.descricao,
            imagem: action.payload.imagem,
        };

        newState = [...state, feednovo]; // adicionando o novo feed na lista de feeds


        saveFeeds(newState); // salvando a lista de feeds no AsyncStorage

        return newState; // retornando a nova lista de feeds (com o novo feed adicionado)

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

        if(callback) {
            callback();
        }

    };
};
    // novo metodo para adicionar um feed, recebe o titulo e a url do feed e busca os dados do feed com imagem e descrição
    const fetchItem = dispatch => async (titulo, feedURL, callback) => {

        const parser = new XMLParser();
        const fetch = rssfeed(feedURL);
        const response = await fetch.get();
        const data = response.data;

        let feed = await parser.parse(response.data);

        if (feed == undefined || feed == null || feed == "") {
            Toast.error('Não foi possível adicionar o feed, verifique a URL e tente novamente.');
            return;
        }

        //cria objeto com os dados do feed

       let imagemURl = feed.rss.channel.image;

       //verifica se o feed tem imagem
       if (imagemURl == undefined || imagemURl == null || imagemURl == ""){
           imagemURl ='';
         } else {
            imagemURl = feed.rss.channel.image.url;
        }

        let feedObj = {
            titulo: titulo,
            urlFeed: feedURL,
            imagem: imagemURl,
            descricao: feed.rss.channel.description,
        }
        //chamando o reducer para atualizar o estado
        dispatch({ type: 'add_feed', payload: feedObj }); // chamando o reducer para adicionar o feed passando o objeto com os dados do feed

        if(callback) {
            Toast.success('Feed adicionado com sucesso!');
            callback();
        }

    };

const deleteFeed = dispatch => {

    return (id) => {
        dispatch({ type: 'delete_feed', payload: id }); // chamando o reducer para deletar o feed passando o id do feed
        Toast.success('Feed removido com sucesso!');

    };

};

const restoreState = dispatch => async () => {
    return () => {
        dispatch({ type: 'restore_state' }); // chamando o reducer para restaurar o estado, quer dizer n entendi bem esse metodo
    }
}

const deleteAll = dispatch => {
    return () => {
        dispatch({ type: 'delete_all' }); // chamando o reducer para deletar todos os feeds

    }
}

// metodo para recuperar os feeds salvos no AsyncStorage
const getAllFeeds = dispatch => async () => {
    try {
        const savedFeeds = await AsyncStorage.getItem('feeds'); // recuperando os feeds salvos
        if (!savedFeeds) { // se não tiver nada salvo, retorna uma lista vazia
            console.log('nada foi salvo ainda...');
        }
        else {
            dispatch({type:'recuperar_feeds', payload:JSON.parse(savedFeeds)}); // se tiver algo salvo, retorna a lista de feeds
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
    { addFeed, deleteFeed, restoreState, deleteAll, getAllFeeds,fetchItem },
    [ ] //iniciando com a lista de feeds vazia
);
