import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useContext, useEffect } from 'react';
import { Context } from '../context/FeedListContext'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';



const IndexScreen = ({ navigation }) => {
    const { state, deleteFeed, getAllFeeds } = useContext(Context);
    const {quantidade, setQuantidade} = useState(0);

    useEffect(() => {
        //recarrar pagina
        getAllFeeds();

      }, []);



    return (
        <>
        <View style={styles.body}>
            <View style={styles.header}>
            <Text style={styles.h1}>
                    Feeds
                </Text>

                <Image style={styles.rss} source={require('../../assets/rss.png') } />
            </View>

            {state.length == 0 ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Image style={styles.sad} source={require('../../assets/sad.png') } />


            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'normal', color:'#006DF0' }}>
                Nenhum feed cadastrado
            </Text>
            </View>
            : null }

            <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.flatlist}
                data={state}
                keyExtractor={(rssfeed) => rssfeed.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.cardItem} onPress={() => navigation.navigate('Show', { id: item.id })}>
                            <View style={styles.row}>

                                <View style={styles.col}>

                                {item.imagem == '' ? <Image source={require('../../assets/noimage.png') } style={{ width: 57, height: 57, borderRadius: 16,  }} /> :  <Image source={{ uri: item.imagem }} style={{ width: 57, height: 57, borderRadius: 16,  }} /> }
                                </View>


                                <View style={styles.col}>

                                <Text style={styles.title}>{item.titulo}</Text>
                                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.descricao}>{item.descricao}</Text>

                                </View>

                                <TouchableOpacity onPress={() => { deleteFeed(item.id)  }}>
                                    <Feather style={styles.icon} name="trash" />

                                </TouchableOpacity>

                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
            </View>
        </>
    );
};

const styles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: '#cad8e7',

        paddingVertical: 20,
        alignItems: 'center',
        flexDirection: 'column',

    },
    row: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 10,
        alignContent: 'center',
        alignItems: 'center',
        gap: 10,


    },
    col: {
        flexDirection: 'Column',
        alignContent: 'center',



    },
    title: {
        fontSize: 18,
        marginBottom: 5,
    },
    descricao: {
        fontSize: 12,
        width: 200,
        height: 40,
        marginBottom: 5,
        overflow: 'hidden',
    },

    icon: {
        fontSize: 24,
        color: 'red',

    },
    sadicon: {
        fontSize: 74,
        textAlign: 'center',
        color: '#006DF0'

    },
    cardItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 19,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: .6,
        shadowRadius: 1,
        elevation: 2,


    },
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#006DF0',

    },
    rss:{
        width: 22,
        height: 22,
        marginLeft: 0,
        resizeMode: 'cover',

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12,
        marginTop: 20,
        gap: 6,
        marginBottom: 20,

    },
    flatlist: {
        marginHorizontal: 12,


    }

});

export default IndexScreen;
