import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useContext, useEffect } from 'react';
import { Context } from '../context/FeedListContext'


import { MaterialCommunityIcons } from '@expo/vector-icons';



const IndexScreen = ({ navigation }) => {
    const { state, deleteFeed, getAllFeeds } = useContext(Context);

    useEffect(() => {
        getAllFeeds(); // chama a função que carrega os feeds cadastrados do async storage
      }, []);


    return (
        <>
            <Text style={styles.h1}>
                    Feeds
                </Text>
            {state.length == 0 ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <MaterialCommunityIcons style={styles.sadicon}  name="emoticon-sad-outline" size={74} color="blue" />
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'normal', color:'blue' }}>
                Nenhum feed cadastrado
            </Text>
            </View>
            : null }
            <FlatList
                data={state}
                keyExtractor={(rssfeed) => rssfeed.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.cardItem} onPress={() => navigation.navigate('Show', { id: item.id })}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.titulo}</Text>
                                <TouchableOpacity onPress={() => { deleteFeed(item.id)  }}>
                                    <Feather style={styles.icon} name="trash" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    row: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,


    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24,
        color: 'red'
    },
    sadicon: {
        fontSize: 74,
        textAlign: 'center',
        color: 'blue'

    },
    cardItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: .8,
        shadowRadius: 2,
        elevation: 5,

        marginHorizontal: 12,

    },
    h1: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        color: 'blue',
        marginHorizontal: 12,
    },

});

export default IndexScreen;
