import createDataContext from './createDataContext';
import { XMLParser } from 'fast-xml-parser';
import rssfeed from '../api/rssfeed';


const feedReducer = (state, action) => {
    let newState = [];
    switch (action.type) {

        case 'fetch_items':
            return action.payload; //retorna a lista de itens do feed

        case 'add_item':

            let id = state.length + 1;

            newState = [...state,
                {
                    title: action.payload.titulo,
                    link: action.payload.urlFeed,
                    description: action.payload.description,
                    pubDate: action.payload.pubDate,
                    id: id
                }
            ];

            return newState;

        case 'delete_item':
            newState = state.filter((item) => item.id !== action.payload);

            return newState;
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
    return (titulo, urlFeed, description, callback) => {
            let pubDate = new Date(); // pegando a data atual da criação da noticia
            dispatch({ type: 'add_item', payload: { titulo, urlFeed, description,pubDate } }); // cahamando o reducer para adicionar o item
    };
};

const deleteItem = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_item', payload: id });
    };
};

const fetchItems = dispatch => async (feedURL) => {

    const parser = new XMLParser();

    const fetch = rssfeed(feedURL);

    const response = await fetch.get();
    const data = response.data; // xml do feed


    let feed = await parser.parse(data, {
        ignoreAttributes: false,
        attributeNamePrefix: "",

    });


    //media:content

    // console.log(feed.rss.channel.language);//linguagem do RSS feed

    //lista de itens do feed
    let items = [];
    let imagesList = [];
    // criando um objeto para cada item do feed e adicionando na lista
    for (let i = 0; i < feed.rss.channel.item.length; i++) {

        let item = feed.rss.channel.item[i];

        let imageUrl = '';

        const regex = /<media:content[^>]+url="([^">]+)/g;

        const match = data.match(regex);

        if(match) {
            imageUrl = match[i]
        }

        if (imageUrl !== '' && imageUrl !== undefined) {
            imageUrl = imageUrl.replace(/.*?(https:\/\/)/, 'https://');
        }
        if (item.description == undefined) {
            descricao = item.description.replace(/<[^>]+>/g, '');
        }
        else {
            descricao = ''
        }
        items.push({
            id: i+1,
            title: item.title,
            description: descricao,
            link: item.link,
            pubDate: item.pubDate,
            guid: item.guid,
            category: item.category,
            image : imageUrl
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
