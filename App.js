import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
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
              <Feather name="plus" size={30} style={{'color':'blue'}} />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            color: 'blue', // Define a cor desejada para o texto do nome
          },
        })
        }
      />
      <Stack.Screen name="Show" component={ShowFeedScreen} />
      <Stack.Screen name="Add" component={AddFeedScreen}  />
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
