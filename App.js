import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native';
import IndexScreen from './src/screens/IndexScreen';
import ShowFeedScreen from './src/screens/ShowFeedScreen';
import AddFeedScreen from './src/screens/AddFeedScreen';
import { Feather } from '@expo/vector-icons';
import { Provider as FeedListProvider } from './src/context/FeedListContext';
import { Provider as FeedProvider } from './src/context/FeedContext';

import ToastManager, { Toast } from 'toastify-react-native'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name="Index"
        component={IndexScreen}

        options={({navigation}) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Add")}>
              <Feather name="plus" size={30} style={{'color':'white'}} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#006DF0', // Define a cor de fundo do cabeçalho
            },

          headerTitleStyle: {
            color: '#fff', // Define a cor desejada para o texto do nome

         // Define a cor de fundo do cabeçalho
          },
            headerTintColor: '#fff', // Define a cor do ícone (seta) do botão voltar

            headerTitle: () => (
                <View style={styles.headerTitleContainer}>
                  <Image style={styles.logo} source={require('./assets/lg_branca.png')} />
                </View>
              ),
            title: 'Feeds',
        })

        }
      />
      <Stack.Screen name="Show" component={ShowFeedScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Add")}>
              <Feather name="plus" size={30} style={{'color':'white'}} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#006DF0', // Define a cor de fundo do cabeçalho
            },

          headerTitleStyle: {
            color: '#fff', // Define a cor desejada para o texto do nome

         // Define a cor de fundo do cabeçalho
          },
            headerTintColor: '#fff', // Define a cor do ícone (seta) do botão voltar


            title: 'Notícias',
        })}/>
      <Stack.Screen name="Add" component={AddFeedScreen}
      options={({navigation}) => ({

            headerStyle: {
              backgroundColor: '#006DF0', // Define a cor de fundo do cabeçalho
              },

            headerTitleStyle: {
              color: '#fff', // Define a cor desejada para o texto do nome

           // Define a cor de fundo do cabeçalho
            },
              headerTintColor: '#fff', // Define a cor do ícone (seta) do botão voltar

              title: 'Adicionar Feed',
          })
        }
       />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default () => {
  return (
    <FeedListProvider>
      <FeedProvider>
        <App />
        <ToastManager
             position="bottom"
             animationDuration={300}
             animationIn="slideInRight"
             animationOut="slideOutLeft"
            width={300}
             animationInitialOffset={500}
        />
      </FeedProvider>
    </FeedListProvider>
  );
};


const styles = StyleSheet.create({
    logo: {
        resizeMode: 'contain',
        padding: 8,
        margin: 0,


        },
        headerTitleContainer: {
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
          },
    });
