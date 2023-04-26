import createDataContext from './createDataContext';
import { XMLParser } from 'fast-xml-parser';
import rssfeed from '../api/rssfeed';


const feedReducer = (state, action) => {
    let newState = [];
    switch (action.type) {

        case 'fetch_items':
            return action.payload; //retorna a lista de itens do feed

        case 'add_item':
            console.log('implementar');
            return state;
        case 'delete_item':
            console.log('implementar');
            return state;
        case 'restore_state':
            console.log('implementar');
            return state;
        case 'delete_all':
            return [];
        default:
            return state;
    }
};

const addItem = dispatch => {
    return (titulo, urlFeed, callback) => {
        console.log('implementar');
    };
};

const deleteItem = dispatch => {
    return (id) => {
        console.log('implementar');
    };
};

const fetchItems = dispatch => async (feedURL) => {

    const parser = new XMLParser();
    const fetch = rssfeed(feedURL);
    const response = await fetch.get();
    const data = response.data;

    let feed = await parser.parse(response.data);

    // console.log(feed.rss.channel.language);//linguagem do RSS feed

    //lista de itens do feed
    let items = [];

    // criando um objeto para cada item do feed e adicionando na lista
    for (let i = 0; i < feed.rss.channel.item.length; i++) {
        let item = feed.rss.channel.item[i];
        items.push({
            id: i+1,
            title: item.title,
            description: item.description,
            link: item.link,
            pubDate: item.pubDate,
            guid: item.guid,
        });
    }

    //console.log(items);

    //chamando o reducer para atualizar o estado
    dispatch({ type: 'fetch_items', payload:items });
};

const restoreState = dispatch => async () => {
    return () => {
        console.log('implementar');
    }
}


const deleteAll = dispatch => {
    return () => {
        dispatch({ type: 'delete_all' });
    }
}

/*
const rssItems = [

];
*/
export const { Context, Provider } = createDataContext(
    feedReducer,
    { addItem, deleteItem, fetchItems, restoreState, deleteAll },
    [ ]
);
